import { Fragment,useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import classes from './Layout.module.css'
import AuthContext from "../store/auth-context"

const Layout=(props)=>{
    const authCtx=useContext(AuthContext)
    const navigate=useNavigate()

    const logoutHandler=()=>{

        localStorage.removeItem('currUser')
        authCtx.loginTrue(false)
        navigate('/login')

    }

    return (
<Fragment>
        <header className={classes.header}>
            <div className={classes.logo}>Welcome to Expense Tracker</div>
            <nav className={classes.nav}>

                { authCtx.isLoggedIn && <ul>
                    <li><Link to='/dashboard' className="text-white">Dashboard</Link> </li>
                    <li><p className="text-white" style={{cursor: 'pointer'}} onClick={logoutHandler}>Logout</p> </li>
                    
                </ul>}
            </nav>
        </header>
        <main className={classes.main}>{props.children}</main>
        </Fragment>

    )
}

export default Layout