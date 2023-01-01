import { Card,Button } from "react-bootstrap"
import axios from "axios"
import { Fragment } from "react"
const AllExpenses=(props)=>{

    function makeCsv(arr){
    
        const myArr=[
            ['Description','Amount','Category'],
            ...arr.map(item=>[item.description,item.amount,item.category])

        ].map(e=>e.join(',')).join('\n')

        return myArr

    }
    
    const expenseBlob=new Blob([makeCsv(props.expenses)],{type:'text/plain'})
    const downloadHref=URL.createObjectURL(expenseBlob)

    const showExpenses=props.expenses.map((exp)=>{

        const deleteHandler=()=>{
            axios.delete(`https://aarexpense-default-rtdb.firebaseio.com/${props.userEmail}/${exp.id}.json`)
            .then(()=>{
                props.expenseFetch()
                console.log(`${exp.description} is deleted successfully`)

            })
        }

        const editHandler=()=>{
            props.editClick({id:exp.id,amount:exp.amount, category:exp.category, description:exp.description})
        }

        return <Card className='border-success' key={exp.id} style={{width:'50rem'}}>
        <Card.Body className="d-flex justify-content-around">
            
        <Card.Title>{exp.amount}</Card.Title>
        <Card.Text>{exp.category}</Card.Text>
        <Card.Text>{exp.description}</Card.Text>
        <div className="d-flex justify-content-around">
        <Button variant="outline-danger" className="me-3" onClick={deleteHandler}>X</Button>
        <Button onClick={editHandler}>Edit</Button>
        </div>
        </Card.Body>  
    </Card>
    })

    return (

         <Fragment >
         <div className='d-flex'>
        <Card className='mt-4' key='table' style={{width:'50rem'}}>
        <Card.Body className="d-flex justify-content-around">
            
        <Card.Title>Amount</Card.Title>
        <Card.Text>Category</Card.Text>
        <Card.Text>Description</Card.Text>
        <Card.Text>DELETE / EDIT</Card.Text>
        </Card.Body>  
        
    </Card>
    {props.elgForPrem && <a download='filetest.csv' href={downloadHref} id='downloadLink' className='d-flex m-4 text-primary' style={{cursor:'pointer'}}>Download</a>}
    </div>
    {props.expenses.length===0 && <p>No Expense Found</p>}
    {showExpenses}
        </Fragment>

    )
}

export default AllExpenses