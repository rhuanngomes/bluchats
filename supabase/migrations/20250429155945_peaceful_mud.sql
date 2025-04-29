-- Drop existing function and trigger to avoid conflicts
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;

-- Create simplified handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  -- Create basic profile
  INSERT INTO public.profiles (
    id,
    email,
    status,
    role
  )
  VALUES (
    NEW.id,
    NEW.email,
    'active',
    'Básico'
  );

  -- Create users table entry
  INSERT INTO public.users (id)
  VALUES (NEW.id);

  -- Ensure email is confirmed
  NEW.email_confirmed_at = now();
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Ensure email confirmation for existing users
UPDATE auth.users 
SET email_confirmed_at = now() 
WHERE email_confirmed_at IS NULL;

-- Ensure basic profile exists for all users
INSERT INTO public.profiles (id, email, status, role)
SELECT id, email, 'active', 'Básico'
FROM auth.users
WHERE id NOT IN (SELECT id FROM public.profiles)
ON CONFLICT (id) DO NOTHING;

-- Ensure users table entries exist
INSERT INTO public.users (id)
SELECT id FROM auth.users 
WHERE id NOT IN (SELECT id FROM public.users)
ON CONFLICT (id) DO NOTHING;

-- Clean up and recreate core policies
DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;

CREATE POLICY "Users can read own profile"
ON public.profiles
FOR SELECT
TO authenticated
USING (id = auth.uid());

CREATE POLICY "Users can update own profile"
ON public.profiles
FOR UPDATE
TO authenticated
USING (id = auth.uid())
WITH CHECK (id = auth.uid());

CREATE POLICY "Users can insert own profile"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (id = auth.uid());