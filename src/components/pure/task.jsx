import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Task } from '../../models/task.class';
import { Levels } from "../../models/levels.enum";

//style
import '../../styles/task_list.scss'

import '../../styles/task.scss'


const TaskComponent = ({ task, complete, remove, darkMode }) => {

     useEffect(() => {
          console.log("Created task");
          return () => {
               console.log(`Task: ${task.name} is going to unmount`);
          };
     }, [task]);

     /* Function that returns a badge depending on the level of the task */
     function taskLevelBadge() {
          switch (task.level) {
               case Levels.Normal:
                    return (
                         <h6 className='mb-0'>
                              <span className='badge bg-primary'>
                                   {task.level}
                              </span>
                         </h6>
                    )
               case Levels.Urgent:
                    return (
                         <h6 className='mb-0'>
                              <span className='badge bg-warning'>
                                   {task.level}
                              </span>
                         </h6>
                    )
               case Levels.Blocking:
                    return (
                         <h6 className='mb-0'>
                              <span className='badge bg-danger'>
                                   {task.level}
                              </span>
                         </h6>
                    )
               default:
                    break;
          }
     }
     /* Function that returns an icon depending on the completion state of the task */
     function taskCompletedIcon() {
          //added the logic for dark mode style change
          if (darkMode === true) {
               if (task.completed) {
                    return (<i onClick={() => complete(task)} className='bi-toggle-on task-icon' style={{ color: '#20902f', fontSize: '1.2rem' }}></i>
                    )
               } else {
                    return (<i onClick={() => complete(task)} className='bi-toggle-off task-icon' style={{ color: '#d2d2d2', fontSize: '1.2rem' }}></i>)
               }
          } else {
               if (task.completed) {
                    return (<i onClick={() => complete(task)} className='bi-toggle-on task-icon' style={{ color: 'green', fontSize: '1.2rem' }}></i>
                    )
               } else {
                    return (<i onClick={() => complete(task)} className='bi-toggle-off task-icon' style={{ color: 'grey', fontSize: '1.2rem' }}></i>)
               }
          }


     };

     const taskCompleted = {
          color: "grey",
          textDecoration: "line-through",
     }
     const taskPending = {
          fontWeight: ""
     }

     return (

          <tr className="fw-normal">
               <th>
                    <span className='ms-2' style={task.completed ? taskCompleted : taskPending}>{task.name}</span>
               </th>
               <td className='align-center'>
                    <span className='ms-2' style={task.completed ? taskCompleted : taskPending}>{task.description}</span>
               </td>
               <td className='align-center'>
                    {/* fuction -> badge segun task priority*/}
                    {taskLevelBadge()}
               </td>
               <td className='align-center'>
                    {taskCompletedIcon()}
                    <i onClick={() => remove(task)} className='bi-trash ms-3 task-icon' style={darkMode ? { color: '#d2d2d2', fontSize: '1.2rem' } : { color: 'grey', fontSize: '1.2rem' }}></i>
               </td>
          </tr>
     );
};


TaskComponent.propTypes = {
     task: PropTypes.object.isRequired,
     complete: PropTypes.func.isRequired,
     remove: PropTypes.func.isRequired,
};


export default TaskComponent;
