export function InputBox({label, placeholder, onChange}){
    return(
        <div className="my-1 w-full">    
            <div className="font-medium text-sm mb-1">
                {label}
            </div>
            <div>
                <input onChange={onChange} placeholder={placeholder} className="w-full border-1 py-1 px-2 focus:outline-none border-gray-200 rounded-sm"/>
            </div>
        </div>
    ) 
}