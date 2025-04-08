import React, { useState } from 'react'
import { Box, Typography, IconButton, TextField } from '@mui/material'
import { Message } from '../../types/types'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save'
import CloseIcon from '@mui/icons-material/Close'

export default function MessageItem({ message, socket }: { message: Message; socket: any }) {
    const isAuthor = message.authorId === socket.id
    const [isEditing, setIsEditing] = useState(false)
    const [editedText, setEditedText] = useState(message.text)

    const handleSave = () => {
        if (editedText.trim()) {
            socket.emit('edit_message', { id: message.id, text: editedText, edited: true })
            setIsEditing(false)
        }
    }

    const handleDelete = () => {
        if (message.id) socket.emit('delete_message', message.id)
    }

    return (
        <Box
            sx={{
                mb: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: isAuthor ? 'flex-end' : 'flex-start',
            }}
        >
            <Typography variant="body2" fontWeight="bold" sx={{pr: isAuthor ? '40px' : 0 }}>
                {message.author}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'flex-start', maxWidth: '80%' }}>
                <Box
                    sx={{
                        bgcolor: isAuthor ? 'primary.main' : 'grey.600',
                        color: 'white',
                        p: 1.5,
                        borderRadius: 2,
                        flexGrow: 1,
                    }}
                >
                    {isEditing ? (
                        <>
                            <TextField
                                value={editedText}
                                onChange={(e) => setEditedText(e.target.value)}
                                size="small"
                                fullWidth
                                sx={{ bgcolor: 'white', borderRadius: 1 }}
                                onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                            />
                            <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                                <IconButton onClick={handleSave} size="small" sx={{ color: 'white' }}>
                                    <SaveIcon />
                                </IconButton>
                                <IconButton onClick={() => setIsEditing(false)} size="small" sx={{ color: 'white' }}>
                                    <CloseIcon />
                                </IconButton>
                            </Box>
                        </>
                    ) : (
                        <Typography>{message.text}</Typography>
                    )}
                    {message.timestamp && (
                        <Typography variant="caption" sx={{ color: 'white', display: 'block', mt: 1, fontSize: 10 }}>
                            {new Date(message.timestamp).toLocaleString()}
                        </Typography>
                    )}
                    {!isEditing && message.edited && (
                        <Typography variant="caption" sx={{ fontStyle: 'italic', mt: 0.5, color: 'white' }}>
                            mensagem editada
                        </Typography>
                    )}
                </Box>
                {!isEditing && isAuthor && (
                    <Box sx={{ ml: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <IconButton onClick={() => setIsEditing(true)} size="small" sx={{ color: 'blue' }}>
                            <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton onClick={handleDelete} size="small" sx={{ color: 'red' }}>
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Box>
                )}
            </Box>
        </Box>
    )
}
