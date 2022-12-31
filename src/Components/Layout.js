import { Fragment,useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import classes from './Layout.module.css'
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { authActions } from "../store/authSlice"
const Layout=(props)=>{
    const isLoggedIn=useSelector(state=>state.auth.authenticated)
    const dispatch=useDispatch()

    const navigate=useNavigate()
const isElgPrem=useSelector(state=>state.expenses.premElg)
    const logoutHandler=()=>{

        localStorage.removeItem('currUser')
        dispatch(authActions.logout())
        navigate('/login')

    }

    return (
<Fragment>
        <header className={classes.header}>
            <div className={classes.logo}>Welcome to Expense Tracker</div>
            <nav className={classes.nav}>

                { isLoggedIn && <ul>
                    <li><Link to='/dashboard' className="text-white">Dashboard</Link> </li>
                    <li><p className="text-white" style={{cursor: 'pointer'}} onClick={logoutHandler}>Logout</p> </li>
                   {isElgPrem && <li><p className="text-white" style={{cursor: 'pointer'}} >Go Premium</p> </li>}
                    
                </ul>}
            </nav>
        </header>
        <main className={classes.main}>{props.children}</main>
        </Fragment>

    )
}

export default Layout