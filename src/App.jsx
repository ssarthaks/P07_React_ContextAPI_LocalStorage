import { useEffect, useState } from "react";
import "./App.css";
import Index from "./context/Index";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const removeTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // const updateTodo = (id, todo) => {
  //   setTodos((prev) => prev.map((eachVal) => {
  //     if(eachVal.id === id){
  //       todo
  //     } else {
  //       eachVal
  //     }
  //   }))
  // }

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((eachVal) => (eachVal.id === id ? todo : eachVal))
    );
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((eachVal) => eachVal.id === id ? { ...eachVal, completed: !eachVal.completed } : eachVal
      )
    );
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));

    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <Index.TodoContextProvider
      value={{ todos, addTodo, removeTodo, updateTodo, toggleComplete }}
    >
      <h1 className="text-2xl p-3 bg-blue-950 text-white text-center">
        Hello world
      </h1>

      <div className="mt-14 py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <Index.TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <Index.TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Index.TodoContextProvider>
  );
}

export default App;
