import { useParams } from "react-router-dom";
import styled from "styled-components";
import { breakpoints } from "../../assets/breakpoints";
import caputo from "../../assets/img/Caputo_1kg.jpg";
import { useProductsContext } from "../../ContextApp";
import { useState } from "react";

const SingleProduct = () => {
  const [qtyValue, setQtyValue] = useState(1);

  const { products, orderItem } = useProductsContext();
  const { idProduct } = useParams();
  const idProductConverted = Number(idProduct);
  const singleProduct = products.find(
    (product) => product.id === idProductConverted
  );
  const { id, name, price, stock, desc } = singleProduct;

  const increment = (e) => {
    e.preventDefault();
    if (stock <= qtyValue) {
      return;
    }
    setQtyValue((oldValue) => {
      let amountTemp = oldValue + 1;
      return amountTemp;
    });
  };

  const decrement = (e) => {
    e.preventDefault();
    if (1 >= qtyValue) {
      return;
    }
    setQtyValue((oldValue) => {
      let amountTemp = oldValue - 1;
      return amountTemp;
    });
  };

  return (
    <Wrapper>
      <div className="content">
        <img className="img" src={caputo} alt="Mąka Caputo 00 czerwona" />
        <div className="box-order">
          <h2 className="title-product">{name}</h2>
          <p className="price">
            Cena: <span>{price}</span>
          </p>
          <div className="qty-form">
            <p className="qty">
              Ilość w magazynie:<span> {stock} </span>szt.
            </p>
            <form
              className="form"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <h2 className="itemStore">{qtyValue}</h2>
              <button className="btn__quantity plus" onClick={increment}>
                +
              </button>
              <button className="btn__quantity minus" onClick={decrement}>
                -
              </button>
              <button
                className="btn"
                onClick={() => {
                  orderItem(qtyValue, id);
                }}
              >
                Zamawiam
              </button>
            </form>
          </div>

          <h5 className="title-desc">Opis produktu:</h5>
          <p className="desc">{desc}</p>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 30px 0;
  min-height: 58vh;

  .content {
    width: 100%;
    padding: 20px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
    .img {
      width: 70%;
    }

    .title-product {
      text-align: center;
    }

    .price {
      margin-top: 40px;
      span {
        font-weight: 700;
        font-size: 20px;
        color: #389c3e;
      }
    }
    .qty-form {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      margin: 5px 0 40px 0;
      .qty {
        width: 70%;
        span {
          font-weight: 700;
        }
      }
      .form {
        display: flex;
        width: 60%;
        .itemStore {
          display: inline;
        }

        .btn {
          padding: 5px 10px;
          border: none;
          border-radius: 3px;
          background-color: #389c3e;
          color: #fff;
          transition: background-color 0.2s;
          font-weight: 700;
          font-size: 14px;
          margin-left: 10px;
          &:hover {
            background-color: #0b4f1e;
          }
        }

        .btn__quantity {
          padding: 5px;
          border: none;
          border-radius: 3px;
          color: #fff;
        }
        .plus {
          background-color: #389c3e;
          margin: 0 2px 0 10px;
        }

        .minus {
          background-color: red;
          margin: 0 3px 0 2px;
        }
      }
    }

    .title-desc {
      font-size: 17px;
      margin: 10px 0;
    }
    .desc {
      line-height: 22px;
    }
  }

  @media (${breakpoints.mobileL}) {
    .content {
      max-width: 425px;
      margin: 0 auto;
      border: 1px solid #3333;
    }
  }

  @media (${breakpoints.tablet}) {
    .content {
      max-width: 768px;
      margin: 0 auto;

      flex-direction: row;
      align-items: center;
      gap: 40px;
      .img {
        width: 30%;
      }
      .box-order {
        width: 60%;

        .title-product {
          text-align: left;
        }

        .price {
          margin-top: 20px;
        }
      }
    }
  }

  @media (${breakpoints.laptop}) {
    .content {
      max-width: 1024px;
      gap: 40px;
      .img {
        width: 30%;
      }
      .box-order {
        width: 60%;

        .title-product {
          text-align: left;
          font-size: 25px;
        }

        .price {
          margin-top: 20px;
        }

        .btn {
          padding: 10px 18px;
          font-size: 15px;
          margin-left: 30px;
        }
      }
    }
  }
`;

export default SingleProduct;
