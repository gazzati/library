import React, {useState} from "react"
import {Container} from "@material-ui/core"

import Auth from "./components/Auth"
import Header from "./components/Header"
import Navbar from "./components/Navbar"
import AllBooks from "./components/AllBooks"
import MyBooks from "./components/MyBooks"

export const baseUrl = 'http://localhost:4000/'

function App() {
    const [user, setUser] = useState(null)
    const [mode, setMode] = useState(0)
    const [open, setOpen] = useState(false)

    const login = async (data) => {
        const response = await fetch(baseUrl + 'auth/login', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const userData = await response.json()
        setUser(userData.data)
    }

    const registration = async (data) => {
        const response = await fetch(baseUrl + 'auth/registration', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const userData = await response.json()
        setUser(userData.data)
    }

    if (!user) {
        return <Auth login={login} registration={registration} />
    }

    return (
        <Container>
            <Header open={open} setOpen={setOpen} user={user}/>
            <Navbar open={open} setOpen={setOpen} mode={mode} setMode={setMode}/>
            {mode === 0 && <AllBooks open={open} userId={user._id}/>}
            {mode === 1 && <MyBooks open={open} userId={user._id}/>}
        </Container>
    )
}

export default App
