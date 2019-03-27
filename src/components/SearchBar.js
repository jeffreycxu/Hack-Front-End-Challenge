import React from 'react';
import axios from 'axios';
import { Form, TextArea} from 'semantic-ui-react'


class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: null,
      lastName: null,
      email: null,
      message: "",
    };
  }
  
  onFormSubmit = e => { //has to be arrow function so that 'this' refers to the right thing!
    e.preventDefault();
    axios.post("https://tranquil-lowlands-24043.herokuapp.com/feedback", {
        first: this.state.firstName,
        last: this.state.lastName,
        email: this.state.email,
        message: this.state.message
    })
    .then(response => {
        console.log(response.data);
    })
  
  }

  onInputChange = e =>{ //update the stage everytime the user enters something so it is always updated! 
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div className = "container">
        <Form onSubmit = { this.onFormSubmit }>
          <div className="ui segment">
            <p className = "title">Feedback</p>
            <Form.Input name = "firstName" fluid placeholder='First name' type = "text" required onChange={this.onInputChange}/>
            <Form.Input name = "lastName" fluid placeholder='Last name'type = "text" required onChange={this.onInputChange}/>
            <Form.Input name = "email" fluid placeholder='john@example.com' type = "email" required onChange={this.onInputChange}/>
            <Form.Field name = "message" control={ TextArea } placeholder='Message' type = "text" required onChange={this.onInputChange} maxLength={500} />
            <p className = "count">{ this.state.message.length }/500</p>
            <button className="ui button">Submit</button>
          </div>
        </Form>
      </div>
    );
  }
}

export default SearchBar;