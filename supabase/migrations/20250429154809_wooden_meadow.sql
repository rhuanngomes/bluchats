/*
  # Disable Email Confirmation Requirement

  1. Changes
    - Disable email confirmation requirement for new users
    - Set existing users as confirmed
    - Update auth settings
*/

-- Create function to handle email confirmation
CREATE OR REPLACE FUNCTION handle_email_confirmation()
RETURNS trigger AS $$
BEGIN
  -- Set email as confirmed for new users
  NEW.email_confirmed_at = COALESCE(NEW.email_confirmed_at, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to auto-confirm emails
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'confirm_user_email'
  ) THEN
    CREATE TRIGGER confirm_user_email
      BEFORE INSERT ON auth.users
      FOR EACH ROW
      EXECUTE FUNCTION handle_email_confirmation();
  END IF;
END $$;

-- Update existing users to be confirmed
UPDATE auth.users 
SET email_confirmed_at = COALESCE(email_confirmed_at, now()) 
WHERE email_confirmed_at IS NULL;