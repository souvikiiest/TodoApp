import React from "react";

interface Myprops {
  title: string;
  subtitle: string;
}

const Heading = (props: Myprops) => {
  return (
    <>
      <div className="sm:text-3xl pb-2 text-xl m-auto font-bold ">
        {props.title}
      </div>
      <div className="sm:text-xl pb-2 text-xs m-auto font-semibold ">
        {props.subtitle}
      </div>
    </>
  );
};
export default React.memo(Heading);
