import React from "react";
import { useNavigate } from 'react-router-dom'
import styled from "styled-components";
import logo from "../assets/logo.png";
export default function Header(props){
    const navigate = useNavigate()

  return (
    <Container className="flex a-center justify-between">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <button 
      onClick={() => navigate(props.login?'/login':'/signup')}  
        >
        {props.login ? "Log In": "Sign In"}
      </button>
    </Container>
  );
}
const Container = styled.div`
    padding: 0 8rem;
    .logo{
        img{
            height: 5rem;

        }
    }
    button{
        padding: 0.3rem 1rem;
        background-color: #e50914;
        border: none;
        cursor: pointer;
        color: white;
        border-radius: 0.2rem;
        font-weight: bolder;
        font-size: .95rem;
    }
`;

