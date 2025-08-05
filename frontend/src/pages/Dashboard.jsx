import { useEffect, useState } from "react"
import axios from "axios"
import { User } from "../components/User"
export function Dashboard({ user }) {
    const [users, setUsers] = useState([])
    const [filter, setFilter] = useState('')
    const [balance, setBalance] = useState(0)
    useEffect(() => {
        axios.get('http://localhost:3000/api/v1/user/bulk?filter=' + filter)
            .then(response => {
                setUsers(response.data.users)
            })
    }, [filter])

    useEffect(() => {
        const token = localStorage.getItem('token')
        axios.get('http://localhost:3000/api/v1/account/balance', {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => setBalance(response.data.balance))
        .catch(console.error)
    }, [])
    return (
        <div className="box-border">
            <div className="flex justify-around gap-2 items-center p-3 border-1 border-gray-300">
                <div className="flex-1 text-2xl font-bold">Payments App</div>
                <div>Hello</div>
                <div className="flex justify-center items-center h-10 w-10 font-bold rounded-full bg-gray-300">
                    U
                </div>
            </div>
            <div className="flex items-center text-1xl font-bold p-4">
                <div>Your Balance :- {balance}</div>
            </div>
            <div className="p-4">
                <div className="text-1xl font-bold mb-4">
                    Users
                </div>
                <div>
                    <input onChange={(e) => {
                        setFilter(e.target.value)
                    }} type='text' placeholder="Search users..." className="w-full border-1 py-1 px-2 focus:outline-none border-gray-200 rounded-sm" />
                </div>
                <div className="mt-2">
                    {users.map((user) => {
                        return <User user={user} />
                    })}
                </div>
            </div>
        </div>
    )
}