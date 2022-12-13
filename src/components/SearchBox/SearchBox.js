import React, { Component } from 'react';
import './SearchBox.css';
import {getFilmData} from "../../redux/actions";
import {connect} from "react-redux";

class SearchBox extends Component {
    state = {
        searchLine: '' 
    }
    searchLineChangeHandler = (e) => {
        this.setState({ searchLine: e.target.value });
    }
    searchBoxSubmitHandler = (e) => {
        e.preventDefault();
        this.props.dispatch(getFilmData(this.state.searchLine))
    }
    render() {   
        const { searchLine } = this.state;
        return (
            <div className="search-box">
                <form className="search-box__form" onSubmit={this.searchBoxSubmitHandler}>
                    <label className="search-box__form-label">
                        Search movie by title:
                        <input
                            value={searchLine}
                            type="text"
                            className="search-box__form-input"
                            placeholder="For instance, Shawshank Redemption"
                            onChange={this.searchLineChangeHandler}
                        />
                    </label>
                    <button
                        type="submit"
                        className="search-box__form-submit"
                        disabled={!searchLine}> Search 
                    </button>
                </form>
            </div>
        );
     }
}
const mapStateToProps = (state) => {
    return {
        movies: state.movies
    }
} 
export default connect(mapStateToProps)(SearchBox);