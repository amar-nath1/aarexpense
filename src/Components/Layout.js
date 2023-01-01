import { Fragment,useContext, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import classes from './Layout.module.css'
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { authActions } from "../store/authSlice"
import { themeActions } from "../store/themeSlice"
import { Form } from "react-bootstrap"


const Layout=(props)=>{
    const isLoggedIn=useSelector(state=>state.auth.authenticated)
    const dispatch=useDispatch()

    const navigate=useNavigate()
const isElgPrem=useSelector(state=>state.expenses.premElg)
const darkTheme=useSelector(state=>state.theme.darkTheme)
const seeToggle=useSelector(state=>state.theme.showToggle)

const themeHandler=(tf)=>{
if(tf===true){
    document.body.style.backgroundColor='black'

}
else if(tf===false){
    document.body.style.backgroundColor='white'
}
}


const toggleHandler=()=>{
    dispatch(themeActions.darkTheme(!darkTheme))
    themeHandler(!darkTheme)
}

    const logoutHandler=()=>{

        localStorage.removeItem('currUser')
        dispatch(authActions.logout())
        themeHandler(false)
        navigate('/login')
        
    }

    const goPremHandler=()=>{
        dispatch(themeActions.showToggle())
        themeHandler(true)
    }

    return (
<Fragment>
        <header className={classes.header}>
            <div className={classes.logo}>Welcome to Expense Tracker</div>
            <nav className={classes.nav}>

                { isLoggedIn && <ul>
                    <li><Link to='/dashboard' className="text-white">Dashboard</Link> </li>
                    <li><p className="text-white" style={{cursor: 'pointer'}} onClick={logoutHandler}>Logout</p> </li>
                   {isElgPrem && <li><p className="text-white" style={{cursor: 'pointer'}} onClick={goPremHandler}>Go Premium</p> 
                   
                  {seeToggle && <Form.Check onClick={toggleHandler}
        type="switch"
        id="custom-switch"
        label="Dark Theme" onClick={toggleHandler}/>}

                   </li>}
                   
                    
                </ul>}
            </nav>
        </header>
        <main className={classes.main}>{props.children}</main>
        </Fragment>

    )
}

export default Layout