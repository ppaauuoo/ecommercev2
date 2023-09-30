import { useEffect, useState } from "react";
import Goods from "./Goods";

export default function GoodsList() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    // This method fetches the records from the database.
    async function getTodos() {
      //for performance (if being outside useEffect block it will be created evertime this component is rendered)
      const response = await fetch(`http://localhost:5050/`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const data = await response.json();
      setTodos(data.pagerequire.goods);
    }

    getTodos();
    console.log(todos);
    return;
  }, [todos.length]); //useEffect trigger (if length changes > trigger useEffect again)

  // This method will map out the records on the table
  function todoList() {
    return todos.map((todo: any) => {
      return <Goods {...todo} key={todo._id} />;
    });
  }

  return (
    <>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4 mx-4">
          {todoList()}
        </div>
      </div>
    </>
  );
}
