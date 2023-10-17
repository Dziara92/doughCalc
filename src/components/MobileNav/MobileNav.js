import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { breakpoints } from "../../assets/breakpoints";

const MobileNav = ({ openShopCard, qtyBusket }) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  const handleHamburger = () => {
    setIsHamburgerOpen(!isHamburgerOpen);
  };

  return (
    <Wrapper>
      <div className="hamburger" onClick={handleHamburger}>
        <i
          className={
            isHamburgerOpen ? "fa-solid fa-xmark open" : "fa-solid fa-xmark"
          }
        ></i>
        <i
          className={
            !isHamburgerOpen ? "fa-solid fa-bars open" : "fa-solid fa-bars"
          }
        ></i>
      </div>

      <div
        className={isHamburgerOpen ? `contener open` : `contener`}
        onClick={handleHamburger}
      >
        <ul>
          <Link to="/">
            <li>Dough</li>
          </Link>
          <Link to="/Ingredients">
            <li>Składniki</li>
          </Link>
          <Link to="/Sklep">
            <li>Sklep</li>
          </Link>
          <li className="basket__box" onClick={openShopCard}>
            {qtyBusket > 0 && (
              <span>
                <p>{qtyBusket}</p>
              </span>
            )}

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="iconshop"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
          </li>
        </ul>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;

  @media only screen and (${breakpoints.tablet}) {
    max-width: 30%;
  }

  .hamburger {
    width: 25px;
    height: 20px;
    margin: 0 19px;
    font-size: 20px;
    position: relative;
    .fa-xmark,
    .fa-bars {
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      transition: opacity 0.3s ease;
      &.open {
        opacity: 1;
      }
    }
  }

  .contener {
    position: absolute;
    top: 55px;
    left: 0;
    width: 100vw;
    height: 0vh;
    background-color: #fff;
    display: flex;
    justify-content: center;
    overflow: hidden;
    transition: height 0.6s ease;
    &.open {
      min-height: 100vh;
      box-shadow: 0px 29px 29px 7px rgba(66, 68, 90, 0.19);
      background-color: #fff;
      z-index: 10;
    }
    ul {
      margin-top: 80px;
      text-align: center;
      a {
        text-decoration: none;
        color: #111;
        transition: color 0.2s;
        &:hover {
          color: #389c3e;
        }
      }

      li {
        cursor: pointer;
        list-style: none;
        line-height: 50px;
        font-size: 27px;
      }

      .basket__box {
        position: relative;

        span {
          position: absolute;
          bottom: 4px;
          left: 27px;
          width: 22px;
          height: 22px;
          background-color: red;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;

          p {
            font-size: 15px;
          }
        }
        .iconshop {
          margin-top: 20px;
          width: 40px;
          height: 40px;
        }
      }
    }
  }

  @media only screen and (${breakpoints.laptop}) {
    .hamburger,
    .contener {
      display: none;
    }
  }
`;
export default MobileNav;
