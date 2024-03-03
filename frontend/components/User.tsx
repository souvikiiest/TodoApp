import { useState } from "react";
import { useFetchTodos } from "../Hooks/AllHooks";
import TopBar from "./TopBar";
import UpdatePopup from "./UpdatePopup";
interface Todo {
  title: string;
  description: string;
  done: boolean;
  Todoid: number;
}

export function User() {
  const todos: Todo[] = useFetchTodos();

  const [popup, setPopup] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState<number>(0);
  // const handleDoneClick = async (id: number) => {
  //   setSelectedTodoId(id);
  //   const doneRes = await axios.post("http://localhost:3000/done", {
  //     Todoid: selectedTodoId,
  //   });
  //   console.log(selectedTodoId);
  //   if (doneRes.data.success) {
  //     window.location.reload();
  //   }
  // };
  const handleClick = (id: number) => {
    setSelectedTodoId(id);

    setPopup(true);
  };
  function onCloseHandler() {
    setPopup(false);
    window.location.reload();
  }
  return (
    <div className="container mx-auto p-4">
      <TopBar />
      {/* <input
        className="w-full p-2 mb-4 border border-gray-300 rounded-md"
        type="text"
        placeholder="Search Todo..."
      /> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {todos.map((todo) => (
          <div
            key={todo.title}
            className="bg-white p-4 border border-gray-300 rounded-md"
          >
            <div className="flex justify-between ">
              <strong className="block text-lg mb-2">{todo.title}</strong>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2  rounded"
                onClick={() => {
                  handleClick(todo.Todoid);
                }}
              >
                Edit
              </button>
              {popup && (
                <UpdatePopup
                  create={false}
                  btnLabel="UPDATE TODO"
                  id={selectedTodoId}
                  onClose={onCloseHandler}
                />
              )}
            </div>
            <div className="flex justify-between">
              <p className="">{todo.description}</p>
              {todo.done ? (
                <p className="text-green-500 ">Todo completed</p>
              ) : (
                <p className="text-red-500 ">Incomplete</p>
              )}
            </div>
            {/* <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2  rounded"
              onClick={() => {
                handleDoneClick(todo.Todoid);
              }}
            >
              MARK AS COMPLETE
            </button> */}
          </div>
        ))}
      </div>
    </div>
  );
}
