import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { connect } from 'react-redux';

import { Link } from "react-router-dom";

export class MovieCard extends React.Component {

  render() {
    const { movieData, userInfo, addToFavorites, removeFromFavorites } = this.props;
    let isFavorite = userInfo.FavoriteMovies.find(fmId => movieData._id === fmId) ? true : false;
    return (
      <Card className="col-md-3 mb-3 mr-3" >
        <Card.Img variant="top" src={movieData.ImagePath} />
        <Card.Body>
          <Card.Title>{movieData.Title}</Card.Title>
          <Card.Text>{movieData.Description}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <Link to={`/movies/${movieData._id}`}>
            <Button variant="primary">Open</Button>
          </Link><br /><br />
          <Button variant="secondary" onClick={() => { isFavorite ? removeFromFavorites(movieData._id) : addToFavorites(movieData._id) }}>{isFavorite ? "Remove from favorites" : "Add to favorites"}</Button>
        </Card.Footer>
      </Card>
    );
  }
}

let mapStateToProps = state => {
  return {
    userInfo: state.userInfo
  };
}

export default connect(mapStateToProps)(MovieCard);


MovieCard.propTypes = {
  movieData: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired
};