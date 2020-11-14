import React, {FC} from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';

export type TaskType = {
  name: string,
  finished: boolean,
  edit: boolean,
  editValue: string,
};


export type Props = TaskType & {
  index: number,
  finishedChangeHandler: (index: number) => void,
  editHandler: (index: number) => void,
  deleteHandler: (index: number) => void,
  editInputHandler: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void,
  editCancelHandler: (index: number) => void,
  editSaveHandler: (index: number) => void,
  copyHandler: (index: number) => void,
};

export const Task: FC<Props> = ({
  name,
  finished,
  edit,
  editValue,
  index,
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
            onChange={() =>  finishedChangeHandler(index)}
            id={`${index}`}
          />
          <label
            htmlFor={`${index}`}
            className={`todo-app__text ${finished && 'todo-app__text--finished'}`}
          >
            {name}
          </label>
          <button type="button" className="button-actions button-actions--secondary" onClick={() => editHandler(index)}>Edit</button>
          <button type="button" className="button-actions button-actions--secondary" onClick={() => deleteHandler(index)}>Delete</button>
          <button type="button" className="button-actions button-actions--secondary" onClick={() => copyHandler(index)}>Copy</button>
        </div>) : (
          <div className="todo-app__task__actions">
            <div>
              <input
                type="text"
                className="todo-app__task-form todo-app__task--edit"
                value={editValue}
                onChange={(e) => editInputHandler(e, index)}
              />
              <button type="button" className="button-actions button-actions--secondary" onClick={() => editSaveHandler(index)}>Save</button>
              <button type="button" className="button-actions button-actions--secondary" onClick={() => editCancelHandler(index)}>Cancel</button>
            </div>
          </div>
      )}
    </div>
  );
};

