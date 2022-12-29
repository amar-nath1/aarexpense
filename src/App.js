
import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import ExpenseHome from './Components/ExpenseHome';
import Layout from './Components/Layout';
import Dashboard from './Pages/Dashboard';
import ForgotPassword from './Pages/ForgotPassword';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import AuthContext, { AuthProvider } from './store/auth-context';

function App() {
  const authCtx=useContext(AuthContext)
  
  return (
    
    <Layout>
    <Routes>
      <Route path='/' element={<SignUp></SignUp>}/>
      <Route path='/signup' element={<SignUp></SignUp>}/>
      <Route path='/login' element={<Login></Login>}/>
      {authCtx.isLoggedIn && <Route path='/expensehome' element={<ExpenseHome/>}/>}
      {!authCtx.isLoggedIn && <Route path='/expensehome' element={<Navigate to='/login'></Navigate>}/>}
      <Route path='/login/forgotpassword' element={<ForgotPassword></ForgotPassword>} />
      
      {authCtx.isLoggedIn && <Route path='/dashboard' element={<Dashboard/>}/>}
      {!authCtx.isLoggedIn && <Route path='/dashboard' element={<Navigate to='/login'></Navigate>}/>}
      
    </Routes>
    </Layout>
    
  );
}

export default App;
