import { Card,Button } from "react-bootstrap"

const AllExpenses=(props)=>{

    const showExpenses=props.expenses.map((exp)=>{

        return <Card className='border-success' key={exp.id} style={{width:'50rem'}}>
        <Card.Body className="d-flex justify-content-around">
            
        <Card.Title>{exp.amount}</Card.Title>
        <Card.Text>{exp.category}</Card.Text>
        <Card.Text>{exp.description}</Card.Text>
        <Button>DELETE</Button>
        </Card.Body>  
    </Card>
    })

    return (

         <>
        <Card className='mt-4' key='table' style={{width:'50rem'}}>
        <Card.Body className="d-flex justify-content-around">
            
        <Card.Title>Amount</Card.Title>
        <Card.Text>Category</Card.Text>
        <Card.Text>Desc</Card.Text>
        <Card.Text>DELETE Expense</Card.Text>
        
        </Card.Body>  
    </Card>
    {props.expenses.length===0 && <p>No Expense Found</p>}
    {showExpenses}
        </>

        

    )
}

export default AllExpenses