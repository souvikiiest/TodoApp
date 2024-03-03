import React from "react";
import { Link } from "react-router-dom";

interface Myprops {
  text: string;
  already: string;
  to: string;
}

const BottomTitle = (props: Myprops): React.JSX.Element => {
  return (
    <div className="font-semibold text-base m-auto">
      {props.already} have an account? <Link to={props.to}>{props.text}</Link>
    </div>
  );
};
export default React.memo(BottomTitle);
