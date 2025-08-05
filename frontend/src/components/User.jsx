import { useNavigate } from "react-router-dom"
export function User({ user }) {
    const navigate = useNavigate();
    return (
        <div className="flex justify-between items-center  p-2">
            <div className="inline-flex gap-2 items-center">
                <div className=" flex justify-center items-center h-10 w-10 font-bold rounded-full bg-gray-300">
                    {user.firstName[0]}
                </div>
                <p>{user.firstName} {user.lastName}</p>
            </div>
            <button onClick={(e) =>{
                navigate('/send?id=' + user._id + '&name=' + user.firstName)
            }} className="border-1 rounded-lg p-2 text-sm cursor-pointer bg-blue-900 text-white ">Send Money</button>
        </div>
    )
}