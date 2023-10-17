import React from "react";
import styled from "styled-components";

const Footer = () => {
  const date = new Date().getFullYear();

  return (
    <Wrapper>
      <p>Pizza Dough Calculator</p>
      <p>Copyright &#169; {date}</p>
    </Wrapper>
  );
};

export default Footer;

const Wrapper = styled.div`
  width: 100%;
  min-height: 4rem;
  text-align: center;
  padding: 10px;
  background-color: #000;
  color: #fff;

  p {
    font-size: 18px;
    margin-top: 10px;
  }
`;
