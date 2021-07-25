
const defaultState = {
  tasks: [],
  task: null,
  inProcess: false,
  successMessage: null,
  errorMessage: null,
  loggedIn: !!localStorage.getItem("token"),
  userInfo: JSON.parse(localStorage.getItem("user"))
}


function reducer(state = defaultState, action) {

  switch (action.type) {
    /*--------------------------------------------------------------------*/
    case "PROCESS": {
      return {
        ...state,
        inProcess: true,
        successMessage: null,
        errorMessage: null,
      }
    }
    /*--------------------------------------------------------------------*/
    case "ERROR": {
      const { errorMessage } = action;
      return {
        ...state,
        inProcess: false,
        errorMessage
      }
    }
    /*--------------------------------------------------------------------*/
    case "GET_ALL_TASKS": {
      const tasks = action.tasks;
      return {
        ...state,
        tasks,
        task: null,
        inProcess: false
      }
    }
    /*--------------------------------------------------------------------*/
    case "GET_SINGLE_TASK": {
      const task = action.task;
      return {
        ...state,
        task,
        inProcess: false
      }
    }
    /*--------------------------------------------------------------------*/
    case "ADD_TASK": {
      const tasks = [...state.tasks, action.task]
      return {
        ...state,
        tasks,
        inProcess: false,
        successMessage: "Task added successfully"
      }
    }
    /*--------------------------------------------------------------------*/
    case "DELETE_TASK": {
      const tasks = state.tasks.filter(task => task._id !== action.taskId)
      return {
        ...state,
        tasks,
        inProcess: false,
        successMessage: "Task deleted successfully"
      }
    }
    /*--------------------------------------------------------------------*/
    case "DELETE_SELECTED_TASKS": {
      const tasks = state.tasks.filter(task => {
        return !action.selectedTaskIds.has(task._id);
      });
      return {
        ...state,
        tasks,
        inProcess: false,
        successMessage: `Selected task${action.selectedTaskIds.size > 1 ? "s" : ""} deleted successfully`
      }
    }
    /*--------------------------------------------------------------------*/
    case "EDIT_TASK": {
      const tasks = state.tasks.map(task => {
        return (task._id === action.editedTask._id) ? action.editedTask : task;
      })

      let successMessage = "Task edited successfully";
      //if task status is being updated
      if (action.status) {
        successMessage = (action.status === "done") ? "Task fulfilled successfully" : "Task reactivated successfully"
      }

      const task = (action.fromSingleTask) ? action.editedTask : null;
      return {
        ...state,
        tasks,
        task,
        inProcess: false,
        successMessage
      }
    }
    /*--------------------------------------------------------------------*/
    case "SIGNUP": {
      return {
        ...state,
        inProcess: false,
        successMessage: "Successfully signed up"
      }
    }
    /*--------------------------------------------------------------------*/
    case "SIGNIN": {
      return {
        ...state,
      }
    }
    /*--------------------------------------------------------------------*/
    case "SIGNOUT": {
      return {
        ...state,
        inProcess: false,
        loggedIn: false,
        userInfo: null,
      }
    }
    /*--------------------------------------------------------------------*/
    case "GET_USER_INFO": {
      const { userInfo } = action;
      return {
        ...state,
        inProcess: false,
        loggedIn: true,
        userInfo,
        successMessage: `Welcome ${userInfo.name} ${userInfo.surname}`
      }
    }
    /*--------------------------------------------------------------------*/
    case "CONTACT": {
      return {
        ...state,
        inProcess: false,
        successMessage: "Message sent successfully"
      }
    }
    /*--------------------------------------------------------------------*/
    default: {
      return state;
    }
  }
}

export default reducer;