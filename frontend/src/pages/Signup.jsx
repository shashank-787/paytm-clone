import { useState } from "react"
import  axios  from "axios"
import { Heading } from "../components/Heading"
import { SubHeading } from "../components/SubHeading"
import { InputBox } from "../components/InputBox"
import { Button } from "../components/Button"
import { BottomWarning } from "../components/BottomWarning"
import { useNavigate } from "react-router-dom"

export function Signup(){
    
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    return (
        <div className="flex justify-center h-screen w-full bg-bermuda">
            <div className="flex items-center ">
                <div className="w-80 bg-white rounded-lg flex flex-col items-center px-5">
                    <Heading label = "Sign up"/>
                    <SubHeading label = "Enter your informaiton to create an account"/>
                    <InputBox onChange = {e => {setFirstName(e.target.value)}} label = "First Name" placeholder= "John"/>
                    <InputBox onChange = {e => {setLastName(e.target.value)}} label = "Last Name" placeholder= "Doe"/>
                    <InputBox onChange = {e => {setUsername(e.target.value)}} label = "Email" placeholder= "harkirat@gmail.com"/>
                    <InputBox onChange = {e => {setPassword(e.target.value)}} label = "Password" placeholder= "123456"/>
                    <div className="mt-3 w-full">
                        <Button onClick={async () => {
                            const res = await axios.post('http://localhost:3000/api/v1/user/signup', {
                                firstName,
                                lastName,
                                username,
                                password
                            })
                            localStorage.setItem("token", res.data.token)
                            window.location.href  = '/dashboard' 
                        }} label= "Signup"/>
                    </div>
                    <div className="my-1">
                        <BottomWarning label="Already have an account?" linkText="Login" link="link"/>
                    </div>

                </div>  
            </div>
        </div>
    )
}