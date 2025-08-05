export function Button({label, onClick}){
    return(
        <div onClick={onClick}  className="text-sm font-medium px-5 h-10 rounded-lg flex items-center justify-center cursor-pointer text-white bg-blue-800 hover:bg-blue-900">
            {label}
        </div>
    ) 
}