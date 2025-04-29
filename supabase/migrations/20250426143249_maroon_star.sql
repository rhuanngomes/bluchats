/*
  # WhatsApp Integration Schema

  1. New Tables
    - `messages`
      - `id` (uuid, primary key)
      - `conversation_id` (uuid) - Reference to conversations table
      - `content` (text) - Message content
      - `sender_id` (uuid) - Reference to profiles table
      - `type` (text) - Message type (text, image, etc)
      - `status` (text) - Message status (sent, delivered, read)
      - `timestamp` (timestamptz) - When message was sent
      - `metadata` (jsonb) - Additional message data
      - `whatsapp_message_id` (text) - ID from WhatsApp API
      
    - `conversations`
      - `id` (uuid, primary key)
      - `whatsapp_number` (text) - Contact's WhatsApp number
      - `contact_name` (text) - Contact's name
      - `status` (text) - Conversation status (active, archived)
      - `last_message_at` (timestamptz) - Last message timestamp
      - `created_at` (timestamptz) - When conversation started
      - `updated_at` (timestamptz) - Last update timestamp
      - `metadata` (jsonb) - Additional conversation data

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
*/

-- Create conversations table
CREATE TABLE IF NOT EXISTS public.conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  whatsapp_number text NOT NULL,
  contact_name text,
  status text NOT NULL DEFAULT 'active',
  last_message_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  metadata jsonb DEFAULT '{}'::jsonb,
  UNIQUE(whatsapp_number)
);

-- Create messages table
CREATE TABLE IF NOT EXISTS public.messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
  content text NOT NULL,
  sender_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  type text NOT NULL DEFAULT 'text',
  status text NOT NULL DEFAULT 'sent',
  timestamp timestamptz DEFAULT now(),
  metadata jsonb DEFAULT '{}'::jsonb,
  whatsapp_message_id text,
  UNIQUE(whatsapp_message_id)
);

-- Enable RLS
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Policies for conversations
CREATE POLICY "Users can view conversations"
  ON public.conversations
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create conversations"
  ON public.conversations
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update conversations"
  ON public.conversations
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policies for messages
CREATE POLICY "Users can view messages"
  ON public.messages
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create messages"
  ON public.messages
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update messages"
  ON public.messages
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_conversations_last_message_at ON public.conversations(last_message_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_conversation_timestamp ON public.messages(conversation_id, timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_messages_whatsapp_id ON public.messages(whatsapp_message_id);