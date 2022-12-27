
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';

function App() {
  return (

    <Routes>
      <Route path='/' element={<SignUp></SignUp>}/>
      <Route path='/signup' element={<SignUp></SignUp>}/>
      <Route path='/login' element={<Login></Login>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
    </Routes>
  );
}

export default App;
