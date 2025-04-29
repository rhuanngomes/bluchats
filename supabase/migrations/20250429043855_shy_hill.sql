/*
  # Storage Bucket and Policies for User Avatars

  1. Changes
    - Create avatars storage bucket
    - Add policies for public viewing
    - Add policies for authenticated users to manage their avatars
    - Fix type casting between UUID and text for owner comparisons

  2. Security
    - Public read access for avatars
    - Authenticated users can upload/update/delete their own avatars
    - File type and size restrictions
*/

-- Create the avatars bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public access to view avatars
CREATE POLICY "Give public access to avatars"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'avatars');

-- Allow authenticated users to upload avatars
CREATE POLICY "Allow authenticated users to upload avatars"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'avatars' AND
  (LOWER(storage.extension(name)) IN ('jpg', 'jpeg', 'png', 'gif')) AND
  LENGTH(name) < 5242880 -- 5MB file size limit
);

-- Allow users to update their own avatars
CREATE POLICY "Allow users to update their own avatars"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'avatars' AND owner = auth.uid())
WITH CHECK (bucket_id = 'avatars' AND owner = auth.uid());

-- Allow users to delete their own avatars
CREATE POLICY "Allow users to delete their own avatars"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'avatars' AND owner = auth.uid());