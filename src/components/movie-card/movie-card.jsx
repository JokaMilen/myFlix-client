import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from "react-router-dom";

export class MovieCard extends React.Component {

  addToFavorites() {
    console.log("add to favorites");
  }

  removeFromFavorites() {
    console.log("remove to favorites");
  }

  render() {
    const { movieData, isFavorite } = this.props;
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
  }).isRequired,
  isFavorite: PropTypes.bool.isRequired
};