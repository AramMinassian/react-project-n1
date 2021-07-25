import requestWithToken from "../utility/requestWithToken";
import requestWithoutToken from "../utility/requestWithoutToken";
import history from "../utility/history";

const apiHost = process.env.REACT_APP_API_HOST;

export function getAllTasks(queryParams = {}) {
  const queryString = Object.entries(queryParams)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  return dispatch => {
    dispatch({ type: "PROCESS" });
    requestWithToken(`${apiHost}/task?${queryString}`)
      .then(tasks => {
        dispatch({ type: "GET_ALL_TASKS", tasks });
      })
      .catch(error => {
        dispatch({ type: "ERROR", errorMessage: error.message })
      });
  }
}

export function getSingleTask(taskId) {
  return dispatch => {
    dispatch({ type: "PROCESS" });
    requestWithToken(`${apiHost}/task/${taskId}`)
      .then(task => {
        dispatch({ type: "GET_SINGLE_TASK", task });
      })
      .catch(error => {
        dispatch({ type: "ERROR", errorMessage: error.message })
      });
  }
}

export function addTask(newTask) {
  return dispatch => {
    dispatch({ type: "PROCESS" });
    requestWithToken(`${apiHost}/task`, "POST", newTask)
      .then(task => {
        dispatch({ type: "ADD_TASK", task });
      })
      .catch(error => {
        dispatch({ type: "ERROR", errorMessage: error.message })
      });
  }
}

export function deleteTask(taskId, fromSingleTask) {
  return dispatch => {
    dispatch({ type: "PROCESS" });
    requestWithToken(`${apiHost}/task/${taskId}`, "DELETE")
      .then(() => {
        dispatch({ type: "DELETE_TASK", taskId });
        if (fromSingleTask) history.push("/");
      })
      .catch(error => {
        dispatch({ type: "ERROR", errorMessage: error.message })
      });
  }
}

export function deleteSelectedTasks(selectedTaskIds) {
  //selectedTaskIds is a Set object
  return dispatch => {
    dispatch({ type: "PROCESS" });
    requestWithToken(`${apiHost}/task`, "PATCH", { tasks: [...selectedTaskIds] })
      .then(() => {
        dispatch({ type: "DELETE_SELECTED_TASKS", selectedTaskIds });
      })
      .catch(error => {
        dispatch({ type: "ERROR", errorMessage: error.message })
      });
  }
}

export function editTask(task, fromSingleTask) {
  return dispatch => {
    dispatch({ type: "PROCESS" });
    requestWithToken(`${apiHost}/task/${task._id}`, "PUT", task)
      .then((editedTask) => {
        dispatch({ type: "EDIT_TASK", editedTask, fromSingleTask, status: task.status });
      })
      .catch(error => {
        dispatch({ type: "ERROR", errorMessage: error.message })
      });
  }
}

export function signUp(formData) {
  return dispatch => {
    dispatch({ type: "PROCESS" });
    requestWithoutToken(`${apiHost}/user`, "POST", formData)
      .then(() => {
        dispatch({ type: "SIGNUP" });
        history.push("/signin");
      })
      .catch(error => {
        dispatch({ type: "ERROR", errorMessage: error.message })
      });
  }
}

export function signIn(formData) {
  return dispatch => {
    dispatch({ type: "PROCESS" });
    requestWithoutToken(`${apiHost}/user/sign-in`, "POST", formData)
      .then((token) => {
        localStorage.setItem("token", JSON.stringify(token))
        dispatch({ type: "SIGNIN" });   
      })
      .then(() => requestWithToken(`${apiHost}/user`))
      .then(userInfo => {
        dispatch({ type: "GET_USER_INFO", userInfo });
        localStorage.setItem("user", JSON.stringify(userInfo))
      })
      .catch(error => {
        let message = error.message;
        if (/^.body/.test(message)) message = "Invalid login or password"
        dispatch({ type: "ERROR", errorMessage: message })
      });
  }
}

export function signOut(jwt) {
  return dispatch => {
    dispatch({ type: "PROCESS" });
    requestWithoutToken(`${apiHost}/user/sign-out`, "POST", { jwt })
      .then(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        dispatch({ type: "SIGNOUT" });
        history.push("/signin");
      })
      .catch(error => {
        dispatch({ type: "ERROR", errorMessage: error.message })
      });
  }
}

export function contact(formData) {
  return dispatch => {
    dispatch({ type: "PROCESS" });
    requestWithoutToken(`${apiHost}/form`, "POST", formData)
      .then(() => {
        dispatch({ type: "CONTACT" });
      })
      .catch(error => {
        dispatch({ type: "ERROR", errorMessage: error.message })
      });
  }
}


