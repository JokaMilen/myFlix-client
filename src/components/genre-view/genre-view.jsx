import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

export class GenreView extends React.Component {

  render() {
    const { genre, onBackClick } = this.props;

    return (
      <div className="genre-view">
        <br /><br />
        <div className="genre-name">
          <span className="label h5">Name: </span>
          <span className="value">{genre.Name}</span>
        </div>
        <div className="genre-description">
          <span className="label h5">Description: </span>
          <span className="value">{genre.Description}</span>
        </div>
        <br /><br />
        <Button variant="secondary" onClick={() => { onBackClick(null); }}>Back</Button>
      </div>
    );
  }
}

GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};