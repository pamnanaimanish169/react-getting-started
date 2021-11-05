import  React, { useState }   from    'react';
import  {   withRouter  }   from    'react-router';
import { InputGroup, FormControl } from 'react-bootstrap';
import    Form       from    'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios, { Axios } from 'axios';
import  {   useParams   }   from    "react-router-dom";
import  './Update.css';

const baseURL = "https://6183555e91d76c00172d18ca.mockapi.io/api/v1/todo";

class   Update  extends React.Component {

    constructor(props) {
        super(props);

        this.state   =   {todoList   :   {name   :   ''}};
        this.handleChange   =   this.handleChange.bind(this);
        this.handleSubmit   =   this.handleSubmit.bind(this);
    }

    handleChange(event) {
        console.log(event);

        console.log(event.target.value);

        this.setState({todoList :   {name   :   event.target.value}});
    }

    handleSubmit(event) {
        const   id  =   this.props.match.params.id;

        event.preventDefault();

        console.log(this.state.todoList);

        axios.put(baseURL   +   '/' +   id, this.state.todoList).then((response) =>  {
            if(response.status  ==  200)    {
                console.log(response);
                console.log(this.props);
                this.props.history.push('/');
            }   else{
                console.log(response);
            }
        }).catch((error)    =>  {
            console.log(error.message);
        })

    }

    componentDidMount() {
        const   id  =   this.props.match.params.id;

        console.log(id);

        // Get the value of the Entry
        axios.get(baseURL   +   '/' +   id).then((response) =>  {
            
            if(response.status  ==  200)    {
                this.setState({todoList :   response.data});
                console.log(this.state.todoList);
            }   else    {
                console.log(response);
            }

        }).catch((error)    =>  {
            console.log(error.message);
        })
    }

    render()    {

        
        return  (
            <div>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Control   type="text" placeholder="Name"  value={this.state.todoList.name}    onChange={this.handleChange}></Form.Control>
                    </Form.Group>

                    <Button variant="primary"   type="submit"   onClick={this.handleSubmit}>
                        Submit
                    </Button>

                    <Button variant="danger">
                        Cancel
                    </Button>

                </Form>
            </div>
        );
    }
}

export  default withRouter(Update);