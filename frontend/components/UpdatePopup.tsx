import axios from "axios";
import React, { useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/InputField";
import { Popup } from "./Popup";
interface idType {
  id?: number;
  onClose: any;
  btnLabel: string;
  create: boolean;
}
export default function UpdatePopup({ id, onClose, create, btnLabel }: idType) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [successpopup, setSuccessPopup] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [isDelete, setIsDelete] = useState(false);

  async function handleClick() {
    if (create) {
      const response = await axios.post(
        "http://localhost:3000/addtodo",
        {
          title: title,
          description: description,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log(response);
      if (response.status) {
        setSuccessPopup(true);
        setSuccessMsg("Created successfully");
      } else {
        setSuccessMsg("Couldn't create ");
      }
    } else {
      if (isDelete) {
        const response = await axios.post("http://localhost:3000/update", {
          Todoid: id,
          title: title,
          description: description,
          isdelete: isDelete,
        });
        if (response.data.success) {
          setSuccessPopup(true);
          setSuccessMsg("Updated successfully");
        } else {
          setSuccessMsg("Couldn't update ");
        }
      } else {
        if (!title || !description) {
          setSuccessMsg("Title and description cannot be empty");
        } else {
          const response = axios.post("http://localhost:3000/update", {
            Todoid: id,
            title: title,
            description: description,
            isdelete: isDelete,
          });
          if ((await response).data.success) {
            setSuccessPopup(true);
            setSuccessMsg("Updated successfully");
          } else {
            setSuccessMsg("Couldn't update ");
          }
        }
      }
    }
  }
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-stone-400 bg-opacity-50">
      <div className="bg-white p-4 rounded-md shadow-md">
        <div
          className="flex justify-end top-0 right-0 cursor-pointer"
          onClick={onClose}
        >
          &#10006;
        </div>
        <Input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value);
          }}
          heading="Title"
          placeholder="Enter title..."
          type="text"
        />
        <Input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setDescription(e.target.value);
          }}
          heading="Description"
          placeholder="Enter description..."
          type="text"
        />
        <div className="flex items-center mt-4">
          {!create ? (
            <>
              <input
                type="checkbox"
                checked={isDelete}
                onChange={() => setIsDelete(!isDelete)}
                className="mr-2"
              />
              <label>Delete Todo</label>
            </>
          ) : (
            <div></div>
          )}

          <Button label={btnLabel} onChange={handleClick} />
          {successpopup && (
            <Popup
              onPress={() => setSuccessPopup(false)}
              message={successMsg}
              buttontext="close"
            />
          )}
        </div>
      </div>
    </div>
  );
}
