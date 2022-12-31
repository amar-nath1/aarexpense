import { useRef } from "react"
import { Button, Card, Container, Form } from "react-bootstrap"
import { useSelector } from "react-redux"
import { Link,useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { authActions } from "../store/authSlice"

const Login=()=>{

const emailRef=useRef()
const passwordRef=useRef()
const navigate=useNavigate()

const dispatch=useDispatch()
 

    const loginFormSubmitHandler=(event)=>{
        event.preventDefault()
        const emailInput = emailRef.current.value
        const passwordInput = passwordRef.current.value

        fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDAm8-U9Z7Kq3Mf5WXNnNnR_94M06T1f_k',
        
        {
            method:'POST',
            body:JSON.stringify(
                {email:emailInput,
                password:passwordInput,
                returnSecureToken:true
                }
            ),
            headers:{'Content-Type':'application/json'}

        }
        )
        .then((res)=>{
            if (res.ok){

                res.json().then((data)=>{
                    console.log('login successful')
                    localStorage.setItem('currUser',JSON.stringify({token:data.idToken,email:data.email}))
                    dispatch(authActions.login())
                    dispatch(authActions.userEmail(data.email))
                    dispatch(authActions.userToken(data.idToken))
                    navigate('/dashboard')

                })
            }

            else {
                return res.json().then((data)=>{
                    alert(data.error.message)
                })
            }

        })

    }
    

    return (

        <Container className='border border-secondary p-4 m-4 w-50'>
            <Container >
        <h2 className="ms-4 mb-4 border-bottom pb-2 border-secondary">Login</h2>
    <Form onSubmit={loginFormSubmitHandler}>
    
    <Form.Group className="mb-3"  controlId="formBasicEmail">
    <Form.Control type='email' placeholder='Enter Email' required ref={emailRef}/>
    </Form.Group>

    <Form.Group className="mb-3"  controlId="formBasicPassword">
    <Form.Control type='password' placeholder='Enter Password' required ref={passwordRef}/>
    </Form.Group>
    
    <Button className='w-100' type='submit' variant='success'> Login</Button>
    </Form>
    </Container>
    <Card.Text className='m-2'><Link to='forgotpassword'>Forgot Password</Link> </Card.Text>
    <Card.Text className='m-2'>Dont have an Account? <Link to='/signup'>Sign Up</Link> </Card.Text>
    </Container>
    )
}

export default Login