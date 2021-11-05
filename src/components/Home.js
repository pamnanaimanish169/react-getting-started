import  React   from    'react';
import { Form, FormControl, InputGroup, ListGroup } from 'react-bootstrap';
import  {   Link    }   from    'react-router-dom';
import   Button   from  'react-bootstrap/Button';
import axios from 'axios';

const baseURL = "https://6183555e91d76c00172d18ca.mockapi.io/api/v1/todo";


class Home extends  React.Component {
    
    constructor(props)  {
        super(props);

        this.state  = {todoValue  : '', todoList  : []};

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount()  {
        // get the API for initial data
        this.getTodoList();
      }
    
      handleChange(event) {
        this.setState({todoValue  : event.target.value});
      }
    
      handleSubmit(event) {
        // Stop the form from reloading
        event.preventDefault();
    
        // Call the API to save the Todo
        let data  = {"name" : this.state.todoValue};
        console.log(data);
    
        axios.post(baseURL,data).then((response)  =>  {
          console.log(response);
    
          if(response.status ==  201)  {
            alert('Entry created successfully.');
            this.setState({todoValue  : ''});
            // Get the list of todo's created & display it.
            this.getTodoList();
          }
        }).catch((error)  =>  {
          alert(error.message);
        });
        // Call the API to save the Todo
    
      }
    
      handleDelete(event, id)  {
    
        event.preventDefault();
    
        console.log(id);
        let isDelete = window.confirm('Are you sure you want to delete this entry?');
        console.log(isDelete);
    
        if(isDelete)  {
          // Call the API to delete the Todo
          axios.delete(baseURL + '/' + id).then((response)  =>  {
            console.log(response);
    
            if(response.status  ==  200)  {
              alert('Entry deleted successfully.');
              this.getTodoList();
            } else  {
              alert(response.message);
            }
          }).catch((error)  =>  {
            alert(error.message);
          })
          // Call the API to delete the Todo
        } else  {
          this.getTodoList(); 
        }
    
      }
    
      getTodoList() {
        axios.get(baseURL).then((response)  =>  {
    
          if(response.status  ==  200)  {
            this.setState({todoList : response.data});
            console.log(this.state.todoList);
          } else  {
            alert(response.message);
          }
        }).catch((error)  =>  {
          alert(error.message);
        });
      }

    render()    {
        return  (
            <div>
                <Form>
                    {/* mb=> margin-bottom */}
                    <Form.Group className="mb-3"  controlId="formBasicEmail">
                        <Form.Label>Add a todo</Form.Label>
                        <Form.Control type="text"  placeholder="Add a todo" onChange={this.handleChange} value={this.state.todoValue} />
                    </Form.Group>

                    <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                        Submit
                    </Button>

                    {/* mt=> margin-top */}
                    <Form.Group className="mt-3"  controlId="toDoList">
                        <ListGroup  as="ul">
                        {this.state.todoList.map((element, key) =>  {
                            return  (
                            <div>

                            <ListGroup.Item className="mt-1" as  = "li"  key={element.id}>
                                {element.name}
                                <div  className="mr-5">
                                <Link className="link" type="submit" to={`/update/${element.id}`}>Update</Link>
                                <Button variant="danger" type="submit" onClick={(e)  => this.handleDelete(e, element.id)}>Delete</Button>
                                </div>
                            </ListGroup.Item>
                            </div>
                            )
                        })}
                        </ListGroup>
                    </Form.Group>
        </Form> 
            </div>
        )
    }
}

export  default Home;