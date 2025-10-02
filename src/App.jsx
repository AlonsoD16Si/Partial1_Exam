import { useState } from "react";
import PWABadge from "./PWABadge.jsx";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  const saveTodoToServer = async (todo) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Tarea guardada en servidor:", todo);
        resolve(todo);
      }, 1000);
    });
  };

  const deleteTodoFromServer = async (todoId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Tarea eliminada del servidor:", todoId);
        resolve(todoId);
      }, 800);
    });
  };

  const addTodo = async () => {
    if (inputValue.trim() !== "") {
      setLoading(true);

      const newTodo = {
        id: Date.now(),
        text: inputValue,
        completed: false,
      };

      try {
        await saveTodoToServer(newTodo);
        setTodos([...todos, newTodo]);
        setInputValue("");
      } catch (error) {
        console.error("Error al guardar tarea:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = async (id) => {
    setLoading(true);

    try {
      await deleteTodoFromServer(id);

      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <h1 className="text-center mb-4 text-primary">
            Mi Lista de Tareas
          </h1>

          <div className="card shadow mb-4">
            <div className="card-body">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Escribe una nueva tarea..."
                />
                <button
                  className="btn btn-primary"
                  onClick={addTodo}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Guardando...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-plus-circle me-1"></i>
                      Agregar
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="card shadow">
            <div className="card-body">
              {todos.length === 0 ? (
                <div className="text-center py-5 text-muted">
                  <i className="bi bi-inbox display-4 d-block mb-3"></i>
                  <p className="fs-5">No hay tareas pendientes</p>
                  <p className="text-muted">¡Agrega tu primera tarea!</p>
                </div>
              ) : (
                <div className="list-group list-group-flush">
                  {todos.map((todo) => (
                    <div
                      key={todo.id}
                      className={`list-group-item d-flex align-items-center ${
                        todo.completed ? "bg-light text-muted" : ""
                      }`}
                    >
                      <div className="form-check me-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={todo.completed}
                          onChange={() => toggleTodo(todo.id)}
                        />
                      </div>
                      <span
                        className={`flex-grow-1 ${
                          todo.completed ? "text-decoration-line-through" : ""
                        }`}
                      >
                        {todo.text}
                      </span>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => deleteTodo(todo.id)}
                        disabled={loading}
                      >
                        {loading ? (
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>
                        ) : (
                          <>
                            <i className="bi bi-trash me-1"></i>
                            Eliminar
                          </>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {todos.length > 0 && (
            <div className="card shadow mt-4">
              <div className="card-body">
                <div className="row text-center">
                  <div className="col-4">
                    <div className="text-primary fw-bold fs-4">
                      {todos.length}
                    </div>
                    <div className="text-muted">Total</div>
                  </div>
                  <div className="col-4">
                    <div className="text-success fw-bold fs-4">
                      {todos.filter((todo) => todo.completed).length}
                    </div>
                    <div className="text-muted">Completadas</div>
                  </div>
                  <div className="col-4">
                    <div className="text-warning fw-bold fs-4">
                      {todos.filter((todo) => !todo.completed).length}
                    </div>
                    <div className="text-muted">Pendientes</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-4">
            <PWABadge />
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
