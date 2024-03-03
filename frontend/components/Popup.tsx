interface Myprops {
  buttontext: string;
  onPress: any;
  message: string;
}
export function Popup(props: Myprops) {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-md shadow-md">
        <p className="text-green-500">{props.message}</p>
        <button
          className="text-blue-500 hover:underline mt-2"
          onClick={props.onPress}
        >
          {props.buttontext}
        </button>
      </div>
    </div>
  );
}
