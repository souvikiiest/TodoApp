import { useState } from "react";
import { Button } from "../components/Button";
import UpdatePopup from "../components/UpdatePopup";
import { User } from "../components/User";

export default function Dashboard() {
  const [popup, setPopup] = useState(false);
  const handleClick = () => {
    setPopup(true);
  };
  function onCloseHandler() {
    setPopup(false);
    window.location.reload();
  }
  return (
    <div className="flex flex-col items-center">
      <User />
      <Button full="0" label="Create New Todo" onChange={handleClick} />
      {popup && (
        <UpdatePopup
          create={true}
          btnLabel="CREATE TODO"
          onClose={onCloseHandler}
        />
      )}
    </div>
  );
}
