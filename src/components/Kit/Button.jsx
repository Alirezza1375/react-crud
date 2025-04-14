export default function Button(props) {
  return (
    <button
      onClick={props.disabled ? () => {
      } : props.onClick}
      type={props.type}
      className={props.className}
      style={
        props.disabled ? { cursor: 'not-allowed', opacity: 0.5 } : {}
      }
    >
      {props.children}
    </button>
  )
}


