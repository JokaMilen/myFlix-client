import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { setMovies, setUserInfo, setToken } from '../../actions/actions';

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

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    let username = localStorage.getItem('username');
    if (accessToken !== null && username !== null) {
      this.props.setToken(accessToken);

      this.getUserInfo(username, accessToken);
      this.getMovies(accessToken);
    }
  }

  onLoggedIn(authData) {

    this.props.setToken(authData.token);
    this.props.setUserInfo(authData.user);

    localStorage.setItem('token', authData.token);
    localStorage.setItem('username', authData.user.Username);

    this.getMovies(authData.token);
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
    localStorage.removeItem('username');
    this.props.setToken(null);
    this.props.setUserInfo(null);
    window.open('/', '_self');
  }

  addToFavorites(movieId) {

    const { userInfo, token } = this.props;

    axios.post('https://movie-api-007.herokuapp.com/users/' + userInfo.Username + '/favorites/' + movieId, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        let newUserInfo = {
          ...userInfo,
          FavoriteMovies: response.data
        }
        this.props.setUserInfo(newUserInfo);
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  removeFromFavorites(movieId) {
    const { userInfo, token } = this.props;

    axios.delete('https://movie-api-007.herokuapp.com/users/' + userInfo.Username + '/favorites/' + movieId, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        let newUserInfo = {
          ...userInfo,
          FavoriteMovies: response.data
        }
        this.props.setUserInfo(newUserInfo);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    let { movies, userInfo, token } = this.props;
    let userName = userInfo ? userInfo.Username : null;

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

            return <MoviesList movies={movies} userInfo={userInfo} token={token} showFilter={true} addToFavorites={(movieId) => this.addToFavorites(movieId)} removeFromFavorites={(movieId) => this.removeFromFavorites(movieId)} />;
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

            return <ProfileView userInfo={userInfo} token={token} onBackClick={() => history.goBack()} onLoggedOut={() => this.onLoggedOut()} movies={movies} addToFavorites={(movieId) => this.addToFavorites(movieId)} removeFromFavorites={(movieId) => this.removeFromFavorites(movieId)} />

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
    userInfo: state.userInfo,
    token: state.token
  }
}

export default connect(mapStateToProps, { setMovies, setUserInfo, setToken })(MainView);

