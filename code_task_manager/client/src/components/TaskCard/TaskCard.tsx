import React, { useState, useContext, ChangeEvent } from 'react'
import { BsChevronExpand, BsFillFolderFill, BsFolderX } from 'react-icons/bs';
import { FaCheckCircle, FaCircle, FaPlus } from 'react-icons/fa';
import { ITaskContext, TaskContext } from '../../context/TaskService';
import { ITask } from '../../models/TaskModel'
import './TaskCard.css'

type Props = {
    data: ITask;
}

export default function TaskCard({data}: Props) {

    const { updateTask, deleteTask, completeTask } = useContext(TaskContext) as ITaskContext 
    const {description, priority, completed, files, notes} = data;
    const priorityColors = {low: '#00cf3b', medium: '#f0e114', high: '#f03030'};
    const [checked, setChecked] = useState(completed);
    const [showTask, setShowTask] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [localFiles, setLocalFiles] = useState([...files]);
    const [inputs, setInputs] = useState({description, notes});

    function toggleChecked(): void {
        setChecked(prevChecked => {
            completeTask(data._id, !prevChecked)
            return !prevChecked
        });
    }

    function addFile(): void {
        setLocalFiles(prevFiles => {
            return [...prevFiles, ''];
        })
    }

    function deleteFile(index: number) {
        setLocalFiles(prevFiles => {
            const currFiles = [...prevFiles];
            currFiles.splice(index, 1);
            return currFiles;
        })
    }

    function handleInputChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target;
        setInputs(prevInputState => {
            return {...prevInputState, [name]: value};
        })
    }

    function saveTask() {
        const fileInputs = document.getElementsByClassName('input-edit-file') as HTMLCollectionOf<HTMLInputElement>
        const currentFiles = [];
        for (let i = 0; i < fileInputs.length; i++) {
            currentFiles.push(fileInputs[i].value)
        }
        updateTask(data._id, {...inputs, files: [...currentFiles]})
        setLocalFiles([...currentFiles])
        setEditMode(false)
        
    }

    return (
        <div className='task-card'>
            <div className="dresser-row" style={{justifyContent: 'space-between'}}>
                <div className="dresser-row" style={{width: '100%'}}>
                    {checked ? <FaCheckCircle className='grow' onClick={toggleChecked} color={priorityColors[priority]} /> :
                    <FaCircle className='grow' onClick={toggleChecked} color={priorityColors[priority]} />}
                    <span 
                        className={checked && !editMode ? 'checked' : undefined} 
                        style={{color: checked && !editMode ? '#848484' : 'black', width: '100%'}}
                    >
                        {editMode ? <input 
                            className='input-edit' 
                            name='description' 
                            onChange={handleInputChange} 
                            value={inputs.description} 
                            type='text' 
                        /> : inputs.description}
                    </span>
                </div>
                <BsChevronExpand className='grow' onClick={() => setShowTask(prev => !prev)} />
            </div>
            <div className="container dresser-col" style={{display: showTask ? 'flex' : 'none', alignItems: 'flex-start'}}>
                <div className='dresser-row'>
                    files: {localFiles.map((file, i) => {
                        if (editMode) {
                            return (
                                <div key={i + file} className='dresser-col' style={{rowGap: 3}}>
                                    <BsFolderX onClick={() => deleteFile(i)} className="grow" fontSize={25} />
                                    <input 
                                        type='text' 
                                        className='input-edit-file' 
                                        defaultValue={file}
                                        placeholder={'text here...'}
                                        required 
                                    />
                                </div>
                            )
                        }
                        return (
                            <div key={i + file} className='dresser-col' style={{rowGap: 3}}>
                                <BsFillFolderFill fontSize={25} />
                                <span style={{fontSize: '0.8em'}}>{file}</span>
                            </div>
                        )
                    })}
                    {editMode && <FaPlus className='grow' onClick={addFile} fontSize={15} style={{marginLeft: 10}} />}
                </div>
                <div className='dresser-row' style={{width: '100%', alignItems: 'flex-start'}}>
                    <div>notes: </div>
                    {
                        editMode ? <textarea 
                        className='task-card-textarea input-edit' 
                        value={inputs.notes}
                        name='notes' 
                        onChange={handleInputChange} 
                        placeholder='new note...' /> : <div style={{fontSize: '0.8em'}}>{inputs.notes}</div>
                    }
                </div>
                <div className='dresser-row'>
                    {editMode ? <button onClick={saveTask} className='secondary-btn white'>save</button> :
                    <button onClick={() => setEditMode(true)} className='secondary-btn white'>edit</button>}
                    <button onClick={() => deleteTask(data._id)} className='secondary-btn black'>delete</button>
                </div>
            </div>
        </div>
    )
}