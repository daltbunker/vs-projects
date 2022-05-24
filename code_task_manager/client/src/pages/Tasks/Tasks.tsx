import React, { ChangeEvent, useContext, useEffect, useState } from 'react'
import { BsArrowDownUp } from 'react-icons/bs'
import { FaSearch } from 'react-icons/fa'
import TaskCard from '../../components/TaskCard/TaskCard'
import TaskForm from '../../components/TaskForm/TaskForm'
import { ITaskContext, TaskContext } from '../../context/TaskService'
import './Tasks.css'

export default function Tasks() {

  const { tasks, getTasks, sortObj, reverseObj } = useContext(TaskContext) as ITaskContext
  const [searchInput, setSearchInput] = useState<string>("");

  useEffect(() => {
    getTasks()
  }, [getTasks])

  function mapTaskCards(): JSX.Element[] | undefined {
    if (tasks) {
      const mappedTasks: JSX.Element[] = tasks
      // MAKE FILTER SEARCH FILES AND NOTES TOO
        .filter(task => searchInput.length > 0 ? task.description.includes(searchInput) : true)
        .map(taskData => {
          return (
            <TaskCard key={taskData._id} data={taskData} />
          )
        })
      return mappedTasks;
    }
    return undefined;
  }

  function handleSortChange(e: ChangeEvent<HTMLSelectElement>) {
    const { value } = e.target;
    sortObj.setSortedState(value);
  }

  function handleReverseState() {
    reverseObj.setReverseState(prevState => !prevState);
  }

  function handleSearchInput(e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    setSearchInput(value);
  }

  return (
    <div className='tasks-container'>
      <div className="left-col">
        <TaskForm />
      </div>
      <div className="right-col">
          <div className="dresser-row">
          <div className="search-container">
            <FaSearch color='white' fontSize={22} />
            <input placeholder='Search...' value={searchInput} onChange={handleSearchInput} type="text" />
          </div>
          <label style={{color: 'white'}} htmlFor="">sort by: </label>
          <select value={sortObj.sortedState} onChange={handleSortChange}>
            <option value="priority">priority</option>
            <option value="description">description</option>
            <option value="completed">completed</option>
          </select>
          <BsArrowDownUp onClick={handleReverseState} color={reverseObj.reverseState ? 'white' : 'gray'} className='grow'/>
        </div>
        {mapTaskCards()}
      </div>
    </div>
  )
}