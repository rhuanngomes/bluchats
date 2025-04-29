/*
  # Inboxes Schema

  1. New Tables
    - `inboxes`
      - `id` (uuid, primary key)
      - `name` (text) - Inbox name
      - `description` (text) - Optional description
      - `tag` (text) - 3-letter tag identifier
      - `tag_color` (text) - Tag color in hex format
      - `avatar_url` (text) - Optional avatar image URL
      - `is_hidden` (boolean) - Whether inbox is hidden
      - `created_at` (timestamptz) - Creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp
    
    - `inbox_members`
      - Links users to inboxes with role (manager/member)

  2. Security
    - Enable RLS
    - Add policies for authenticated users
*/

-- Create inboxes table
CREATE TABLE IF NOT EXISTS public.inboxes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  tag text NOT NULL CHECK (char_length(tag) <= 3),
  tag_color text NOT NULL,
  avatar_url text,
  is_hidden boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create inbox_members table for managing roles
CREATE TABLE IF NOT EXISTS public.inbox_members (
  inbox_id uuid REFERENCES public.inboxes(id) ON DELETE CASCADE,
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('manager', 'member')),
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (inbox_id, user_id)
);

-- Enable RLS
ALTER TABLE public.inboxes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inbox_members ENABLE ROW LEVEL SECURITY;

-- Policies for inboxes
CREATE POLICY "Users can view inboxes they belong to"
  ON public.inboxes
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM inbox_members
      WHERE inbox_id = id
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create inboxes"
  ON public.inboxes
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policies for inbox_members
CREATE POLICY "Users can view inbox members"
  ON public.inbox_members
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM inbox_members
      WHERE inbox_id = inbox_members.inbox_id
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage inbox members if they are managers"
  ON public.inbox_members
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM inbox_members
      WHERE inbox_id = inbox_members.inbox_id
      AND user_id = auth.uid()
      AND role = 'manager'
    )
  );

-- Indexes
CREATE INDEX IF NOT EXISTS idx_inbox_members_user_id ON inbox_members(user_id);
CREATE INDEX IF NOT EXISTS idx_inbox_members_inbox_id ON inbox_members(inbox_id);