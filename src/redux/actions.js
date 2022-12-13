export const actionAdd = (imdbID) => (
    {
      type: "ADD_MOVIE_TO_THE_LIST",
      payload: {
        imdbID: imdbID
      }
    }
  )

  export const actionDelete = (imdbID) => (
    {
      type: "DELETE_MOVIE_FROM_THE_LIST",
      payload: {
        imdbID: imdbID
      }
    }
  )

  export const searchMovies = (movies) => (
    {
      type: "SEARCH_MOVIES",
      payload: {
        movies: movies
      }
    }
  )

  export function getFilmData(s) {
    return function (dispatch) {
      fetch(`http://www.omdbapi.com/?s=${s}&apikey=b045d90e`)
        .then((res) => res.json())
        .then((data) => {
          dispatch(searchMovies(data.Search));
        })
        .catch((e)=> {
          alert("Error",e);
        }); 
    };
  }
