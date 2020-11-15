import React, { FC } from 'react';
import '../../App.css';

export type TaskType = {
  id: string,
  name: string,
  finished: boolean,
  edit: boolean,
  editValue: string,
};


export type Props = TaskType & {
  finishedChangeHandler: (id: string) => void,
  editHandler: (id: string) => void,
  deleteHandler: (id: string) => void,
  editInputHandler: (e: React.ChangeEvent<HTMLInputElement>, 
    id: string) => void,
  editCancelHandler: (id: string) => void,
  editSaveHandler: (id: string) => void,
  copyHandler: (id: string) => void,
};

export const Task: FC<Props> = ({
  id,
  name,
  finished,
  edit,
  editValue,
  finishedChangeHandler,
  editHandler,
  deleteHandler,
  editInputHandler,
  editCancelHandler,
  editSaveHandler,
  copyHandler,

}) => {
  return (
    <div className="todo-app__task">
      {!edit ? (
        <div className="todo-app__task__actions">
          <input
            type="checkbox"
            className="todo-app__checkbox"
            checked={finished}
            onChange={() => finishedChangeHandler(id)}
            id={`${id}`}
          />
          <label
            htmlFor={`${id}`}
            className={`todo-app__text ${finished && 'todo-app__text--finished'}`}
          >
            {name}
          </label>
          <button type="button" className="button-actions button-actions--secondary" onClick={() => editHandler(id)}>Edit</button>
          <button type="button" className="button-actions button-actions--secondary" onClick={() => deleteHandler(id)}>Delete</button>
          <button type="button" className="button-actions button-actions--secondary" onClick={() => copyHandler(id)}>Copy</button>
        </div>) : (
          <div className="todo-app__task__actions">
            <div>
              <input
                type="text"
                className="todo-app__task-form todo-app__task--edit"
                value={editValue}
                onChange={(e) => editInputHandler(e, id)}
              />
              <button type="button" className="button-actions button-actions--secondary" onClick={() => editSaveHandler(id)}>Save</button>
              <button type="button" className="button-actions button-actions--secondary" onClick={() => editCancelHandler(id)}>Cancel</button>
            </div>
          </div>
      )}
    </div>
  );
};

