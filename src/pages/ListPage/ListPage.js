import React, { Component } from 'react';
import './ListPage.css';
import {connect} from "react-redux";

const mapState = (store) => 
     ( {favoriteMovies: store.favoriteMovies} );

const connector = connect(mapState);

class ListPage extends Component {
    componentDidMount() {
        const id = this.props.match.params;
        console.log(id);
    }
    render() { 
        return (
            <div className="list-page">
                <h1 className="list-page__title">My list</h1>
                <ul>
                    {this.props.favoriteMovies.map((item) => {
                        return (
                            <li key={item.imdbID}>
                                <a href={"https://www.imdb.com/title/"+ item.imdbID } target="_blank">{item.Title} ({item.Year})</a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}
 
export default connector(ListPage);