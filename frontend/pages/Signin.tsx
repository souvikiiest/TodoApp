import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomTitle from "../components/BottomTitle";
import { Button } from "../components/Button";
import Heading from "../components/Heading";
import { Input } from "../components/InputField";
import { Popup } from "../components/Popup";

function Signin(): React.JSX.Element {
  const navigate = useNavigate();
  const [userName, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [isSuccessPopupVisible, setIsSuccessPopupVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  async function handleCLick() {
    try {
      const clickres = await axios.post("http://localhost:3000/signin", {
        userName,
        password,
      });
      if (clickres.data) {
        localStorage.setItem("token", clickres.data.token);
        localStorage.setItem("firstName", clickres.data.response.firstName);
        localStorage.setItem("lastName", clickres.data.response.lastName);

        navigate("/Dashboard");
      } else {
        setIsSuccessPopupVisible(true);
        setSuccessMessage("Username or password is wrong");
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-stone-800">
      <div className="bg-white p-8 flex flex-col justify-center rounded-lg shadow-md w-full sm:w-96">
        <Heading title="SIGNIN" subtitle="Please enter the following details" />
        <Input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setusername(e.target.value);
          }}
          heading="User Name"
          placeholder="Enter your Email...."
          type="text"
        />
        <Input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setpassword(e.target.value);
          }}
          heading="Password"
          placeholder="Enter your password...."
          type="password"
        />
        <Button label="LOGIN" onChange={handleCLick} />
        <BottomTitle already="Don't" to="/signup" text="Signup" />
        {isSuccessPopupVisible && (
          <Popup
            onPress={() => setIsSuccessPopupVisible(false)}
            message={successMessage}
            buttontext="close"
          />
        )}
      </div>
    </div>
  );
}
export default Signin;
