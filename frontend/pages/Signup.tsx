import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomTitle from "../components/BottomTitle";
import { Button } from "../components/Button";
import Heading from "../components/Heading";
import { Input } from "../components/InputField";
import { Popup } from "../components/Popup";

function Signup(): React.JSX.Element {
  const navigate = useNavigate();
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [userName, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [isSuccessPopupVisible, setIsSuccessPopupVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  async function handleClick() {
    try {
      const response = await axios.post("http://localhost:3000/signup", {
        firstName,
        lastName,
        userName,
        password,
      });
      console.log(response.data);
      if (response.data) {
        setIsSuccessPopupVisible(true);
        setSuccessMessage("Sign up successful");
      } else {
        setIsSuccessPopupVisible(true);
        setSuccessMessage("Account already exist");
      }
    } catch (err) {
      console.log(err);
      setSuccessMessage("Some error occured. Please try again");
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-stone-800">
      <div className="bg-white p-8 flex flex-col justify-center rounded-lg shadow-md w-full sm:w-96">
        <Heading title="SIGNUP" subtitle="Please enter the following details" />
        <Input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setfirstName(e.target.value);
          }}
          heading="First Name"
          placeholder="Enter your fitstname...."
          type="text"
        />
        <Input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setlastName(e.target.value);
          }}
          heading="Last Name"
          placeholder="Enter your lastname...."
          type="text"
        />
        <Input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setusername(e.target.value);
          }}
          heading="User Name"
          placeholder="Enter your email...."
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
        <Button label="SIGNUP" onChange={handleClick} />
        <BottomTitle already="Already" to="/signin" text="Signin" />
        {isSuccessPopupVisible && (
          <Popup
            onPress={() => {
              setIsSuccessPopupVisible(false);
              navigate("/signin");
            }}
            message={successMessage}
            buttontext="close"
          />
        )}
      </div>
    </div>
  );
}
export default Signup;
