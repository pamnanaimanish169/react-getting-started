import './App.css';
import { Form } from 'react-bootstrap';
import   Button   from  'react-bootstrap/Button';
import React from 'react';


class App extends React.Component {
  
  constructor(props)  {
    super(props);

    this.state  = {todoValue  : ''};

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({todoValue  : event.target.value});
  }

  handleSubmit(event) {
    // Stop the form from reloading
    event.preventDefault();

    console.log(this.state.todoValue);

    // Call the API to save the Todo
  }

  render()  {
    return(
      <div>
      <Form>
        
        <Form.Group className="mb-3"  controlId="formBasicEmail">
          <Form.Label>Add a todo</Form.Label>
          <Form.Control type="text"  placeholder="Add a todo" onChange={this.handleChange} value={this.state.todoValue} />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={this.handleSubmit}>
          Submit
        </Button>
      </Form>
    </div>
    );
  }
}

export  default App;