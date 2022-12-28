import { useRef, useState } from "react"
import { Button, Container, Form } from "react-bootstrap"
import { Link } from "react-router-dom"
import UpdateContact from "../Components/UpdateContact"


const Dashboard=()=>{

    const [updateContact,setUpdateContact]=useState(false)

    const completeProfileHandler=(showUpdateContact)=>{

        if (showUpdateContact===false){
            setUpdateContact(false)
        }
        else{
            setUpdateContact(true)
        }
       
    }
    

    return (
        <>
        <Container className="d-flex justify-content-between border-bottom border-danger m-4 p-2" >
            <div >Welcome to Expense Tracker App</div>
            <div >Your profile is incomplete. <p className="text-primary" style={{cursor: 'pointer'}} onClick={completeProfileHandler}>Complete Now</p></div>
        </Container>
        
        {updateContact && <UpdateContact updateContactDet={completeProfileHandler}></UpdateContact>}
        </>
    )

}

export default Dashboard