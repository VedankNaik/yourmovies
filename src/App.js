import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MovieList from "./components/MovieList";
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";
import AddFavourites from "./components/AddFavourites";
import RemoveFavourites from "./components/RemoveFavourites";
import randomWords from "random-words";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [yearValue, setYearValue] = useState();
  const [typeValue, setTypeValue] = useState("");

  const message = {
    fontSize: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const getMovieRequest = async () => {
    console.log("~ sessssarchValue", searchValue);
    let url;
    if (searchValue === "") {
      url = `http://www.omdbapi.com/?s=${randomWords()}&apikey=d847e759&y=${yearValue}&type=${typeValue}`;
    } else {
      url = `http://www.omdbapi.com/?s=${searchValue}&apikey=d847e759&y=${yearValue}&type=${typeValue}`;
    }
    console.log("~ url", url);

    if (url) {
      const response = await fetch(url);
      const responseJson = await response.json();
      if (responseJson.Search) {
        setMovies(responseJson.Search);
      }
    }
  };

  useEffect(() => {
    getMovieRequest();
  }, []);

  // useEffect(() => {
  //   getMovieRequest(searchValue);
  // }, [searchValue]);

  useEffect(() => {
    const movieFavourites = JSON.parse(
      localStorage.getItem("react-movie-app-favourites")
    );

    if (movieFavourites) {
      setFavourites(movieFavourites);
    }
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem("react-movie-app-favourites", JSON.stringify(items));
  };

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );

    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  return (
    <div className="container-fluid movie-app">
      <div className="row d-flex mx-5 mt-4 mb-4">
        <MovieListHeading heading="Movies" />
        {/* <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} /> */}
      </div>
      <div
        className="row"
        style={{ overflow: "visible", paddingBottom: "30px" }}
      >
        <SearchBox
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          yearValue={yearValue}
          setYearValue={setYearValue}
          typeValue={typeValue}
          setTypeValue={setTypeValue}
          getMovieRequest={getMovieRequest}
        />
      </div>
      {movies && (
        <div className="row">
          <MovieList
            movies={movies}
            handleFavouritesClick={addFavouriteMovie}
            favouriteComponent={AddFavourites}
          />
        </div>
      )}
      {movies.length === 0 && <div style={message}>Loading...</div>}
      <hr />
      <div className="row d-flex mx-5 mt-4 mb-4">
        <MovieListHeading heading="Favourites" />
      </div>
      {favourites && (
        <div className="row">
          <MovieList
            movies={favourites}
            handleFavouritesClick={removeFavouriteMovie}
            favouriteComponent={RemoveFavourites}
          />
        </div>
      )}
      {favourites.length === 0 && <div style={message}>No favourites</div>}
    </div>
  );
};

export default App;
