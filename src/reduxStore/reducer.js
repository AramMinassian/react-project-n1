
const defaultState = {
  tasks: [],
  task: null,
  inProcess: false,
  successMessage: null,
  errorMessage: null,
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
      const { errorMessage } = action.error;
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
      const task = (action.fromSingleTask) ? action.editedTask : null;
      return {
        ...state,
        tasks,
        task,
        inProcess: false,
        successMessage: "Task edited successfully"
      }
    }
    /*--------------------------------------------------------------------*/
    default: {
      return state;
    }
  }
}

export default reducer;