const initialStore = {
    favoriteMovies: [ ],
    movies: [ ],
}

function reducer(store = initialStore, action) {
    switch (action.type) {
      case "ADD_MOVIE_TO_THE_LIST":
        if(store.favoriteMovies.find(item=>
          item.imdbID ===action.payload.imdbID ) ) 
          break;
          const temp=store.movies.find(item=>
          item.imdbID ===action.payload.imdbID);
          if(temp){
            const new_movie=store.favoriteMovies.slice();
            new_movie.push(temp);
            return{...store,favoriteMovies:new_movie};
          }
        break;
      case "DELETE_MOVIE_FROM_THE_LIST":
          const del_movie = store.favoriteMovies.filter(item => 
            item.imdbID !== action.payload.imdbID
          );
          return {...store, favoriteMovies: del_movie}
        break;

        case "SEARCH_MOVIES":
          return {...store, movies: action.payload.movies}
        break;
      default:
    }
    return store;  
  }

  export default reducer;