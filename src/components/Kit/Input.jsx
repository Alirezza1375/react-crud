
export default function Input (props) {
    return (
        <input 
            type={props.type} 
            className={props.className} 
            name={props.name} 
            placeholder={props.placeholder} 
            onChange={props.onChange}
            value={props.value}
        />
    )
}