import { request } from "../utilityFunctions";
import history from "../components/history";


export function getAllTasks(queryParams = {}) {
  const queryString = Object.entries(queryParams)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  return dispatch => {
    dispatch({ type: "PROCESS" });
    request(`http://localhost:3001/task?${queryString}`)
      .then(tasks => {
        dispatch({ type: "GET_ALL_TASKS", tasks });
      })
      .catch(error => {
        console.log(error)
      });
  }
}

export function getSingleTask(taskId) {
  return dispatch => {
    dispatch({ type: "PROCESS" });
    request(`http://localhost:3001/task/${taskId}`)
      .then(task => {
        dispatch({ type: "GET_SINGLE_TASK", task });
      })
      .catch(error => {
        console.log(error)
      });
  }
}

export function addTask(newTask) {
  return dispatch => {
    dispatch({ type: "PROCESS" });
    request("http://localhost:3001/task", "POST", newTask)
      .then(task => {
        dispatch({ type: "ADD_TASK", task });
      })
      .catch(error => {
        console.log(error)
      });
  }
}

export function deleteTask(taskId, fromSingleTask) {
  return dispatch => {
    dispatch({ type: "PROCESS" });
    request(`http://localhost:3001/task/${taskId}`, "DELETE")
      .then(() => {
        dispatch({ type: "DELETE_TASK", taskId });
        if (fromSingleTask) history.push("/");
      })
      .catch(error => {
        console.log(error)
      });
  }
}

export function deleteSelectedTasks(selectedTaskIds) {
  //selectedTaskIds is a Set object
  return dispatch => {
    dispatch({ type: "PROCESS" });
    request(`http://localhost:3001/task`, "PATCH", { tasks: [...selectedTaskIds] })
      .then(() => {
        dispatch({ type: "DELETE_SELECTED_TASKS", selectedTaskIds });
      })
      .catch(error => {
        console.log(error)
      });
  }
}

export function editTask(editedTask, fromSingleTask) {
  return dispatch => {
    dispatch({ type: "PROCESS" });
    request(`http://localhost:3001/task/${editedTask._id}`, "PUT", editedTask)
      .then(() => {
        dispatch({ type: "EDIT_TASK", editedTask, fromSingleTask });
      })
      .catch(error => {
        console.log(error)
      });
  }
}

