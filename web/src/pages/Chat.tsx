import React, { useRef, useState, useEffect } from 'react'
import { Box, Paper, Typography } from '@mui/material'
import { ChatProps, Message } from '../types/types'
import MessageItem from '../components/chat/MessageItem.tsx'
import MessageInput from '../components/chat/MessageInput.tsx'

export default function Chat({ socket }: ChatProps) {
    const bottomRef = useRef<HTMLDivElement>(null)
    const [messageList, setMessageList] = useState<Message[]>(() => {
        const stored = localStorage.getItem('messages')
        return stored ? JSON.parse(stored) : []
    })
    
    useEffect(() => {
        socket.on('receive_message', (data: Message) => {
        setMessageList((current) => [...current, data])
        })

        socket.on('update_message', (updated: Message) => {
        setMessageList((current) =>
            current.map((msg) => (msg.id === updated.id ? { ...msg, ...updated } : msg))
        )
        })

        socket.on('delete_message', (id: string) => {
        setMessageList((current) => current.filter((msg) => msg.id !== id))
        })

        return () => {
        socket.off('receive_message')
        socket.off('update_message')
        socket.off('delete_message')
        }
    }, [socket])

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messageList])

    useEffect(() => {
        localStorage.setItem('messages', JSON.stringify(messageList))
    }, [messageList])
    
    return (
        <Box
        sx={{
            maxWidth: 600,
            mx: 'auto',
            mt: 4,
            display: 'flex',
            flexDirection: 'column',
            height: '80vh'
        }}
        >
            <Typography mb={4}>Clique no ícone de mensagem no header para sair do chat</Typography>
            <Paper elevation={3} sx={{ flexGrow: 1, p: 2, overflowY: 'auto', mb: 2 }}>
                {messageList.map((msg, idx) => (
                <MessageItem key={idx} message={msg} socket={socket} />
                ))}
                <div ref={bottomRef} />
            </Paper>
            <MessageInput socket={socket} />
        </Box>
    )
}
