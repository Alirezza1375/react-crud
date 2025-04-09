
export default function Button (props) {
    return (
        <button 
            onClick={props.onClick} 
            type={props.type} 
            className={props.className}
        >
            {props.children}
        </button>
    )
}


