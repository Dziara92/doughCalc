import styled from "styled-components";
import { useProductsContext } from "../../ContextApp";
import { Link } from "react-router-dom";
import { breakpoints } from "../../assets/breakpoints";

const ShopCart = () => {
  const {
    state,
    closeShopCard,
    clearBusket,
    deleteItem,
    incriseAmountItem,
    decreseAmountItem,
  } = useProductsContext();
  const { qtyBusket, cart, summaryAllBusket } = state;

  if (qtyBusket <= 0 && cart.length <= 0) {
    return (
      <Wrapper>
        <svg
          className="close_shop-cart"
          onClick={closeShopCard}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="empty_busket">Twój koszyk jest pusty</h3>

        <Link to="/Sklep" className="link" onClick={closeShopCard}>
          <button className="btn">Powrót do sklepu</button>
        </Link>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <svg
        className="close_shop-cart"
        onClick={closeShopCard}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>

      <div className="box_itemsShop">
        {cart.map((item, idex) => {
          return (
            <div key={idex} className="box_item">
              <div className="img-item">
                <img src={item.img} alt="zdjęcie produktu" />
              </div>
              <div className="name_price">
                <h3>{item.name}</h3> <p>Cena: {item.price}zł</p>
              </div>

              <footer>
                <div className="name_price-desktop">
                  <h3>{item.name}</h3> <p>Cena: {item.price}zł</p>
                </div>
                <div className="incrise_decrese">
                  <button
                    className="btn__quantity plus"
                    onClick={() => incriseAmountItem(item.id)}
                  >
                    +
                  </button>
                  <p>{item.amount}</p>
                  <button
                    className="btn__quantity minus"
                    onClick={() => decreseAmountItem(item.id)}
                  >
                    -
                  </button>
                </div>

                <p className="summary">
                  Do zapłaty: <span>{item.summary}zł</span>
                </p>
                <p className="stock">
                  W magazynie: <span>{item.stock}szt.</span>
                </p>

                <div className="description">
                  <h4>Opis:</h4>
                  <p>{item.desc}</p>
                </div>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="trash"
                  onClick={() => {
                    deleteItem(item.id);
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </footer>
            </div>
          );
        })}
      </div>

      <div className="box_item summerary">
        <p>
          Podsumowanie: <span>{summaryAllBusket}zł</span>
        </p>
      </div>

      <button className="btn_clear-busket" onClick={clearBusket}>
        Wyczyść koszyk
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border: 1px solid #3333;
  position: absolute;
  top: 100px;
  left: 0;
  width: 100%;
  padding: 10px;
  min-height: 100vh;
  background-color: white;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 20px 29px 7px rgba(66, 68, 90, 0.19);
  z-index: 99;

  .empty_busket {
    text-align: center;
    margin: 40px 0px 30px 0px;
  }

  .close_shop-cart {
    align-self: flex-end;
    width: 35px;
    margin: 10px 0;
    cursor: pointer;
    transition: color 0.4s ease;

    &:hover {
      color: red;
    }
  }
  .summerary {
    padding: 10px 20px;
    text-align: right;

    p {
      font-size: 20px;
      span {
        font-weight: 700;
      }
    }
  }

  .box_item {
    width: 95%;
    margin: 10px auto;
    border: 1px solid #3333;

    .img-item {
      width: 40%;
      margin: 10px auto;
      img {
        width: 100%;
      }
    }

    .name_price {
      text-align: center;

      h3 {
        margin: 10px auto;
      }
    }
    footer {
      display: flex;
      flex-direction: column;
      gap: 20px;
      align-items: center;
      margin: 30px 0;

      .name_price-desktop {
        display: none;
      }
      .summary {
        border: 1px solid #3333;
        padding: 10px;
      }
      .stock {
        margin-left: 10px;
        font-size: 15px;

        span {
          font-weight: 700;
        }
      }

      .description {
        display: none;
      }

      .incrise_decrese {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        width: 30%;
        font-size: 20px;

        .btn__quantity {
          padding: 5px 20px;
          border: none;
          border-radius: 3px;
          color: #fff;
          cursor: pointer;
        }
        .plus {
          background-color: #389c3e;
        }

        .minus {
          background-color: red;
        }
      }

      .trash {
        width: 20px;
        cursor: pointer;
        transition: color 0.4s ease;
        &:hover {
          color: red;
        }
      }
    }
  }

  .link {
    margin: 10px auto;
    .btn {
      padding: 15px 10px;
      width: 200px;
      background-color: #fac600;
      border: none;
      border-radius: 10px;
      font-size: 18px;
      cursor: pointer;
      transition: color 0.3s ease-in-out;

      &:hover {
        color: white;
      }
    }
  }

  .btn_clear-busket {
    width: 140px;
    padding: 5px 10px;
    font-size: 13px;
    margin: 30px auto;
    background-color: red;
    border-radius: 5px;
    color: #fff;
    border: none;
    cursor: pointer;
    transition: background-color 0.4s ease;

    &:hover {
      background-color: #c50000;
    }
  }

  @media (${breakpoints.tablet}) {
    .box_item.summerary {
      margin-top: 10px;
      justify-content: flex-end;
    }
    .box_item {
      display: flex;
      justify-content: space-around;
      align-items: center;

      .img-item {
        width: 100%;
        margin: 10px 0;

        img {
          width: 100%;
        }
      }

      .name_price {
        display: none;
      }
      footer {
        .name_price-desktop {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 90%;
          margin-bottom: 20px;

          h3 {
            font-size: 25px;
          }
        }
        .incrise_decrese {
          margin-top: 20px;
        }

        .summary {
          padding: 10px 20px;
        }
        .description {
          display: block;
          width: 90%;
          h4 {
            margin-bottom: 20px;
          }
          p {
            margin-bottom: 20px;
            line-height: 1.3;
          }
        }

        .trash {
          width: 30px;
        }
      }
    }
  }

  @media (${breakpoints.laptop}) {
    .empty_busket {
      font-size: 32px;
      margin: 100px 0px 30px 0px;
    }

    .close_shop-cart {
      position: absolute;
      top: 10px;
      right: 16px;
    }

    .box_item {
      margin-top: 80px;
      max-width: 1024px;
      .img-item {
        width: 70%;
        margin: 10px 0;

        img {
          width: 100%;
        }
      }
      footer {
        .summary {
          padding: 10px 40px;
        }
        .description {
          display: block;
          max-width: 90%;
          h4 {
            margin-bottom: 20px;
          }
          p {
            margin-bottom: 20px;
            line-height: 1.3;
          }
        }
      }
    }
  }
  @media (${breakpoints.laptopL}) {
    .close_shop-cart {
      right: 150px;
    }
  }
`;

export default ShopCart;
