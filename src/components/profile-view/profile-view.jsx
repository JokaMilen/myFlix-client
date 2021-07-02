import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import MoviesList from '../movies-list/movies-list';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { connect } from 'react-redux';
import { setUserInfo } from '../../actions/actions';

export class ProfileView extends React.Component {

  initialized = false;

  constructor(props) {
    super(props);

    const { userInfo } = this.props;

    this.state = {
      userName: userInfo.Username,
      userPassword: "",
      userEmail: userInfo.Email,
      userBirthday: userInfo.Birthday ? userInfo.Birthday.split('T')[0] : ""
    };
  }

  removeUser() {
    const { userInfo, token, onLoggedOut } = this.props;

    axios.delete('https://movie-api-007.herokuapp.com/users/' + userInfo.Username, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        onLoggedOut();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { userInfo, token } = this.props;

    axios.put('https://movie-api-007.herokuapp.com/users/' + userInfo.Username,
      {
        Username: this.state.userName,
        Password: this.state.userPassword,
        Email: this.state.userEmail,
        Birthday: this.state.userBirthday
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        this.props.setUserInfo(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  setUsername(username) {
    this.setState({
      userName: username
    });
  }

  setEmail(email) {
    this.setState({
      userEmail: email
    });
  }

  setBirthday(birthday) {
    this.setState({
      userBirthday: birthday
    });
  }

  setPassword(password) {
    this.setState({
      userPassword: password
    });

    console.log("user: " + this.state.userName);
  }

  render() {

    const { onBackClick, movies, userInfo, addToFavorites, removeFromFavorites } = this.props;
    let favoriteMovies = movies.filter(m => userInfo.FavoriteMovies.find(fmId => m._id === fmId) ? true : false);

    return (
      <Col>
        <Form>
          <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control type="text" placeholder="Enter username"
              required minLength="5"
              value={this.state.userName}
              onChange={e => this.setUsername(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control type="email" placeholder="Enter email"
              value={this.state.userEmail}
              onChange={e => this.setEmail(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formBirthday">
            <Form.Label>Birthday:</Form.Label>
            <Form.Control type="date" placeholder="Enter birthday"
              value={this.state.userBirthday}
              onChange={e => this.setBirthday(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control type="password" placeholder="Enter new password"
              value={this.state.userPassword}
              onChange={e => this.setPassword(e.target.value)} />
          </Form.Group>
          <Button className="mr-2" variant="primary" type="submit" onClick={this.handleSubmit}>
            Save
          </Button>
          <Button className="float-right" variant="danger" onClick={() => { this.removeUser(); }}>
            Deregister
          </Button>
          <Button variant="secondary" onClick={() => { onBackClick(null); }}>
            Back
          </Button><hr />
        </Form>
        <Row className="main-view justify-content-md-center">
          <MoviesList movies={favoriteMovies} addToFavorites={addToFavorites} removeFromFavorites={removeFromFavorites} />
        </Row>
      </Col>
    );
  }
}

let mapStateToProps = state => {
  return {
    userInfo: state.userInfo,
    token: state.token
  };
}

export default connect(mapStateToProps, { setUserInfo })(ProfileView);

ProfileView.propTypes = {
  userInfo: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string,
    FavoriteMovies: PropTypes.array
  }).isRequired,
  token: PropTypes.string.isRequired,
  onBackClick: PropTypes.func.isRequired,
  onLoggedOut: PropTypes.func.isRequired
};