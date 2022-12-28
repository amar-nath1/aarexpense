import { useEffect, useRef } from "react"
import { Button, Container, Form } from "react-bootstrap"

const UpdateContact=(props)=>{

    const fnameRef=useRef()
    const photoRef=useRef()

    const userDetail=JSON.parse(localStorage.getItem('currUser'))
    
    useEffect(()=>{

        fnameRef.current.value=userDetail.fullName
        photoRef.current.value=userDetail.photoUrl

    },[])
    const profileUpdateHandler=(event)=>{

        event.preventDefault()

        const fnameInput=fnameRef.current.value
        const photoInput=photoRef.current.value

        const tokenObj= JSON.parse(localStorage.getItem('currUser'))
        

        fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDAm8-U9Z7Kq3Mf5WXNnNnR_94M06T1f_k',
        
        {method:'POST',
        body:JSON.stringify(
            {
                idToken:  tokenObj.token,
                displayName:fnameInput,
                photoUrl:photoInput,
                returnSecureToken:true
            }
        )
    }
        
        )
        .then((res)=>{
            if(res.ok){
                res.json().then((data)=>{
                    localStorage.setItem('currUser',JSON.stringify(
                        {
                            token: tokenObj.token,
                            fullName:data.displayName,
                            photoUrl:data.photoUrl, 
                            email:data.email

                        }
                    ))
                    props.updateContactDet(false)
                })
            }
        })

    }

    return (

        <Container className="border m-3 p-4">
            <div className="d-flex justify-content-between">
            <div className="m-4"> <h3>Contact Details</h3></div>
            <button className='btn btn-outline-danger' style={{height:'40px'}} onClick={()=>{props.updateContactDet(false)}}>X</button>
            </div>
            <Form onSubmit={profileUpdateHandler}>
            <div className="d-flex justify-content-around">
                <div className="d-flex">
                <div className="me-4">Full Name: </div>
                <div><input type='text' ref={fnameRef} required></input></div>

                </div>
                <div className="d-flex">
                <div className="me-4">Profile Photo URL: </div>
                <div><input type='text' ref={photoRef} required></input></div>
                </div>
            </div>
            <Button variant='secondary' type='submit' className='m-4'>Update</Button>
            </Form>
            
        </Container>
    )
}

export default UpdateContact