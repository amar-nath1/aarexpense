import { Button, Card, Container, Form } from "react-bootstrap"

import { useRef } from "react"
import { Link } from "react-router-dom"


const SignUp=()=>{

    const emailRef=useRef()
    const passwordRef=useRef()
    const confPasswordRef=useRef()

    const signupFormSubmitHandler=(event)=>{
        event.preventDefault()
       const emailInput=emailRef.current.value
       const passwordInput=passwordRef.current.value
       const confPasswordInput=confPasswordRef.current.value

        if (passwordInput===confPasswordInput){

            const newUserObj={
                email:emailInput,
                password:passwordInput,
                returnSecureToken:true
            }

            fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDAm8-U9Z7Kq3Mf5WXNnNnR_94M06T1f_k',
            
            {
                method:'POST',
                body:JSON.stringify(newUserObj),
                headers:{
                    'Content-Type':'application/json'
                }
        }
            
            ).then((res)=>{

                if (res.ok){
                    res.json().then((data)=>{
                        console.log(`${data.email} is now registered`)
                    })
                }

                else{
                    return res.json().then((data)=>{
                        let errorMessage='Authentication Failed'
                        if (data && data.error && data.error.message){

                            errorMessage=data.error.message
                        }
                        alert(errorMessage)
                    })
                }

            })


        }
        else {alert('Password do not match')}

    }

    return (

        <Container className='border border-secondary p-4 m-4 w-50'>

        <Container >
            <h2 className="ms-4 mb-4 border-bottom pb-2 border-secondary">Sign Up</h2>
        <Form onSubmit={signupFormSubmitHandler}>
        
        <Form.Group className="mb-3"  controlId="formBasicEmail">
        <Form.Control type='email' placeholder='Enter Email' required ref={emailRef}/>
        </Form.Group>

        <Form.Group className="mb-3"  controlId="formBasicPassword">
        <Form.Control type='password' placeholder='Enter Password' required ref={passwordRef}/>
        </Form.Group>
        <Form.Group className="mb-3"  controlId="formBasicPassword">
        <Form.Control type='password' placeholder='Confirm Password' required ref={confPasswordRef}/>
        </Form.Group>
        <Button className='w-100' type='submit' variant='success'> Sign Up</Button>
        </Form>
        </Container>
        
        <Card.Text className='m-2'>Dont have an Account? <Link to='/login'>Sign Up</Link> </Card.Text>
       
        </Container>

    )

}

export default SignUp