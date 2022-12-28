import { useRef, useState } from "react"
import { Button, Card, Container, Form, Spinner } from "react-bootstrap"
import { Link,useNavigate } from "react-router-dom"


const ForgotPassword =()=>{

    const [isLoading,setIsLoading]=useState(false)

const emailRef=useRef()

const navigate=useNavigate()

    const forgotPasswordHandler=(event)=>{
        event.preventDefault()
        setIsLoading(true)
        const emailInput = emailRef.current.value
      

        fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDAm8-U9Z7Kq3Mf5WXNnNnR_94M06T1f_k',
        
        {
            method:'POST',
            body:JSON.stringify(
                {email:emailInput,
                requestType:'PASSWORD_RESET',
                
                }
            ),
            headers:{'Content-Type':'application/json'}

        }
        )
        .then((res)=>{
            if (res.ok){
                setIsLoading(false)

                res.json().then((data)=>{
                    alert(`Reset Password Instructions send to ${data.email}`)
                    navigate('/login')

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
           
        <h2 className="ms-4 mb-4 border-bottom pb-2 border-secondary">Login</h2>
    <Form onSubmit={forgotPasswordHandler}>
    
    <Form.Group className="mb-3"  controlId="formBasicEmail">
    <Form.Control type='email' placeholder='Enter Email' required ref={emailRef}/>
    </Form.Group>
    
    <Button className='w-100' type='submit' variant='warning'> Send Link</Button>
    </Form>
    <Card.Text className='m-2'><Link to='/login'>Go back to Login</Link> </Card.Text>
    {isLoading && <Spinner className='spinner-border text-success'></Spinner>}
    </Container>
    
    
    )
}

export default ForgotPassword