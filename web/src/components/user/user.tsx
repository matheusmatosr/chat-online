import React, { useRef } from 'react'
import io from 'socket.io-client'
import { Input, Button, Box, Typography, Stack } from '@mui/material'

interface UserProps {
  setChatVisibility: (visible: boolean) => void
  setSocket: (socket: any) => void
  username: string | null
  setUsername: (name: string) => void
}

export default function User({ setChatVisibility, setSocket, username, setUsername }: UserProps) {
  const usernameRef = useRef<HTMLInputElement>(null)

  const handleSubmit = () => {
    const inputName = usernameRef.current?.value?.trim()
    if (!inputName) return

    const socket = io('http://localhost:3001')
    socket.emit('set_username', inputName)
    setUsername(inputName)
    setSocket(socket)
    setChatVisibility(true)
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 10 }}>
      <Typography variant="h4" gutterBottom>
        Chat em tempo real
      </Typography>

      {username ? (
        <Stack spacing={2} width="800px" alignItems="center">
          <Typography variant="subtitle1">Olá, {username}!</Typography>
          <Typography>Clique no ícone de mensagem no header para abrir a conversa</Typography>
          <Typography>Clique no ícone de lixeira no header para apagar a conversa</Typography>
        </Stack>
      ) : (
        <Stack spacing={2} width="300px">
          <Input inputRef={usernameRef} placeholder='Nome de usuário' fullWidth />
          <Button onClick={handleSubmit} variant="contained">Entrar</Button>
        </Stack>
      )}
    </Box>
  )
}

