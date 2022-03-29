import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom'
import Home from './Screens/Home/home';
import Login from './Screens/Login/login';
import Signup from './Screens/Signup/signup';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/login' element={ <Login /> } />
        <Route path='/signup' element={ <Signup /> } />
      </Routes>
    </div>
  );
}

export default App;
