import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BackgroundImage, Header } from "../components";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";




function Signup() {

  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const [show, setShow] = useState("");
  
  const handleSignIn = async () => {
    try {
      const { email, password } = formValues;
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      console.log(error);

      switch (error.code) {
        case "auth/email-already-in-use":
          setShow("Account already present");
          break;
        case "auth/invalid-email":
          setShow("Please, enter correct Email");
          break;
        case "auth/missing-password":
          setShow("Please, enter the Password");
          break;
        case "auth/weak-password":
          setShow("Please, enter strong Password");
          break;
        default:
          setShow(error);
      }
    }
  };

  const navigate = useNavigate();
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate("/");
  });

  return (
    <Container showPassword={showPassword}>
      <BackgroundImage />
      <div className="content ">
        <Header login />
        <div className="body flex column a-center justify-center h-5/6">
          <div className=" text flex column">
            <h1>Unlimited Movies, TV shows and more</h1>
            <h4>Watch anywhere. Cancel anytime.</h4>
            <h6>
              Ready to Watch? Enter your email to create or restart membership
            </h6>
            <div className="text-red-600 w-auto m-auto px-8 bg-opacity-50 bg-gray-950">
               {show}
            </div>
          </div>
          <div className="form">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={formValues.email}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  [e.target.name]: e.target.value,
                })
              }
            />
            {showPassword && (
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formValues.password}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            )}
            {!showPassword && (
              <button onClick={() => setShowPassword(true)}>
                Get Started {">"}
              </button>
            )}
          </div>
          <div>
            {showPassword && (<button className="m-8" onClick={handleSignIn}>
              Sign Up
            </button>)}
          </div>
        </div>
      </div>
    </Container>
  );
}
const Container = styled.div`
  position: relative;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    /* display: grid; */
    grid-template-columns: 15vh 85vh;
    .body {
      gap: 1rem;
      .text {
        gap: 1rem;
        text-align: center;
        font-size: 2rem;
        h1 {
          padding: 0 25rem;
          font-size: 3.5rem;
          font-weight: 900;
          line-height: 125%;
        }
        h4 {
          font-size: 1.25rem;
        }
        h6 {
          font-size: 1rem;
        }
      }
      .form {
        display: grid;
        grid-template-columns: ${({ showPassword }) =>
          showPassword ? "1fr 1fr" : "2fr 1fr"};
        width: 45%;
        gap: 1rem;
        transition: all 0.95s ease-in-out;

        input {
          color: black;
          border: none;
          padding: 1rem;
          font-size: 1.2rem;
          border: 1px solid black;
          border-radius: 0.2rem;
          &:focus {
            outline: none;
          }
        }
        button {
          padding: 0.4rem 1rem;
          background-color: #e50914;
          border: none;
          cursor: pointer;
          color: white;
          border-radius: 0.2rem;
          font-weight: normal;
          font-size: 1.5rem;
        }
      }
      button {
        padding: 0.4rem 1rem;
        background-color: #e50914;
        border: none;
        cursor: pointer;
        color: white;
        border-radius: 0.2rem;
        font-size: 1.1rem;
      }
    }
  }
`;

export default Signup;
