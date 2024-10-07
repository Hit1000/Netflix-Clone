import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Modal from "react-modal";
import video from "../assets/video.mp4";
import { IoPlayCircleSharp } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { BiChevronDown } from "react-icons/bi";
import { BsCheck } from "react-icons/bs";
import { motion } from "framer-motion";
import { firebaseAuth } from "../utils/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import axios from "axios";

export default React.memo(function Card({
  movieData,
  isLiked = false,
  index,
  key,
}) {
  const [email, setEmail] = useState(undefined);
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) {
        setEmail(currentUser.email);
      } else {
        navigate('/signup');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const addToList = async () =>{
    try{
      await axios.post("http://localhost:5000/api/user/add", {email, data:movieData})
    }
    catch(e){
      console.log(e);   
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const ratingOutOfFive = rating / 2;
    for (let i = 1; i <= 5; i++) {
      if (ratingOutOfFive >= i) {
        stars.push(<FaStar key={i} color="gold" />);
      } else if (ratingOutOfFive >= i - 0.5) {
        stars.push(<FaStarHalfAlt key={i} color="gold" />);
      } else {
        stars.push(<FaRegStar key={i} color="gold" />);
      }
    }
    return stars;
  };

  return (
    <Container
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div layout="position" transition={{ layout: { duration: 1 } }}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
          alt="card"
        />
        {isHovered && (
          <motion.div layout="position" className="hover">
            <div className="image-video-container">
              <img
                src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
                alt="movie"
                onClick={() => navigate("/player")}
              />
              <video
                src={video}
                autoPlay
                loop
                muted
                onClick={() => navigate("/player")}
              />
            </div>
            <div className="info-container flex column">
              {/* <h3 className="name" onClick={() => navigate("/player")}> */}
              <h3 className="name" onClick={() => setIsModalOpen(true)}>
                {movieData.name}
              </h3>
              <div className="icons flex j-between">
                <div className="controls flex">
                  <IoPlayCircleSharp
                    title="Play"
                    onClick={() => navigate("/player")}
                  />
                  <RiThumbUpFill title="Like" />
                  <RiThumbDownFill title="Dislike" />
                  {isLiked ? (
                    <BsCheck title="Remove from the List" />
                  ) : (
                    <AiOutlinePlus title="Add to my List" 
                    onClick={addToList}
                    />
                  )}
                </div>
                <div className="info">
                  <BiChevronDown
                    title="More info"
                    onClick={() => setIsModalOpen(true)}
                  />
                </div>
              </div>
              <div className="genres flex">
                <ul className="flex">
                  {movieData.genres.map((genre) => (
                    <li key={genre}>{genre}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => {
          setIsModalOpen(false);
          setIsHovered(false);
        }}
        ariaHideApp={false}
        contentLabel="Movie Details"
        style={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.7)" },
          content: {
            top: "15%",
            left: "10%",
            right: "auto",
            // bottom: "100%",
            // marginRight: "-50%",
            // transform: "translate(-50%, -50%)",
            background: "#181818ef",
            color: "white",
            padding: "20px",
            borderRadius: "10px",
            width: "80%",
          },
        }}
      >
        <div className="flex">
          <img
            src={`https://image.tmdb.org/t/p/w500${movieData.poster}`}
            alt="movie"
            onClick={() => navigate("/player")}
          />
          <div className="a-center j-center text-center mx-10">
            <h2>{movieData.name}</h2>
            <p>Genre: {movieData.genres.join(", ")}</p>
            <p>Description: {movieData.overview}</p>
            <p className="flex">
            Rating: {renderStars(movieData.vote_average)}
              ({Math.floor(movieData.vote_average) / 2}) 
            </p>
            <button
              onClick={() => {
                setIsModalOpen(false);
                setIsHovered(false);
              }}
              style={{ marginTop: "20px" }}
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </Container>
  );
});

const Container = styled.div`
  max-width: 260px;
  width: 260px;
  height: 100%;
  cursor: pointer;
  position: relative;
  img {
    border-radius: 0.2rem;
    width: 100%;
    height: 100%;
    z-index: 10;
    transition: 0.7s ease-in-out;
  }
  .hover {
    @keyframes identifier {
      0% {
        width: 18rem;
        top: 0vh;
        left: -2vh;
      }
    }
    animation: identifier 1s;
    z-index: 20;
    height: max-content;
    width: 22rem;
    position: absolute;
    top: -9vh;
    left: -6vh;
    border-radius: 0.3rem;
    box-shadow: rgba(0, 0, 0, 0.75) 0px 3px 10px;
    background-color: #181818;
    transition: all 0.7s ease-in-out;
    .image-video-container {
      position: relative;
      height: 140px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 0.3rem;
        position: absolute;
        z-index: 6;
        top: 0;
      }
      video {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 5;
        position: absolute;
      }
    }
    .info-container {
      padding: 1rem;
      gap: 0.5rem;
      z-index: 10;
      .name {
        font-family: Protest Guerrilla;
        font-weight: bolder;
        font-size: 1.5rem;
      }
    }
    .icons {
      .controls {
        display: flex;
        gap: 1rem;
      }
      svg {
        font-size: 2rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover {
          color: #b8b8b8;
        }
      }
    }
    .genres {
      z-index: 10;
      ul {
        gap: 1rem;
        li {
          padding-right: 0.7rem;
          list-style-type: circle;
          &:first-of-type {
            list-style-type: none;
          }
        }
      }
    }
  }
`;
