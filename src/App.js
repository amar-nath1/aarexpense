
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './Pages/Dashboard';
import ForgotPassword from './Pages/ForgotPassword';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';

function App() {
  return (

    <Routes>
      <Route path='/' element={<SignUp></SignUp>}/>
      <Route path='/signup' element={<SignUp></SignUp>}/>
      <Route path='/login' element={<Login></Login>}/>

      <Route path='/login/forgotpassword' element={<ForgotPassword></ForgotPassword>} />

     
      <Route path='/dashboard' element={<Dashboard/>}/>
    </Routes>
  );
}

export default App;
