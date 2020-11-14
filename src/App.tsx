import React, { useState } from 'react';
import './App.css';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Task, TaskType } from './components/task/task';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type KeysToChange = {
  name?: string;
  finished?: boolean;
  edit?: boolean;
  editValue?: string;
};

const changeArrProperties = (
  arr: { [key: string]: unknown }[],
  index: number,
  keysToChange: KeysToChange
) => {
  const newArr = [...arr];

  Object.entries(keysToChange).forEach(([key, value]) => {
    newArr[index][key] = value;
  });

  return newArr;
};

// type TaskToShow = 'all' | 'done' | 'todo';

const TodoApp = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [inputTask, setInputTask] = useState('');
  const [showTasks, setShowTasks] = useState('all');
  const newTasks = [...tasks];


  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTask(e.target.value);
  };

  const buttonClickHandler = () => {
    if (inputTask !== '') {
      setTasks([
        ...tasks,
        {
          name: inputTask,
          finished: false,
          edit: false,
          editValue: '',
        },
      ]);

      setInputTask('');
    }
  };

  const finishedChangeHandler = (index: number) => {
    const transformedArr = changeArrProperties(tasks, index, {
      finished: !tasks[index].finished
    }) as TaskType[];

    setTasks(transformedArr);
  };

  const editHandler = (index: number) => {
    newTasks[index].edit = !newTasks[index].edit;
    newTasks[index].editValue = newTasks[index].name;
    setTasks(newTasks);
  };

  const deleteHandler = (index: number) => {
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const editInputHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    newTasks[index].editValue = e.target.value;
    setTasks(newTasks);
  };

  const editCancelHandler = (index: number) => {
    newTasks[index].edit = false;
    newTasks[index].editValue = '';
    setTasks(newTasks);
  };

  const editSaveHandler = (index: number) => {
    newTasks[index].edit = false;
    newTasks[index].name = newTasks[index].editValue;
    newTasks[index].editValue = '';
    setTasks(newTasks);
  };

  const copyHandler = (index: number) => {
    const taskCopy = { ...tasks[index] };

    setTasks([...tasks, taskCopy]);
  };

  let filteredArr = tasks;
  if (showTasks === 'done') {
    filteredArr = [...tasks].filter(({ finished }) => {
      return finished;
    });
  } else if (showTasks === 'todo') {
    filteredArr = [...tasks].filter(({ finished }) => {
      return !finished;
    });
  }


  return (
    <Grid>
      <Row center="xs">
        <Col xs={12} md={9}>
          <div className="todo-app">
            <div className="header">
              <h2>Your todo list</h2>
              <h3>You have {tasks.length ? tasks.length : 'no'} tasks in total</h3>
              {/* <select
                value={showTasks}
                onChange={(e) => {
                  setShowTasks(e.target.value as TaskToShow);
                }}
              >
                <option value="all">All</option>
                <option value="done">Done</option>
                <option value="todo">Active</option>
              </select> */}
              <div>
                <button type="button" onClick={() => setShowTasks('all')}>All tasks</button>
                <button type="button" onClick={() => setShowTasks('todo')}>Active tasks</button>
                <button type="button" onClick={() => setShowTasks('done')}>Completed tasks</button>
              </div>
            </div>
            <input
              className="todo-app__task-form"
              placeholder="Enter your task..."
              type="text"
              value={inputTask}
              onChange={(e) => inputChangeHandler(e)}
            />
            <button type="button" className="button-actions" onClick={buttonClickHandler}>
              Add
            </button>
            <br /><br />
            <div>
              {filteredArr.map(({ name, finished, edit, editValue }, index) => (
                <Task
                  key={`${index + name}`}
                  name={name}
                  finished={finished}
                  edit={edit}
                  editValue={editValue}
                  index={index}
                  finishedChangeHandler={finishedChangeHandler}
                  editHandler={editHandler}
                  deleteHandler={deleteHandler}
                  editInputHandler={editInputHandler}
                  editCancelHandler={editCancelHandler}
                  editSaveHandler={editSaveHandler}
                  copyHandler={copyHandler}
                />

              ))}
            </div>
          </div>
        </Col>
      </Row>
    </Grid>
  );
};
export default TodoApp;

