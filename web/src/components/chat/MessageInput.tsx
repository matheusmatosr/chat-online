import React from 'react'
import { Box, IconButton, Input } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { useRef } from 'react'

export default function MessageInput({ socket }: { socket: any }) {
    const messageRef = useRef<HTMLInputElement>(null)

    const handleSend = () => {
        const message = messageRef.current?.value
        if (!message?.trim()) return
        socket.emit('message', message)
        messageRef.current!.value = ''
        messageRef.current!.focus()
    }

    return (
        <Box sx={{ display: 'flex', gap: 1 }}>
        <Input
            inputRef={messageRef}
            placeholder="Mensagem"
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            fullWidth
        />
        <IconButton onClick={handleSend} color="primary">
            <SendIcon />
        </IconButton>
        </Box>
    )
}
