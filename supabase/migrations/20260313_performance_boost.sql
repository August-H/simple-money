-- PERFORMANCE INDEX MIGRATION
-- This speeds up the Record page and the Start Tasks progress calculation

CREATE INDEX IF NOT EXISTS idx_user_tasks_optimization_speed ON public.user_tasks (user_id, completed_at DESC);
CREATE INDEX IF NOT EXISTS idx_transactions_user_id_created ON public.transactions (user_id, created_at DESC);
