import React, { Component } from 'react';
import './Favorites.css';
import { actionDelete } from '../../redux/actions';
import {Link} from "react-router-dom";
import {connect} from "react-redux";

const mapState = (store) => ( {favoriteMovies: store.favoriteMovies} );
const mapDispatch = (dispatch) => ({
  removeFromFilm: (id) => dispatch( actionDelete(id) )
})

const connector = connect(mapState, mapDispatch);

class Favorites extends Component {
    state = {
        title: "",
        textLink: '#',
        inputActive: true,
        linkActive: false,
        buttonActive:false     
    }
    handleChangeName = (event) => {
        this.setState({ title: event.target.value });
        if(event.target.value){
          this.setState({buttonActive: true})
        }
        else this.setState({buttonActive:false})
      };

      handleSaveList = () => {
        this.setState({
          inputActive: false,
          linkActive: true,
          buttonActive:false
        });
        this.saveMovies();
      };
    
      saveMovies = () => {
        fetch("https://acb-api.algoritmika.org/api/movies/list",
          {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify({
              "title": this.state.title,
              "movies": this.props.favoriteMovies.map(e => e.imdbID)
            })
          })
          .then(res => res.json())
          .then(data => {
            this.setState({textLink: data.id})
          })
      };
    
    render() { 
        return (
            <div className="favorites">
                <input value={this.state.title} placeholder='Type a list name' className="favorites__name" 
                disabled={this.state.inputActive ? null : "disabled"} onChange={this.handleChangeName} />
                <ul className="favorites__list">
                    {this.props.favoriteMovies.map((item) => {
                        return <li className="favorites__list--item" key={item.imdbID}>{item.Title} ({item.Year}) <button onClick={()=>{this.props.removeFromFilm(item.imdbID)}}> X </button> </li>;
                    })}  
                </ul>

                <button type="button" onClick={this.handleSaveList} 
                disabled={!this.state.buttonActive }
                className={("favorites__save " +(!this.state.buttonActive ? "favorites__save:disabled" : null)
                ) && (this.state.linkActive ? "button_none" :"favorites__save" )
                 } >Save list
                </button>
                 <Link to={`/list/${this.state.textLink}`}
                  className={"link__none "  +(this.state.linkActive ? "link__block"  : null)}
                  rel="noreferrer" > Go to the list
                </Link>
            </div>
        );
    }
}
 
const NewFavorites =connector(Favorites)
export default NewFavorites;

