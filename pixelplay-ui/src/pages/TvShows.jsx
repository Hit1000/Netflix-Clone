import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { fetchMovies, getGenres } from "../store";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { Navbar, NotAvailable, SelectGenres, Slider } from "../components";

export default React.memo(function TvShows() {
  const [isScrolled, setIsScrolled] = useState(false);
//   const navigate = useNavigate();
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
  const movies = useSelector((state) => state.netflix.movies);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  useEffect(() => {
    if (genresLoaded) dispatch(fetchMovies({ type: "tv" }));
  }, [genresLoaded, dispatch]);
//   console.log(movies);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    // console.log(isScrolled);
    return () => (window.onscroll = null);
  };

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    // if (currentUser) navigate("/");
  });

  return <Container>
    <div className="navbar">
        <Navbar isScrolled={isScrolled}/>
    </div>
    <div className="data">
        <SelectGenres type="tv" />
        {
            movies.length ? <Slider movies={movies}/> : <NotAvailable />
        }
    </div>
  </Container>;
});
const Container = styled.div`
.data {
    margin-top: 8rem;
    .not-available {
      text-align: center;
      color: white;
      margin-top: 4rem;
    }
  }
`;

