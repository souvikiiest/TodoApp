import axios from "axios";
import { useEffect, useState } from "react";

interface Todo {
  title: string;
  description: string;
  done: boolean;
  Todoid: number;
}
export function useFetchTodos() {
  const [todoArray, setTodoArray] = useState<Todo[]>([]);
  useEffect(() => {
    axios
      .get<Todo[]>("http://localhost:3000/gettodo", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setTodoArray(res.data);
      })
      .catch((err) => {
        console.error("Some error occurred", err);
      });
  }, []);
  return todoArray;
}
