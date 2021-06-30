import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { setMovies, setUserInfo } from '../../actions/actions';

import { LoginView } from '../login-view/login-view';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import MoviesList from '../movies-list/movies-list';


import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Navbar } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';

class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      token: null
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    let userName = localStorage.getItem('userName');
    if (accessToken !== null) {
      this.setState({
        token: accessToken
      });
      this.getMovies(accessToken);
      this.getUserInfo(userName, accessToken);
    }
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      token: authData.token
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('userName', authData.user.Username);
    this.getMovies(authData.token);
    this.getUserInfo(authData.user.Username, authData.token);
  }

  getMovies(token) {
    axios.get('https://movie-api-007.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getUserInfo(username, token) {
    axios.get('https://movie-api-007.herokuapp.com/users/' + username, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.props.setUserInfo(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    this.setState({
      token: null
    });
    window.open('/', '_self');
  }

  render() {
    let { movies, userInfo } = this.props;
    let userName = userInfo ? userInfo.Username : null;
    const { token } = this.state;

    return (
      <Router>

        {(userInfo) ?
          <Navbar>
            <Link to={`/users/${userName}`}>
              <Button variant="link">{userName}</Button>
            </Link>

            <Button variant="link" onClick={() => { this.onLoggedOut(); }}>Log out</Button>

          </Navbar>
          : null}

        <Row className="main-view justify-content-md-center">
          <Route exact path="/" render={() => {
            if (!userInfo) {
              return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
            }

            if (movies.length === 0) {
              return <div className="main-view" />;
            }

            return <MoviesList movies={movies} userInfo={userInfo} token={token} />;
          }} />

          <Route path="/register" render={() => {
            if (userName) {
              return <Redirect to="/" />
            }
            return <Col>
              <RegistrationView />
            </Col>
          }} />

          <Route path="/movies/:movieId" render={({ match, history }) => {
            if (!userName) {
              return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
            }

            if (movies.length === 0) {
              return <div className="main-view" />;
            }

            return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path="/directors/:name" render={({ match, history }) => {
            if (!userName) {
              return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
            }

            if (movies.length === 0) {
              return <div className="main-view" />;
            }

            return <Col md={8}>
              <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
            </Col>
          }
          } />

          <Route path="/genres/:name" render={({ match, history }) => {
            if (!userName) {
              return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
            }

            if (movies.length === 0) {
              return <div className="main-view" />;
            }

            return <Col md={8}>
              <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
            </Col>
          }
          } />
          <Route path="/users/:username" render={({ match, history }) => {
            if (!userInfo) {
              return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
            }

            return <Col md={8}>
              <ProfileView userInfo={userInfo} token={token} onBackClick={() => history.goBack()} onLoggedOut={() => this.onLoggedOut()} />
            </Col>
          }
          } />

        </Row>
      </Router>
    );
  }
}

let mapStateToProps = state => {
  return {
    movies: state.movies,
    userInfo: state.userInfo
  }
}

export default connect(mapStateToProps, { setMovies, setUserInfo })(MainView);

