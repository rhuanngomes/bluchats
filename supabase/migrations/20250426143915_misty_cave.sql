/*
  # Add Webhook URLs Configuration

  1. Changes
    - Create webhook_config table to store URLs for different event types
    - Add initial webhook URL configurations
    - Enable RLS and add policies

  2. Security
    - Only authenticated users can view webhook configs
    - Only admin users can modify webhook configs
*/

-- Create webhook_config table
CREATE TABLE IF NOT EXISTS public.webhook_config (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type text NOT NULL UNIQUE,
  url text NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.webhook_config ENABLE ROW LEVEL SECURITY;

-- Add policies
CREATE POLICY "Users can view webhook configs"
  ON public.webhook_config
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admin users can modify webhook configs"
  ON public.webhook_config
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid()
      AND role = 'Admin'
    )
  );

-- Insert initial webhook configurations
INSERT INTO public.webhook_config (event_type, url) VALUES
  ('message_sent', 'https://[PROJECT_REF].supabase.co/functions/v1/whatsapp/webhook'),
  ('message_received', 'https://[PROJECT_REF].supabase.co/functions/v1/whatsapp/webhook'),
  ('message_status', 'https://[PROJECT_REF].supabase.co/functions/v1/whatsapp/webhook'),
  ('presence', 'https://[PROJECT_REF].supabase.co/functions/v1/whatsapp/webhook'),
  ('connection', 'https://[PROJECT_REF].supabase.co/functions/v1/whatsapp/webhook')
ON CONFLICT (event_type) DO UPDATE
SET url = EXCLUDED.url;