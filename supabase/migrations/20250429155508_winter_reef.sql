-- Drop existing function and trigger
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;

-- Recreate handle_new_user function with proper error handling
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  -- Create profile with all necessary fields
  INSERT INTO public.profiles (
    id,
    email,
    full_name,
    username,
    role,
    status,
    company_name,
    requires_password_change
  )
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'Básico'),
    'active',
    NEW.raw_user_meta_data->>'company_name',
    COALESCE((NEW.raw_user_meta_data->>'requires_password_change')::boolean, false)
  );

  -- Create users table entry
  INSERT INTO public.users (id)
  VALUES (NEW.id);

  -- Set email as confirmed
  NEW.email_confirmed_at = COALESCE(NEW.email_confirmed_at, now());
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Drop existing policies
DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;

-- Create core policies
CREATE POLICY "Users can read own profile"
ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
ON public.profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

-- Ensure all existing users have confirmed emails
UPDATE auth.users 
SET email_confirmed_at = COALESCE(email_confirmed_at, now()) 
WHERE email_confirmed_at IS NULL;