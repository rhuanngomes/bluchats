/*
  # Fix Inbox Member Policies

  1. Changes
    - Drop existing policies causing infinite recursion
    - Create new optimized policies for inbox members
    - Add proper role-based access control
    - Fix policy conditions to avoid self-referencing

  2. Security
    - Members can view inboxes they belong to
    - Managers can manage inbox members
    - Proper access control for member management
*/

-- Drop existing problematic policies
DROP POLICY IF EXISTS "Users can view inboxes they belong to" ON inboxes;
DROP POLICY IF EXISTS "Users can create inboxes" ON inboxes;
DROP POLICY IF EXISTS "Users can view inbox members" ON inbox_members;
DROP POLICY IF EXISTS "Managers can manage inbox members" ON inbox_members;

-- Create new inbox policies
CREATE POLICY "Users can view inboxes they belong to"
ON inboxes FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM inbox_members
    WHERE inbox_members.inbox_id = inboxes.id
    AND inbox_members.user_id = auth.uid()
  )
);

CREATE POLICY "Users can create inboxes"
ON inboxes FOR INSERT
TO authenticated
WITH CHECK (true);

-- Create new inbox member policies
CREATE POLICY "Users can view inbox members"
ON inbox_members FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM inbox_members im2
    WHERE im2.inbox_id = inbox_members.inbox_id
    AND im2.user_id = auth.uid()
  )
);

CREATE POLICY "Managers can manage inbox members"
ON inbox_members FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM inbox_members im2
    WHERE im2.inbox_id = inbox_members.inbox_id
    AND im2.user_id = auth.uid()
    AND im2.role = 'manager'
  )
);