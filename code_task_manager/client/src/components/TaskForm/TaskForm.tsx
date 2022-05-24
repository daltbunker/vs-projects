import React, { ChangeEvent, FormEvent, useContext, useState } from 'react'
import { BsFolderX } from 'react-icons/bs';
import { FaPlus } from 'react-icons/fa';
import { ITaskContext, TaskContext } from '../../context/TaskService';
import { INewTask, Priority } from '../../models/TaskModel';
import './TaskForm.css';

type Props = {}

const defaultTask: INewTask = {
  description: '',
  priority: Priority.Low,
  files: [],
  notes: '',
  completed: false,

}

export default function TaskForm({}: Props) {

  const [newFiles, setNewFiles] = useState<string[]>([]);
  const { addTask } = useContext(TaskContext) as ITaskContext 
  const [newTask, setNewTask] = useState<INewTask>(defaultTask);

  function addFile(): void {
    setNewFiles(prevFiles => {
        return [...prevFiles, ''];
    })
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setNewTask(prevState => {
      return {
        ...prevState,
        [name]: value
      }
    })
  }

  function toggleCompleted() {
    setNewTask(prevState => {
      return {
        ...prevState,
        completed: !prevState.completed
      }
    })
  }

  function deleteFile(index: number) {
      setNewFiles(prevFiles => {
          const currFiles = [...prevFiles];
          currFiles.splice(index, 1);
          return currFiles;
      })
  }

  function handleAddTask(e: FormEvent) {
    e.preventDefault();
    const fileInputs = document.getElementsByClassName('input-edit-file') as HTMLCollectionOf<HTMLInputElement>
    const newFiles = [];
    for (let i = 0; i < fileInputs.length; i++) {
        newFiles.push(fileInputs[i].value)
    }
    const currTask = {...newTask, files: [...newFiles]}
    addTask(currTask)
    setNewTask(defaultTask)
    setNewFiles([]);
  }
  
  return (
    <form onSubmit={handleAddTask} className='dresser-col task-form'>
      <div className='input-container'>
        <label>description: </label>
        <input type='text' onChange={handleInputChange} name='description' value={newTask.description} />
      </div>
      <div className='input-container'>
        <label>priority: </label>
        <select name="priority" onChange={handleInputChange} value={newTask.priority}>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
        </select>
      </div>
      <div className='input-container' style={{marginTop: '0.5em'}}>
        <label style={{position: 'relative', top: '-0.2em'}}>completed: </label>
        <input type="checkbox" name="completed" onChange={toggleCompleted} checked={newTask.completed} />
      </div>
      <div className='input-container'>
        <label>notes: </label>
        <textarea cols={16} name="notes" value={newTask.notes} onChange={handleInputChange} />
      </div>
      <div className='dresser-col' style={{color: 'white'}}>
        <div className="dresser-row">
          <label style={{fontSize: '1.2em', color: 'white'}}>files: </label>
          <FaPlus className='grow' onClick={addFile} fontSize={15} style={{marginLeft: 10, color: 'white'}} />
        </div>
        {newFiles.map((file, i) => {
          return (
              <div key={i + file} className='dresser-col' style={{rowGap: 3}}>
                  <BsFolderX onClick={() => deleteFile(i)} className="grow" fontSize={25} style={{color: 'white'}} />
                  <input 
                      type='text' 
                      className='input-edit-file' 
                      defaultValue={file}
                      placeholder={'text here...'}
                      required 
                  />
              </div>
          )
        })}
      </div>
      <button className='primary-btn green' style={{marginTop: 25}}>Add Task</button>
    </form>
  )
}