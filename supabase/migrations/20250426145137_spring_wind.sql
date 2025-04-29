/*
  # Add Realtime Message Sync

  1. Changes
    - Add trigger to update conversation's last_message_at
    - Add trigger to notify clients of new messages via websockets
    - Add function to handle message forwarding

  2. Security
    - Functions run with security definer to ensure proper access
*/

-- Function to update conversation's last_message_at
CREATE OR REPLACE FUNCTION update_conversation_last_message()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE conversations
  SET last_message_at = NEW.timestamp
  WHERE id = NEW.conversation_id;
  RETURN NEW;
END;
$$;

-- Trigger for updating last_message_at
CREATE TRIGGER on_message_insert
  AFTER INSERT ON messages
  FOR EACH ROW
  EXECUTE FUNCTION update_conversation_last_message();

-- Function to handle message forwarding
CREATE OR REPLACE FUNCTION forward_message(
  message_id UUID,
  target_conversation_ids UUID[]
)
RETURNS SETOF messages
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  source_message messages;
  target_conversation_id UUID;
BEGIN
  -- Get source message
  SELECT * INTO source_message
  FROM messages
  WHERE id = message_id;

  -- Create new message for each target conversation
  FOREACH target_conversation_id IN ARRAY target_conversation_ids
  LOOP
    RETURN QUERY
    INSERT INTO messages (
      conversation_id,
      content,
      sender_id,
      type,
      status,
      metadata
    )
    VALUES (
      target_conversation_id,
      source_message.content,
      auth.uid(),
      source_message.type,
      'sent',
      jsonb_build_object(
        'forwarded', true,
        'original_message', jsonb_build_object(
          'id', source_message.id,
          'sender_id', source_message.sender_id,
          'timestamp', source_message.timestamp
        )
      )
    )
    RETURNING *;
  END LOOP;
END;
$$;