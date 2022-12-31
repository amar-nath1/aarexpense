
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import ExpenseHome from './Components/ExpenseHome';
import Layout from './Components/Layout';
import Dashboard from './Pages/Dashboard';
import ForgotPassword from './Pages/ForgotPassword';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';


function App() {
  const isLoggedIn=useSelector(state=>state.auth.authenticated)
  
  return (
    
    <Layout>
    <Routes>

      {!isLoggedIn && <Route path='/' element={<SignUp></SignUp>}/>}
      {isLoggedIn && <Route path='/' element={<Navigate to='/dashboard'/>}/>}
      {isLoggedIn && <Route path='/signup' element={<Navigate to='/dashboard'/>}/>}
      {!isLoggedIn && <Route path='/signup' element={<SignUp></SignUp>}/>}
      {isLoggedIn && <Route path='/login' element={<Navigate to='/dashboard'/>}/>}
      {!isLoggedIn && <Route path='/login' element={<Login></Login>}/>}
      {isLoggedIn && <Route path='/expensehome' element={<ExpenseHome/>}/>}
      {!isLoggedIn && <Route path='/expensehome' element={<Navigate to='/login'></Navigate>}/>}
      <Route path='/login/forgotpassword' element={<ForgotPassword></ForgotPassword>} />
      
      {isLoggedIn && <Route path='/dashboard' element={<Dashboard/>}/>}
      {!isLoggedIn && <Route path='/dashboard' element={<Navigate to='/login'></Navigate>}/>}
      
    </Routes>
    </Layout>
    
  );
}

export default App;
