export default function Input(props) {
  return (
    <input
      onKeyDown={props.onKeyDown}
      type={props.type}
      className={props.className}
      name={props.name}
      placeholder={props.placeholder}
      onChange={props.onChange}
      value={props.value}
    />
  );
}
