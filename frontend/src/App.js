import React, { useState ,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';



function App() {
  const [from ,setFrom] = useState({});
  const [showdata ,setShowdata] = useState([]);

  const handleform = (e)=>{
    setFrom({
      ...from,
      [e.target.name] : e.target.value       //[e.target.name] - will be universal and take automatic
    });
  }

  const handlesubmit = async (e)=>{     //post request
    //e.preventDefault();
    const response = await fetch('https://mern-to-do-xi.vercel.app/',{
    method:'POST',
    body:JSON.stringify(from),
    headers:{
      'Content-Type':'application/json'
    }

    })
    const data = await response.json();
  }

  //get all data from DB
  const getdata = async () => {
    const response = await fetch('https://mern-to-do-xi.vercel.app/data',{
    method:'GET',
    })
    const dataget = await response.json();
    setShowdata(dataget);
  }

  useEffect(()=>{
    getdata();
    //console.log("ready to display the DB data",showdata);   //shown in console
  },[])

  //delete todo task
  const tododelete = async (id) => {

    await fetch('https://mern-to-do-xi.vercel.app/deletetodo/'+id,{
    method:'DELETE',
    })
    window.location.reload();
  }

  return (
        <div className='App-header'>
          <h1>TO-DO LIST </h1>
          <Form onSubmit={handlesubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Enter task</Form.Label>
              <Form.Control type='text' name='work' placeholder="TASK" onChange={handleform} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Enter Deadline</Form.Label>
              <Form.Control type='text' name='deadline' onChange={handleform} placeholder="Deadline" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
            <br></br>
             {/* <div>
              <ul>
              {
                showdata.map(user => <li key={user._id}>{user.work} ,{user.deadline}<button onClick={()=>tododelete(user._id)}>delete</button></li>)
              }
              </ul>
            </div>  */}
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Sr </th>
                  <th>TASK</th>
                  <th>Deadline</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  showdata.map((user ,index )=>{
                    return(
                      <tr>
                        <td>{index + 1}</td>
                        <td>{user.work}</td>
                        <td>{user.deadline}</td>
                        <td><button className='dlt-btn' onClick={()=>tododelete(user._id)}>Delete</button></td>
                    </tr>
                    )
                  })
                
                }
              </tbody>
            </Table>
            
      </div>
  );
}

export default App;
