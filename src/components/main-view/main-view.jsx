import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { RegistrationView } from '../registration-view/registration-view';

class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      registered: false
    };
  }

  componentDidMount() {
    axios.get('https://movie-api-007.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  onLoggedIn(loggedInUser) {
    this.setState({
      user: loggedInUser
    });
  }

  onRegistration(isRegistred) {
    this.setState({
      registred: isRegistred
    });
  }

  render() {
    const { movies, selectedMovie, user, registred } = this.state;

    if (!registred) return <RegistrationView onRegistration={isRegistred => this.onRegistration(isRegistred)} />;

    if (!user) return <LoginView onLoggedIn={loggedInUser => this.onLoggedIn(loggedInUser)} />;

    if (movies.length === 0) {
      return <div className="main-view">The list is empty!</div>;
    }

    if (selectedMovie) {
      return (
        <Row className="main-view justify-content-md-center">
          <Col md={8}>
            <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
          </Col>
        </Row>
      );
    } else {
      return (
        <Row className="main-view justify-content-md-center">
          {movies.map(movie =>
            <Col md={3}>
              <MovieCard key={movie._id} movieData={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />
            </Col>
          )}
        </Row>
      );
    }
  }
}

export default MainView;

