import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);

    axios.post('https://movie-api-007.herokuapp.com/users', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    })
      .then(response => {
        const data = response.data;
        console.log(data);
        window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
      })
      .catch(e => {
        console.log('error registering the user')
      });
  }

  return (
    // <form>
    //   <label>
    //     Username:
    //     <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
    //   </label>
    //   <label>
    //     Password:
    //     <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
    //   </label>
    //   <label>
    //     Email:
    //     <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
    //   </label>
    //   <label>
    //     Birthday:
    //     <input type="text" value={birthday} onChange={e => setBirthday(e.target.value)} />
    //   </label>
    //   <button type="button" onClick={handleSubmit}>Submit</button>
    // </form>
    <Form>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" placeholder="Enter username"
          required minLength="5"
          value={username}
          onChange={e => setUsername(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="formEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control type="email" placeholder="Enter email"
          value={email}
          onChange={e => setEmail(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="formBirthday">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control type="date" placeholder="Enter birthday"
          value={birthday}
          onChange={e => setBirthday(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter password"
          value={password}
          onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
}
