import React, { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react'
import './Profile.css'
import { AuthContext, IAuthContext, IUserInput } from '../../context/Auth';

export default function Profile() {

  const { authState, errObj, update } = useContext(AuthContext) as IAuthContext;
  const [userInput, setUserInput] = useState({
    username: '',
    ageRange: ''
  });

  const [showErrorMessages, setShowErrorMessages] = useState({username: false, password: false})

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
    setUserInput({username: currentUser.username, ageRange: currentUser.ageRange})
  }, [])

  function validateInput(inputName: string, inputValue: string): void {
    switch(inputName) {
        case 'username':
            if (inputValue.length > 0) {
                setShowErrorMessages(prevState => ({...prevState, username: false}));
                break;
            }
            setShowErrorMessages(prevState => ({...prevState, username: true}));
            break;
        case 'password':
            if (inputValue.length > 6 && /(?=.*[!@#$%^&*])(?=.*[0-9])/.test(inputValue)) {
                setShowErrorMessages(prevState => ({...prevState, password: false}));
                break;
            }
            setShowErrorMessages(prevState => ({...prevState, password: true}));
            break;
        default:
            break;
    }
  }

  function validInput(): boolean {
      return !showErrorMessages.username && !showErrorMessages.password;
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    errObj.clearErrMessage()
    const { name, value } = e.target;
    validateInput(name, value);
    setUserInput(prevInput => {
        return {
            ...prevInput,
            [name]: value
        }   
    })
  }

  function handleSelectChange(e: ChangeEvent<HTMLSelectElement>) {
    const { name, value } = e.target;
    setUserInput(prevInput => {
        return {
            ...prevInput,
            [name]: value
        }
    })
  }

  function saveUserInfo(e: FormEvent): void {
    e.preventDefault();
    let currUserInput: IUserInput = {...userInput};
    update(authState.user._id, currUserInput);
  }

  return (
    <div className='main-container'>
      <form onSubmit={saveUserInfo} className='dresser-col'>
        <div className='input-container'>
          <label>username:</label>
          <input name="username" value={userInput.username} onChange={handleInputChange} type="text" />
          {showErrorMessages.username && <div className="error-message">*username is required</div>}
        </div>
        <div className='input-container'>
            <label>age group:</label>
            <select value={userInput.ageRange} onChange={handleSelectChange} name="ageRange" id="">
                <option value="15 and older">15 and under</option>
                <option value="16-20">16-20</option>
                <option value="20-30">20-30</option>
                <option value="30-40">30-40</option>
                <option value="40+">40+</option>
            </select>
        </div>
        <div className="button-container">
        <button className={validInput() ? 'primary-btn green' : 'primary-btn green disabled'} disabled={validInput() ? false: true}>
          save
        </button>
        <div className="error-message" style={{top: 50, right: -190}}>{errObj.errMessage}</div>
        </div>
      </form>
    </div>
  )
}