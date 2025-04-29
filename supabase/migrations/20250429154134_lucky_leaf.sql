/*
  # Disable Email Confirmation Requirement

  1. Changes
    - Disable email confirmation requirement for new signups
    - Allow immediate access after registration
    - Update existing users to confirmed status
*/

-- Update auth.users to mark all existing users as confirmed
UPDATE auth.users
SET email_confirmed_at = COALESCE(email_confirmed_at, now()),
    confirmed_at = COALESCE(confirmed_at, now());

-- Modify auth settings to disable email confirmation requirement
UPDATE auth.config
SET value = jsonb_set(
  value,
  '{mailer, enable_signup_email}',
  'false'::jsonb
);

-- Set default confirmed status for new users
ALTER TABLE auth.users
ALTER COLUMN email_confirmed_at
SET DEFAULT now();

ALTER TABLE auth.users
ALTER COLUMN confirmed_at
SET DEFAULT now();