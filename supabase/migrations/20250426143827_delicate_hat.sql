/*
  # Fix messages-users relationship

  1. Changes
    - Update foreign key constraint in messages table to reference public.users instead of auth.users
    - Add public.users table if it doesn't exist
    - Add trigger to sync auth.users with public.users

  2. Security
    - Enable RLS on users table
    - Add policies for authenticated users to view user data
*/

-- Create users table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on users table
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Add policies for users table
CREATE POLICY "Users can view other users"
  ON public.users
  FOR SELECT
  TO authenticated
  USING (true);

-- Create trigger function to sync auth.users with public.users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.users (id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$;

-- Create trigger if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_trigger
    WHERE tgname = 'on_auth_user_created'
  ) THEN
    CREATE TRIGGER on_auth_user_created
      AFTER INSERT ON auth.users
      FOR EACH ROW
      EXECUTE FUNCTION public.handle_new_user();
  END IF;
END
$$;

-- Update messages table foreign key
DO $$
BEGIN
  -- Drop existing foreign key if it exists
  IF EXISTS (
    SELECT 1
    FROM information_schema.table_constraints
    WHERE constraint_name = 'messages_sender_id_fkey'
    AND table_name = 'messages'
  ) THEN
    ALTER TABLE public.messages
    DROP CONSTRAINT messages_sender_id_fkey;
  END IF;

  -- Add new foreign key constraint
  ALTER TABLE public.messages
  ADD CONSTRAINT messages_sender_id_fkey
  FOREIGN KEY (sender_id)
  REFERENCES public.users(id)
  ON DELETE SET NULL;
END
$$;