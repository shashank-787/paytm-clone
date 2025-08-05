import { Link } from "react-router-dom"
export function BottomWarning({label, linkText, link }){
    return(
        <div className="text-sm font-medium px-5 h-10 flex items-center justify-center">
            <div>
                {label}
            </div>
            <Link className="pl-1 underline underline-offset-1" to={link}>
                {linkText}
            </Link>
        </div>
    ) 
}