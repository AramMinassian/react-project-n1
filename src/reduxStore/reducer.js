
const defaultState = {
  tasks: [],
  inProcess: false
}


function reducer(state = defaultState, action) {

  switch (action.type) {
    /*--------------------------------------------------------------------*/
    case "PROCESS": {
      return {
        ...state,
        inProcess: true
      }
    }
    /*--------------------------------------------------------------------*/
    case "GET_ALL_TASKS": {
      const tasks = action.tasks;
      return {
        ...state,
        tasks,
        inProcess: false
      }
    }
    /*--------------------------------------------------------------------*/
    case "ADD_TASK": {
      const tasks = [...state.tasks, action.task]
      return {
        ...state,
        tasks,
        inProcess: false
      }
    }
    /*--------------------------------------------------------------------*/
    case "DELETE_TASK": {
      const tasks = state.tasks.filter(task => task._id !== action.taskId)
      return {
        ...state,
        tasks,
        inProcess: false
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
        inProcess: false
      }
    }
    /*--------------------------------------------------------------------*/
    case "EDIT_TASK": {
      const tasks = state.tasks.map(task => {
        return (task._id === action.editedTask._id) ? action.editedTask : task;
      })
      return {
        ...state,
        tasks,
        inProcess: false
      }
    }
    /*--------------------------------------------------------------------*/
    default: {
      return state;
    }
  }
}

export default reducer;