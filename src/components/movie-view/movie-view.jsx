import React from 'react';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className="movie-view">
        <Card className="col-md-6 mb-3 mr-3" >
          <Card.Img variant="top" src={movie.ImagePath} />
          <Card.Body>
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text>{movie.Description}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <Link to={`/directors/${movie.Director.Name}`}>
              <Button variant="primary">Director</Button>
            </Link><br /><br />
            <Link to={`/genres/${movie.Genre.Name}`}>
              <Button variant="primary">Genre</Button>
            </Link><br />
          </Card.Footer>
          <Button variant="secondary" onClick={() => { onBackClick(null); }}>Back</Button>
        </Card>
      </div>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }).isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};