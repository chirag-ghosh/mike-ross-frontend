import { Button, Container, Paper, PasswordInput, TextInput, Title } from "@mantine/core";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../constants";
import { useThemeContext } from "../hooks/useThemeContext";

function Login() {
    const {colorMode} = useThemeContext()
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const loginHandler = () => {
        axios.post(`${BACKEND_URL}/user/login`, {email, password})
            .then((response) => {
                localStorage.setItem('isAuthenticated', 'true')
                localStorage.setItem('userData', JSON.stringify(response.data.user))
                navigate('/')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className={`login ${colorMode}`}>
            <Container size={420}>
            <Title
                align="center"
                sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
            >
                Welcome!
            </Title>
        
            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <TextInput value={email} onChange={(e) => setEmail(e.target.value)} label="Email" placeholder="Your email" required />
                <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} label="Password" placeholder="Your password" required mt="md" />
                <Button fullWidth mt="xl" onClick={loginHandler}>
                Sign in
                </Button>
            </Paper>
            </Container>
        </div>
      );
}

export default Login;