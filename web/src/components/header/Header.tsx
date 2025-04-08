import React from 'react'
import { AppBar, Toolbar, IconButton, Badge } from '@mui/material'
import ChatBubbleIcon from '@mui/icons-material/ChatBubble'
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep'

interface HeaderProps {
  onToggleChat: () => void
  hasNewMessage: boolean
  onResetMessages: () => void
  isUsernameSet: boolean
}

export default function Header({ onToggleChat, hasNewMessage, onResetMessages, isUsernameSet }: HeaderProps) {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <IconButton color="inherit" onClick={onResetMessages} disabled={!isUsernameSet}>
          <DeleteSweepIcon />
        </IconButton>
        <IconButton color="inherit" onClick={onToggleChat} disabled={!isUsernameSet}>
          <Badge color="error" variant="dot" invisible={!hasNewMessage}>
            <ChatBubbleIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}
  
