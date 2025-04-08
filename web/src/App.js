import { useEffect, useState } from 'react'
import './App.css'

import User from './components/user/user.tsx'
import Chat from './pages/Chat.tsx'
import Header from './components/header/Header.tsx'

function App() {
  const [chatVisibility, setChatVisibility] = useState(false)
  const [socket, setSocket] = useState(null)
  const [hasNewMessage, setHasNewMessage] = useState(false)
  const [username, setUsername] = useState(null)

  const handleToggleChat = () => {
    if (!username) return
    setChatVisibility(!chatVisibility)
    setHasNewMessage(false)
  }

  const handleResetMessages = () => {
    localStorage.removeItem('messages')
    window.location.reload()
  }

  useEffect(() => {
    if (socket) {
      socket.on('receive_message', () => {
        if (!chatVisibility) {
          setHasNewMessage(true)
        }
      })
    }

    return () => {
      if (socket) socket.off('receive_message')
    }
  }, [socket, chatVisibility])

  return (
    <div className="App">
      <Header
        onToggleChat={handleToggleChat}
        hasNewMessage={hasNewMessage}
        onResetMessages={handleResetMessages}
        isUsernameSet={!!username}
      />
      {chatVisibility
        ? <Chat socket={socket} />
        : <User
            setSocket={setSocket}
            setChatVisibility={setChatVisibility}
            username={username}
            setUsername={setUsername}
          />
      }
    </div>
  )
}

export default App
