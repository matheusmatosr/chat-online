export interface ChatProps {
    socket: any
}

export interface Message {
    id?: string
    author: string
    text: string
    authorId: string
    edited?: boolean
    timestamp?: string
}
  