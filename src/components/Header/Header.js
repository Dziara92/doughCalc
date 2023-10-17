import React from "react";
import MobileNav from "../MobileNav/MobileNav";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { breakpoints } from "../../assets/breakpoints";
import { useProductsContext } from "../../ContextApp";
import logo from "../../assets/img/Pizza-Dough-Calculator-logo.jpg";

const Header = () => {
  const { state, openShopCard } = useProductsContext();
  const { qtyBusket } = state;

  return (
    <Wrapper>
      <div className="content">
        <MobileNav openShopCard={openShopCard} qtyBusket={qtyBusket} />
        <div className="logo__title">
          <img
            className="logo__img"
            src={logo}
            alt="Logo Pizza Dought Calculator"
          />
          <h2 className="title">Pizza Dough Calculator</h2>
        </div>
      </div>
      <div className="menu_desktop">
        <ul>
          <Link to="/doughCalc">
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
  width: 100%;
  height: auto;
  padding: 25px 0;

  .content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;

    .logo__title {
      display: flex;
      gap: 10px;
      .logo__img {
        width: 10%;
      }

      .title {
        font-size: 20px;
        color: #000000;
      }
    }
  }

  .menu_desktop {
    display: none;
  }
  @media (${breakpoints.mobileL}) {
    .content {
      justify-content: space-between;
      .logo__title {
        width: 80%;
        gap: 20px;
        .title {
          width: 80%;
          font-size: 22px;
        }
      }
    }
  }

  @media (${breakpoints.tablet}) {
    .content {
      .logo__title {
        width: 70%;
        gap: 30px;
        .title {
          width: 70%;
          font-size: 30px;
        }
      }
    }
  }
  @media (${breakpoints.laptop}) {
    .content {
      gap: 0px;
      .logo__title {
        margin: 0 auto;
        width: 1024px;
        align-items: center;
        justify-content: center;
        gap: 30px;
        .logo__img {
          width: 70px;
        }
        .title {
          width: 40%;
          font-size: 30px;
        }
      }
    }
    .menu_desktop {
      margin-top: 30px;
      display: block;
      width: 100%;

      ul {
        max-width: 1024px;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;

        li {
          display: inline-block;
          margin: 30px 10px;
          padding: 10px 15px;
          cursor: pointer;
          color: #000000;
          font-size: 22px;
          font-weight: 700;
          border-radius: 3px;
          transition: background-color 0.2s ease, color 0.2s ease;
          &:hover {
            color: #fff;
            background-color: #389c3e;
          }
        }
        .basket__box {
          position: relative;

          span {
            position: absolute;
            bottom: 4px;
            left: 4px;
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
            width: 20px;
            height: 20px;
          }
        }
      }
    }
  }
`;

export default Header;
