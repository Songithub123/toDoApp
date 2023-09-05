import { useReducer } from 'react';
import './App.css';
import TaskBox from './taskBox';

export const Actions = {
  addTask: "add-task",
  deleteTask: "delete-task",
  editTask: "edit-task",
  markComplete: "mark-as-completed",
  unmark: "mark-as-uncompleted",
  //filterTask : "filter-task"
};

function reducer(state, action) {
  switch (action.type) {
    case Actions.addTask:
      break;
    case Actions.deleteTask:
      break;
    case Actions.editTask:
      break;
    case Actions.markComplete:
      break;  
    case Actions.unmark:
      break;
  }
}

function App() {
  const [state, dispatchFunction] = useReducer(reducer, []);
  return (
    <>
      <div className="app-grid">
        <form>
          <label htmlFor="input-task"><strong>New task:</strong></label>
          <input id="input-task" type="text"></input>
          <input type="submit" id="add-task" value="Save"></input>
          <input type="button" id="remove-task" value="Remove"></input>
          <button type="button" id="mark-task" className="tooltip">Mark
                    <span className="tooltiptext" >mark task as completed or uncompleted</span>
                </button>
        </form>
        <div className="task-list">
          {state}
        </div>
      </div>
    </>
  );
}

export default App;
