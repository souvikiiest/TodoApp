interface Myprops {
  heading: string;
  placeholder: string;
  onChange: any;
  type: string;
}

export function Input(props: Myprops) {
  return (
    <div>
      <div className="mt-1 w-full  ">{props.heading}</div>
      <input
        onChange={props.onChange}
        className="mt-1 p-2 w-full border rounded-md"
        type={props.type}
        placeholder={props.placeholder}
      />
    </div>
  );
}
