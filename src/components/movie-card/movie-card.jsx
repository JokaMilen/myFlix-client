import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

import { Link } from "react-router-dom";

export class MovieCard extends React.Component {

  state = {
    favorites: null
  };

  addToFavorites() {
    console.log("add to favorites");

    const { userInfo, token, movieData } = this.props;

    axios.post('https://movie-api-007.herokuapp.com/users/' + userInfo.Username + '/favorites/' + movieData._id, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        userInfo.FavoriteMovies = response.data;
        this.setState({ favorites: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  removeFromFavorites() {
    console.log("remove to favorites");
    const { userInfo, token, movieData } = this.props;

    axios.delete('https://movie-api-007.herokuapp.com/users/' + userInfo.Username + '/favorites/' + movieData._id, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        userInfo.FavoriteMovies = response.data;
        this.setState({ favorites: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { movieData, userInfo } = this.props;
    let isFavorite = userInfo.FavoriteMovies.find(fmId => movieData._id === fmId) ? true : false;
    return (
      <Card>
        <Card.Img variant="top" src={movieData.ImagePath} />
        <Card.Body>
          <Card.Title>{movieData.Title}</Card.Title>
          <Card.Text>{movieData.Description}</Card.Text>
          <Link to={`/movies/${movieData._id}`}>
            <Button variant="link">Open</Button>
          </Link>
          <Button variant="link" onClick={() => { isFavorite ? this.removeFromFavorites() : this.addToFavorites() }}>{isFavorite ? "Remove from favorites" : "Add to favorites"}</Button>
        </Card.Body>
      </Card>
    );
  }
}


MovieCard.propTypes = {
  movieData: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired
};