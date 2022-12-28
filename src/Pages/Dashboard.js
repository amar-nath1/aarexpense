import { useEffect, useRef, useState } from "react"
import { Button, Container, Form } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import UpdateContact from "../Components/UpdateContact"


const Dashboard=()=>{

    const [updateContact,setUpdateContact]=useState(false)
    const [profileCompleted,setProfileCompleted]=useState(false)

    const navigate=useNavigate()

    const userObj= JSON.parse(localStorage.getItem('currUser'))
    const userToken=userObj.token

    const logoutHandler=()=>{

        localStorage.removeItem('currUser')
        navigate('/login')

    }

    const verifyEmailHandler=()=>{

        fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDAm8-U9Z7Kq3Mf5WXNnNnR_94M06T1f_k',
        
        {
            method:'POST',
            body:JSON.stringify(
                {
                    requestType:'VERIFY_EMAIL',
                    idToken:userToken
                }
            )
        }
        
        ).then((res)=>{
            if (res.ok){
                    res.json().then((data)=>{
                        console.log(data, 'is now veryfied')
                    })

            }
            else{
                res.json().then((data)=>{
                    if (data && data.error && data.error.message){
                        alert(data.error.message)
                    }
                })
            }
        })
    }

    const completeProfileHandler=(showUpdateContact)=>{

        if (showUpdateContact===false){
            setUpdateContact(false)
        }
        else{
            setUpdateContact(true)
        }
       
    }
   


    useEffect(()=>{

        fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDAm8-U9Z7Kq3Mf5WXNnNnR_94M06T1f_k',
        
        {
            method:'POST',
            body:JSON.stringify({idToken:userToken}),
            headers:{'Content-Type':'application/json'}
        }
        
        )
        .then((res)=>{
            if (res.ok){
                res.json().then((data)=>{
                    

                        setProfileCompleted(true)
                    
                    
                })
            }
        })

    },[])
    

    return (
        <>
        <Container className="d-flex justify-content-between border-bottom border-danger m-4 p-2" >
            <div >Welcome to Expense Tracker App</div>
           {!profileCompleted && <div >Your profile is incomplete. <p className="text-primary" style={{cursor: 'pointer'}} onClick={completeProfileHandler}>Complete Now</p></div>}
           {profileCompleted && <div><p className="text-primary" style={{cursor: 'pointer'}} onClick={completeProfileHandler}>view/update Profile</p>
           <p className="text-primary" style={{cursor: 'pointer'}} onClick={logoutHandler}>Logout</p></div>
           }
        </Container>
        <Button onClick={verifyEmailHandler}>Verify Email</Button>
        
        {updateContact && <UpdateContact updateContactDet={completeProfileHandler}></UpdateContact>}
        </>
    )

}

export default Dashboard