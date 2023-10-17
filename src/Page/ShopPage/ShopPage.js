import { Link } from "react-router-dom";
import styled from "styled-components";
import caputo from "../../assets/img/Caputo_1kg.jpg";
import { breakpoints } from "../../assets/breakpoints";
import { useProductsContext } from "../../ContextApp";

const ShopPage = () => {
  const { products } = useProductsContext();
  return (
    <Wrapper>
      <div className="content">
        {products.map((product) => {
          const { id, name, price } = product;
          return (
            <div className="product" key={id}>
              <img
                className="img"
                src={caputo}
                alt="Mąka Caputo 1kg czerwona"
              />
              <Link to={`/Sklep/${id}`}>
                <h3 className="product__title">{name}</h3>
              </Link>
              <p className="price">{price}zł</p>
              <Link to={`/Sklep/${id}`}>
                <button className="btn"> Zamów</button>
              </Link>
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 30px 0;
  .content {
    width: 100%;
    padding: 20px 20px;

    .product {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      margin-bottom: 50px;
      :last-child {
        margin-bottom: 0;
      }

      .product__title {
        text-decoration: none;
        color: black;
      }
      .img {
        width: 50%;
        margin-bottom: 20px;
      }
      .price {
        font-size: 20px;
      }
      .btn {
        padding: 8px 18px;
        border: none;
        border-radius: 3px;
        background-color: #389c3e;
        color: #fff;
        transition: background-color 0.2s;
        font-weight: 700;
        font-size: 16px;
        &:hover {
          background-color: #0b4f1e;
        }
      }
    }
  }
  @media (${breakpoints.mobileL}) {
    .content {
      margin: 0 auto;
      max-width: 425px;
      border: 1px solid #3333;
    }

    @media (${breakpoints.tablet}) {
      .content {
        margin: 0 auto;
        max-width: 768px;

        .product {
          width: 60%;
          margin: 0 auto 70px auto;
          .price {
            font-size: 22px;
          }
        }
      }
    }
    @media (${breakpoints.laptop}) {
      .content {
        max-width: 1024px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;

        .product {
          width: 33%;
          margin: 0 0 70px 0;
        }

        .img {
          width: 50%;
          margin-bottom: 20px;
        }
        .price {
          font-size: 20px;
        }
        .btn {
          padding: 8px 18px;
          border: none;
          border-radius: 3px;
          background-color: #389c3e;
          color: #fff;
          transition: background-color 0.2s;
          font-weight: 700;
          font-size: 16px;
          &:hover {
            background-color: #0b4f1e;
          }
        }
      }
    }
  }
`;

export default ShopPage;
