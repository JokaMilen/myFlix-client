import React from 'react';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import MovieCard from '../movie-card/movie-card';

const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movies, showFilter, visibilityFilter, userInfo, token, addToFavorites, removeFromFavorites } = props;

  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }

  if (!movies) return <div className="main-view" />;

  return <>
    {showFilter ? (
      <Col md={12} style={{ margin: '1em' }}>
        <VisibilityFilterInput visibilityFilter={visibilityFilter} />
      </Col>) : ""
    }
    {filteredMovies.map(m => (
      <Col md={3} key={m._id}>
        <MovieCard movieData={m} token={token} addToFavorites={addToFavorites} removeFromFavorites={removeFromFavorites} />
      </Col>
    ))}
  </>;
}

export default connect(mapStateToProps)(MoviesList);