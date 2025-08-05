import { useEffect, useState } from "react"
import axios from "axios"
const ProtectedRoute = ({ user, children }) => {
    //check whether user is authenticated
    if(user == null){
        return <p>Loading...</p>
    }
    return (
        children
    )
}

export default ProtectedRoute