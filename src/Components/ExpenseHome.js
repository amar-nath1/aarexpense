import { Button, Form, Container, Spinner } from "react-bootstrap"
import { useContext, useEffect, useRef, useState } from "react"
import AllExpenses from "./AllExpenses"
import AuthContext from "../store/auth-context"


const ExpenseHome=()=>{

    const authCtx=useContext(AuthContext)

    
    const [expenseArr,setExpenseArr]=useState([])
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState(null)

const amountRef=useRef()
const descRef=useRef()
const categRef=useRef()

const userFullEmail=JSON.parse(localStorage.getItem('currUser')).email
const userEmail=userFullEmail.replace(/\W/g, '')


const expenseFetchHandler=async()=>{
    setLoading(true)
    try
   { 
    let response=await fetch(`https://aarexpense-default-rtdb.firebaseio.com/${userEmail}.json`)
    if (!response.ok){

        throw new Error('Expense data could not be loaded. Try again')
    }

    let data=await response.json()
    
    let expArr=[]
    
    for (const key in data){
        expArr.push({
            id:key,
            amount:data[key].amount,
            description:data[key].description,
            category:data[key].category
        })
    }

    setExpenseArr(expArr)
    
}
catch(error){
    setError(error.message)
}
setLoading(false)
}

    const expenseSubmitHandler=async(event)=>{
        event.preventDefault()
        setLoading(true)
       const amount= amountRef.current.value
    const description= descRef.current.value
    const category= categRef.current.value
        
    try
      { 
        let response= await fetch(`https://aarexpense-default-rtdb.firebaseio.com/${userEmail}.json`,
        
        {

            method:'POST',
            body: JSON.stringify(
                {amount:amount,
                description:description,
                category:category}

            ),
            headers:{'Content-Type':'application/json'}

        }
        )
        if (response.ok){
            setLoading(false)
            console.log('expense Added')
            expenseFetchHandler()
        }
        else{
            throw new Error('Expense Could not be added. try again')
        }
            }

            catch(error){
                setError(error.message)
            }

            setLoading(false)
        

    }

    useEffect(()=>{
        expenseFetchHandler()



    },[])

    return (
        <Container className='m-4'>
        <Form className='d-flex justify-content-around' onSubmit={expenseSubmitHandler}>
            <Form.Group>
                <Form.Control type='number' placeholder="Amount" required ref={amountRef}></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Control type='text' placeholder="Expense Description" required ref={descRef}></Form.Control>
            </Form.Group>
            <select required ref={categRef}>
            <option selected>Category</option>
            <option value='Travel'>Travel</option>
            <option value='Edibles'>Edibles</option>
            <option value='Entertainment'>Entertainment</option>
            <option value='Others'>Others</option>

            </select>
            <Button type='submit' >Add Expense</Button>
        </Form>
        { loading && <div className='centered'> <Spinner ></Spinner></div>}

        <AllExpenses expenses={expenseArr}></AllExpenses>
        </Container>
    )
}

export default ExpenseHome