interface Myprops {
  label: string;
  onChange: any;
  full?: string;
}

export function Button(props: Myprops) {
  return (
    <>
      <button
        className={`bg-blue-500 text-white p-2 m-3 rounded-md ${
          props.full || "w-full"
        }`}
        onClick={props.onChange}
      >
        {props.label}
      </button>
    </>
  );
}
