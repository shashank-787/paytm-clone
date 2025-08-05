import { Heading } from "../components/Heading"
import { SubHeading } from "../components/SubHeading"
import { InputBox } from "../components/InputBox"
import { Button } from "../components/Button"
import { BottomWarning } from "../components/BottomWarning"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export function Signin() {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    return (
        <div className="flex justify-center h-screen w-full bg-bermuda">
            <div className="flex items-center ">
                <div className="w-80 bg-white rounded-lg flex flex-col items-center px-5">
                    <Heading label="Sign in" />
                    <SubHeading label="Enter your credentials to access your account" />
                    <InputBox onChange={(e) => { setUsername(e.target.value) }} label="Email" placeholder="jhondoe@example.com" />
                    <InputBox onChange={e => { setPassword(e.target.value) }} label="Password" placeholder="" />
                    <div className="mt-3 w-full">
                        <Button onClick={async () => {
                            try {
                                const res = await axios.post('http://localhost:3000/api/v1/user/signin', {
                                    username,
                                    password
                                })
                                localStorage.setItem("token", res.data.token)
                                window.location.href  = '/dashboard'   
                            } catch (err) {
                                console.log('err occured')
                            }
                        }} label="Signin" />
                    </div>
                    <div className="my-1">
                        <BottomWarning label="Don't have an account?" linkText="Sign Up" link="link" />
                    </div>

                </div>
            </div>
        </div>
    )
}