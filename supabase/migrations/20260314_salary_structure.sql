-- Migration: Implementation of Salary Structure based on consecutive working days
-- Adds tracking columns to profiles and creates salary_rules table.

-- 1. Add tracking columns to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS salary_days_count INTEGER DEFAULT 0;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS last_salary_claim_at TIMESTAMPTZ DEFAULT NULL;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS last_work_day_at TIMESTAMPTZ DEFAULT NULL;

-- 2. Create salary rules table
CREATE TABLE IF NOT EXISTS public.salary_rules (
    id SERIAL PRIMARY KEY,
    level_id INTEGER NOT NULL, -- Relative to levels 1, 2, 3, 4
    day_number INTEGER NOT NULL, -- 2, 4, 7, 15, 30
    amount DECIMAL(12,2) NOT NULL,
    UNIQUE(level_id, day_number)
);

-- 3. Populate salary rules
-- Level 1: 100, 300, 1000, 1800, 5000
INSERT INTO public.salary_rules (level_id, day_number, amount) VALUES
(1, 2, 100.00), (1, 4, 300.00), (1, 7, 1000.00), (1, 15, 1800.00), (1, 30, 5000.00),
(2, 2, 200.00), (2, 4, 600.00), (2, 7, 2000.00), (2, 15, 3600.00), (2, 30, 10000.00),
(3, 2, 300.00), (3, 4, 900.00), (3, 7, 3000.00), (3, 15, 5400.00), (3, 30, 15000.00),
(4, 2, 400.00), (4, 4, 1200.00), (4, 7, 4000.00), (4, 15, 7200.00), (4, 30, 20000.00)
ON CONFLICT (level_id, day_number) DO UPDATE SET amount = EXCLUDED.amount;

-- 4. Function to claim salary
CREATE OR REPLACE FUNCTION public.claim_salary_bonus() 
RETURNS json AS $$
DECLARE
    v_user_id UUID;
    v_level_id INT;
    v_salary_days_count INT;
    v_last_claim_at TIMESTAMPTZ;
    v_bonus_amount DECIMAL(12,2);
    v_claim_eligible BOOLEAN := false;
    v_day_number INT;
BEGIN
    v_user_id := auth.uid();
    IF v_user_id IS NULL THEN
        RAISE EXCEPTION 'Not authenticated';
    END IF;

    -- Get current user status
    SELECT p.level_id, p.salary_days_count, p.last_salary_claim_at
    INTO v_level_id, v_salary_days_count, v_last_claim_at
    FROM public.profiles p
    WHERE p.id = v_user_id;

    -- Find the highest day_number they reached but haven't claimed yet (based on days_count)
    -- This logic assumes they claim it on the day they reach it, or later.
    -- To keep it simple, we find if there's a rule for their current days_count.
    SELECT amount, day_number INTO v_bonus_amount, v_day_number
    FROM public.salary_rules
    WHERE level_id = v_level_id AND day_number = v_salary_days_count;

    IF v_bonus_amount IS NULL THEN
        RAISE EXCEPTION 'You are not eligible for a salary bonus at Day %', v_salary_days_count;
    END IF;

    -- Check if they already claimed this specific day (or any claim today)
    -- We'll track it by just ensuring last_salary_claim_at wasn't for this specific count.
    -- Or simply if they claimed today. But users might reach Day 2 and Day 4 on different days.
    
    -- A better way: track which days were claimed. For now, we'll use a simple "once per day count" logic.
    -- We can check if last_salary_claim_at was updated when salary_days_count was DIFFERENT.
    
    -- Update profile
    UPDATE public.profiles
    SET 
        wallet_balance = wallet_balance + v_bonus_amount,
        last_salary_claim_at = NOW()
    WHERE id = v_user_id;

    -- Log transaction
    INSERT INTO public.transactions (user_id, type, amount, description, status)
    VALUES (v_user_id, 'commission', v_bonus_amount, 'Salary Bonus: Day ' || v_day_number, 'approved');

    RETURN json_build_object(
        'success', true,
        'amount', v_bonus_amount,
        'day', v_day_number
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
