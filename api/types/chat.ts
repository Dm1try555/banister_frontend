// ============================================================================
// Chat Types
// ============================================================================

export interface ChatMessage {
  id: number
  sender: {
    id: number
    first_name: string
    last_name: string
    email: string
    avatar?: string
  }
  recipient: {
    id: number
    first_name: string
    last_name: string
    email: string
    avatar?: string
  }
  message: string
  message_type: 'text' | 'image' | 'file' | 'system'
  is_read: boolean
  created_at: string
  updated_at: string
  reply_to?: number
  attachments?: ChatAttachment[]
}

export interface ChatAttachment {
  id: number
  file_name: string
  file_url: string
  file_size: number
  file_type: string
  uploaded_at: string
}

export interface ChatMessageCreate {
  recipient_id: number
  message: string
  message_type?: 'text' | 'image' | 'file'
  reply_to?: number
  attachments?: File[]
}

export interface ChatMessageUpdate {
  message?: string
  message_type?: 'text' | 'image' | 'file'
}

export interface ChatConversation {
  id: number
  participants: ChatParticipant[]
  last_message?: ChatMessage
  unread_count: number
  created_at: string
  updated_at: string
  is_archived: boolean
  is_muted: boolean
}

export interface ChatParticipant {
  id: number
  first_name: string
  last_name: string
  email: string
  avatar?: string
  is_online: boolean
  last_seen?: string
  role: string
}

export interface ChatConversationCreate {
  participant_ids: number[]
  initial_message?: string
}

export interface ChatSearchParams {
  page?: number
  page_size?: number
  search?: string
  conversation_id?: number
  message_type?: string
  is_read?: boolean
  date_from?: string
  date_to?: string
}

export interface ChatOnlineStatus {
  user_id: number
  is_online: boolean
  last_seen: string
}

export interface ChatTypingStatus {
  user_id: number
  conversation_id: number
  is_typing: boolean
}

export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export interface ChatStats {
  total_messages: number
  unread_messages: number
  total_conversations: number
  active_conversations: number
}