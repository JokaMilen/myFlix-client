import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

export class DirectorView extends React.Component {

  render() {
    const { director, onBackClick } = this.props;

    return (
      <div className="director-view">
        <br /><br />
        <div className="director-title">
          <span className="label h5">Name: </span>
          <span className="value">{director.Name}</span>
        </div>
        <div className="director-bio">
          <span className="label h5">Bio: </span>
          <span className="value">{director.Bio}</span>
        </div>
        <div className="director-birth">
          <span className="label h5">Birth: </span>
          <span className="value">{director.Birth}</span>
        </div>
        <div className="director-death">
          <span className="label h5">Death: </span>
          <span className="value">{director.Death}</span>
        </div>
        <br /><br />
        <Button variant="secondary" onClick={() => { onBackClick(null); }}>Back</Button>

      </div>
    );
  }
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired,
    Death: PropTypes.string
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};