import React, { ChangeEvent, FormEvent, useContext, useState } from 'react'
import './Login.css'
import { FaEye, FaEyeSlash} from 'react-icons/fa';
import { AuthContext, IAuthContext, IUserInput } from '../../context/Auth';

type Props = {}

export default function Login({}: Props) {

  const [showPassword, setShowPassword] = useState(false);
  const [newUser, setNewUser] = useState(true);
  const [userInput, setUserInput] = useState({
        username: '',
        password: '',
        ageRange: '15 and under'
    });
  const { login, errObj } = useContext(AuthContext) as IAuthContext;
  const [showErrorMessages, setShowErrorMessages] = useState({username: true, password: true})

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
    if (newUser){
        validateInput(name, value);
    }
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

  function handleLogin(e: FormEvent): void {
    e.preventDefault();
    let currUserInput: IUserInput = {username: userInput.username, password: userInput.password};
    if (newUser) {
        currUserInput = {...currUserInput, ageRange: userInput.ageRange};
    }
    login(currUserInput, newUser);
  }

  return (
    <div className='main-container modal'>
      <form onSubmit={handleLogin} className='dresser-col'>
        <div className='input-container'>
          <label>username:</label>
          <input name="username" value={userInput.username} onChange={handleInputChange} type="text" />
          {showErrorMessages.username && newUser && <div className="error-message">*username is required</div>}
        </div>
        <div className='input-container'>
          <label>password:</label>
          <input name="password" value={userInput.password} onChange={handleInputChange} type={showPassword ? 'text' : 'password'} />
          {showPassword && <FaEye onClick={() => setShowPassword(false)} className="fa-eye" />}
          {!showPassword && <FaEyeSlash onClick={() => setShowPassword(true)} className="fa-eye" />}
          {showErrorMessages.password && newUser && <div className="error-message">
              *password must be 7 or more characters, include 1 special character, and 1 number</div>
          }
        </div>
        <div className='input-container' style={{display: newUser ? "flex": 'none'}}>
            <label>age group:</label>
            <select value={userInput.ageRange} onChange={handleSelectChange} name="ageRange">
                <option value="15 and older">15 and under</option>
                <option value="16-20">16-20</option>
                <option value="20-30">20-30</option>
                <option value="30-40">30-40</option>
                <option value="40+">40+</option>
            </select>
        </div>
        <div className="button-container">
          <button className={validInput() || !newUser ? 'primary-btn green' : 'primary-btn green disabled'} disabled={validInput() || !newUser ? false: true}>
          {newUser ? "sign up" : "login"}
          </button>
          <div className="error-message" style={{top: 50, right: -190}}>{errObj.errMessage}</div>
          <button onClick={() => setNewUser(prevUserState => !prevUserState)} className='stripped basic-btn' type='button'>
              {newUser ? "Already Have An Account?" : "Don't Have An Account?"}
          </button>
        </div>
      </form>
    </div>
  )
}