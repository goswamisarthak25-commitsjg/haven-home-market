-- Fix security warning: Set search_path for the function
ALTER FUNCTION public.update_updated_at_column() SET search_path = public;