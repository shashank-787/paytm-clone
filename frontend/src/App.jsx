import { BrowserRouter, Routes, Route, useNavigate, Navigate } from "react-router-dom"
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Dashboard } from './pages/Dashboard'
import { SendMoney } from './pages/SendMoney'
import { useEffect, useState } from "react"
import axios from "axios"
import './App.css'
// import ProtectedRoute from "./components/ProtectedRoute"

function ProtectedRoute({ user, children }) {
    if (user === null) return <p>Loading...</p>;
    if (!user) return <Navigate to="/signin" />;
    return children;
}
function App() {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            setUser(false)
            return
        }
        axios.get('http://localhost:3000/api/v1/me', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => {
                setUser(res.data.userId)
            }
            )
            .catch(() => setUser(false))
    }, [])

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/signin" element={<Signin />} />
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute user={user}>
                                <Dashboard user={user} />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/send"
                        element={
                            <ProtectedRoute user={user}>
                                <SendMoney />
                            </ProtectedRoute>

                        }
                    />
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute user={user}>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
