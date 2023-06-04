import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginHandler } from "../redux/reducers/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faPenToSquare,
} from "@fortawesome/free-regular-svg-icons";
import {
  faTrashCan,
  faFloppyDisk,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-hot-toast";

const MainPage = () => {
  const [todoData, setTodoData] = useState([{}]);
  const [fetched, setFetched] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const dispatch = useDispatch();

  const loginRedux = useSelector((state) => state.loginHandler.loginData);

  let addTask = useRef();

  useEffect(() => {
    keepLogin();
  }, []);

  useEffect(() => {
    getTodoList();
    setFetched(true);
  }, []);

  const keepLogin = async () => {
    try {
      let getStorage = parseInt(localStorage.getItem("userid"));
      let response = await axios.get(
        `http://localhost:5000/users/loginstatus?userid=${getStorage}`
      );
      dispatch(loginHandler(response.data));
    } catch (error) {}
  };

  const getTodoList = () => {
    let getStorage = parseInt(localStorage.getItem("userid"));
    axios
      .get(`http://localhost:5000/todo/gettodo/${getStorage}`)
      .then((response) => {
        setTodoData(response.data);
      });
  };
  const todoDone = (id) => {
    let taskDone = todoData.map((task) => {
      if (task.id === id) {
        return { ...task, status: !task.status };
      }
      return task;
    });
    setTodoData(taskDone);
    axios.patch(`http://localhost:5000/todo/updatestatus?id=${id}`);
  };

  const addTodo = async () => {
    try {
      let inputAdd = addTask.current.value;
      if (inputAdd === "") throw toast.error("Please fill out new task");
      let getUserid = parseInt(localStorage.getItem("userid"));
      await axios
        .post(`http://localhost:5000/todo/addtodo`, {
          userid: getUserid,
          toDoItem: inputAdd,
        })
        .then(getTodoList)
        .then((addTask.current.value = ""));
    } catch (error) {}
  };
  const handleEnter = (e) => {
    if (e.keyCode === 13) {
      addTodo();
    }
  };

  const deleteTodo = async (id) => {
    await axios
      .delete(`http://localhost:5000/todo/deletetodo?id=${id}`)
      .then(getTodoList);
  };
  const TodoMap = () => {
    let editText = useRef();
    const handleEdit = async (id) => {
      let inputEdit = editText.current.value;
      await axios
        .patch(`http://localhost:5000/todo/edittodo?id=${id}`, {
          toDoItem: inputEdit,
        })
        .then(getTodoList);
      setEditingId(null);
    };

    return todoData.map((val, i) => {
      return (
        <>
          <tr
            key={i}
            className={val.status ? "line-through decoration-2" : "my-1"}
          >
            <td className="text-center">{i + 1}</td>
            <td key={i}>
              {editingId === val.id ? (
                <input
                  type="text"
                  className="rounded-md bg-slate-600/60 w-40 px-1"
                  ref={editText}
                  defaultValue={val.toDoItem}
                  onKeyDown={(e) => {
                    if (e.keyCode === 13) {
                      handleEdit(val.id);
                    }
                  }}
                />
              ) : (
                <p className="ml-1">{val.toDoItem}</p>
              )}
            </td>
            <td className="text-center">
              <FontAwesomeIcon
                className={
                  val.status ? "done cursor-pointer" : "cursor-pointer"
                }
                icon={faCircleCheck}
                onClick={() => todoDone(val.id)}
              />
            </td>
            <td className="flex justify-center">
              {editingId === val.id ? (
                <span>
                  <FontAwesomeIcon
                    onClick={() => handleEdit(val.id)}
                    className="cursor-pointer save"
                    icon={faFloppyDisk}
                  />
                </span>
              ) : (
                <span>
                  <FontAwesomeIcon
                    onClick={() => setEditingId(val.id)}
                    className="mx-1 cursor-pointer edit"
                    icon={faPenToSquare}
                  />
                  <FontAwesomeIcon
                    onClick={() => deleteTodo(val.id)}
                    className="mx-2 cursor-pointer delete"
                    icon={faTrashCan}
                  />
                </span>
              )}
            </td>
          </tr>
        </>
      );
    });
  };

  
  if (!fetched) return null;
  return (
    <>
      <div className="container flex">
        <div className="content flex flex-col p-12 mx-20">
          {loginRedux.loginStatus ? (
            <>
              <h1 className="text-white text-2xl mb-5">
                Welcome back,{" "}
                <span className="italic font-bold ">
                  {loginRedux.username}{" "}
                </span>
              </h1>
            </>
          ) : (
            ""
          )}
          <div className="text-white shadow-lg w-96 todo-container rounded-xl p-5 flex flex-col bg-slate-800/80">
            <h1 className="font-bold border-b-2 mb-2">To Do List</h1>
            <table className="border-spacing-y-2 border-separate">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Task</th>
                  <th>Status</th>
                  <th colSpan="2">Action</th>
                </tr>
              </thead>
              <tbody>
                <TodoMap />
              </tbody>
            </table>
            <span className="ml-9">
              <input
                className="rounded-md bg-slate-600/60 px-1 mr-8 w-40"
                type="text"
                ref={addTask}
                onKeyDown={handleEnter}
              />
              <FontAwesomeIcon
                onClick={addTodo}
                className="add cursor-pointer"
                icon={faSquarePlus}
              />
            </span>
          </div>
          <div className="div2"></div>
        </div>
      </div>
    </>
  );
};
export default MainPage;
