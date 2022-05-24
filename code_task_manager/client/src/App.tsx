import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import './App.css';
import Profile from './pages/Profile/Profile';
import Navbar from './components/Navbar/Navbar';
import Data from './pages/Data/Data';
import Tasks from './pages/Tasks/Tasks';
import Login from './pages/Login/Login';
import AuthProvider from './context/Auth';
import TaskProvider from './context/TaskService'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider text={''}>
            <TaskProvider text={''}>
              <Navbar />
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="profile" element={<Profile />}/>
                <Route path="tasks" element={<Tasks />}/>
                <Route path="data" element={<Data />}/>
              </Routes>
            </TaskProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
