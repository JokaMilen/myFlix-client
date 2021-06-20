import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

export class ProfileView extends React.Component {

  initialized = false;

  constructor(props) {
    super(props);

    const { userInfo } = this.props;

    this.state = {
      userName: userInfo.Username,
      userPassword: "",
      userEmail: userInfo.Email,
      userBirthday: userInfo.Birthday ? userInfo.Birthday : ""
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

  updateUser() {
    const { userInfo, token, onLoggedOut } = this.props;

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
        onLoggedOut();
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

    const { onBackClick } = this.props;

    return (
      <div className="profile-view">
        <div className="profile-username">
          <span className="label">Username: </span>
          <input className="value" type="text" value={this.state.userName} onChange={e => this.setUsername(e.target.value)} />
        </div>
        <div className="profile-email">
          <span className="label">Email: </span>
          <input className="value" type="text" value={this.state.userEmail} onChange={e => this.setEmail(e.target.value)} />
        </div>
        <div className="profile-birthday">
          <span className="label">Birthday: </span>
          <input className="value" type="text" value={this.state.userBirthday} onChange={e => this.setBirthday(e.target.value)} />
        </div>
        <div className="profile-password">
          <span className="label">New Password: </span>
          <input className="value" type="password" value={this.state.userPassword} onChange={e => this.setPassword(e.target.value)} />
        </div>
        <br />
        <button onClick={() => { this.updateUser(); }}>Save</button>&nbsp;
        <button onClick={() => { this.removeUser(); }}>Deregister</button>
        <br /><br />
        <button onClick={() => { onBackClick(null); }}>Back</button>
      </div>
    );
  }
}

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