import React, { Component } from 'react';
import MovieItem from '../MovieItem/MovieItem';
import './Movies.css';

import {actionAdd} from "../../redux/actions.js";
import {connect} from "react-redux";

const mapState = (store) => ( {movies: store.movies} );
const mapDispatch = (dispatch) => ({
  addToList: (id) => dispatch( actionAdd(id) )
})

const connector = connect(mapState, mapDispatch);

class Movies extends Component {
    render() { 
        return ( 
            <ul className="movies">
                {this.props.movies.map((movie) => (
                    <li className="movies__item" key={movie.imdbID}>
                        <MovieItem {...movie} clicker={this.props.addToList} />
                    </li>
                ))}
            </ul>
        );
    }
}
const NewMovies = connector(Movies);

export default NewMovies;