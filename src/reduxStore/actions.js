import { request } from "../utilityFunctions";
import history from "../components/history";

const apiHost = process.env.REACT_APP_API_HOST;

export function getAllTasks(queryParams = {}) {
  const queryString = Object.entries(queryParams)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  return dispatch => {
    dispatch({ type: "PROCESS" });
    request(`${apiHost}/task?${queryString}`)
      .then(tasks => {
        dispatch({ type: "GET_ALL_TASKS", tasks });
      })
      .catch(error => {
        dispatch({type: "ERROR", errorMessage: error.message})
      });
  }
}

export function getSingleTask(taskId) {
  return dispatch => {
    dispatch({ type: "PROCESS" });
    request(`${apiHost}/task/${taskId}`)
      .then(task => {
        dispatch({ type: "GET_SINGLE_TASK", task });
      })
      .catch(error => {
        dispatch({type: "ERROR", errorMessage: error.message})
      });
  }
}

export function addTask(newTask) {
  return dispatch => {
    dispatch({ type: "PROCESS" });
    request(`${apiHost}/task`, "POST", newTask)
      .then(task => {
        dispatch({ type: "ADD_TASK", task });
      })
      .catch(error => {
        dispatch({type: "ERROR", errorMessage: error.message})
      });
  }
}

export function deleteTask(taskId, fromSingleTask) {
  return dispatch => {
    dispatch({ type: "PROCESS" });
    request(`${apiHost}/task/${taskId}`, "DELETE")
      .then(() => {
        dispatch({ type: "DELETE_TASK", taskId });
        if (fromSingleTask) history.push("/");
      })
      .catch(error => {
        dispatch({type: "ERROR", errorMessage: error.message})
      });
  }
}

export function deleteSelectedTasks(selectedTaskIds) {
  //selectedTaskIds is a Set object
  return dispatch => {
    dispatch({ type: "PROCESS" });
    request(`${apiHost}/task`, "PATCH", { tasks: [...selectedTaskIds] })
      .then(() => {
        dispatch({ type: "DELETE_SELECTED_TASKS", selectedTaskIds });
      })
      .catch(error => {
        dispatch({type: "ERROR", errorMessage: error.message})
      });
  }
}

export function editTask(editedTask, fromSingleTask) {
  return dispatch => {
    dispatch({ type: "PROCESS" });
    request(`${apiHost}/task/${editedTask._id}`, "PUT", editedTask)
      .then(() => {
        dispatch({ type: "EDIT_TASK", editedTask, fromSingleTask });
      })
      .catch(error => {
        dispatch({type: "ERROR", errorMessage: error.message})
      });
  }
}

