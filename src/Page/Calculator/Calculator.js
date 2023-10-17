import { useState } from "react";
import styled from "styled-components";
import { breakpoints } from "../../assets/breakpoints";

const Calculator = () => {
  const [pNumber, setPNumber] = useState(4);
  const [pStyle, setPStyle] = useState("Neapolitan");
  const [grams, setGrams] = useState(230);
  const [yeast, setYeast] = useState("");
  const [gramsYeast, setGramsYeast] = useState(0.12);
  const [amountWater, setAmountWater] = useState(65);
  const [resoults, setResoult] = useState(null);

  const handlePizzaNumber = (e) => {
    setPNumber(e.target.value);
    setResoult(null);
  };

  const handlePizzaStyle = (e) => {
    setPStyle(e.target.value);

    if (e.target.value === "Neapolitan") {
      setGrams(230);
    }
    if (e.target.value === "New York") {
      setGrams(250);
    }

    setResoult(null);
  };
  const handlePgrams = (e) => {
    setGrams(e.target.value);
    setResoult(null);
  };

  const handleYeast = (e) => {
    setYeast(e.target.value);

    if (e.target.value === "FreshYeast") {
      setGramsYeast(0.12);
    }
    if (e.target.value === "InstantDryYeast") {
      setGramsYeast(0.072);
    }
    setResoult(null);
  };

  const handleAmountWater = (e) => {
    setAmountWater(e.target.value);
    setResoult(null);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const weight = pNumber * grams;
    const flour = (weight * amountWater) / 100;
    const water = ((flour * amountWater) / 100).toFixed(0);
    const salat = ((weight * 1.8) / 100).toFixed(2);
    const yeast = ((weight * gramsYeast) / 100).toFixed(1);

    setResoult({
      water,
      flour,
      salat,
      yeast,
    });
  };

  return (
    <Wrapper>
      <div className="content">
        <form onSubmit={handleSubmitForm}>
          <div className="form__label">
            <label htmlFor="Pstyle"> Styl Pizzy</label>
            <select
              name="Pstyle"
              value={pStyle}
              onChange={(e) => handlePizzaStyle(e)}
            >
              <option value="Neapolitan">Neapolitan </option>
              <option value="New York">New York</option>
            </select>
          </div>

          <div className="form__label">
            <label htmlFor="Pnumber">Ilość kulek</label>
            <input
              type="number"
              name="Pnumber"
              min="1"
              value={pNumber}
              onChange={(e) => handlePizzaNumber(e)}
            />
          </div>
          <div className="form__label">
            <label htmlFor="Psize">Waga kulki (gr)</label>
            <input
              type="number"
              name="Psize"
              placeholder={grams}
              value={grams}
              onChange={handlePgrams}
            />
          </div>

          <div className="form__label">
            <label htmlFor="TypeOfYeast"> Rodzaj drożdży</label>
            <select name="TypeOfYeast" value={yeast} onChange={handleYeast}>
              <option value="FreshYeast">Świerze drożdże </option>
              <option value="InstantDryYeast">Suche drożdże</option>
            </select>
          </div>

          <div className="form__label">
            <label htmlFor="AmountWater">Ilość wody (%)</label>
            <input
              type="number"
              name="AmountWater"
              min="1"
              value={amountWater}
              onChange={(e) => handleAmountWater(e)}
            />
          </div>
          <button className="countBtn">Policz</button>
        </form>
        {resoults && (
          <div className="resoult">
            <h3>Proporcje które porzebujesz:</h3>
            <ul className="resoult__ul">
              <li className="resoult__li">
                Mąka: <span>{resoults.flour}</span>gr
              </li>
              <li className="resoult__li">
                Woda: <span>{resoults.water}</span>gr
              </li>
              <li className="resoult__li">
                Sól: <span>{resoults.salat}</span>gr
              </li>
              <li className="resoult__li">
                Drożdże: <span>{resoults.yeast}</span>gr
              </li>
            </ul>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  margin-top: 45px;
  min-height: 80vh;

  .content {
    max-width: 1024px;
    margin: 20px auto;
    padding: 0 20px;

    .form__label {
      display: flex;
      flex-direction: column;
      margin-bottom: 20px;

      label {
        margin-bottom: 10px;
      }

      select {
        padding: 5px 10px;
        width: 100%;
        background-color: transparent;
        border: 1px solid #000000;
        border-radius: 3px;
      }

      input {
        padding: 5px 10px;
        width: 100%;
        background-color: transparent;
        border: 1px solid #000000;
        border-radius: 3px;
      }
    }
    button {
      padding: 7px 20px;
      color: #fff;
      background-color: #000000;
      border: none;
      font-size: 18px;
      border-radius: 5px;
      cursor: pointer;
      transition: color 0.2s ease;
      &:hover {
        color: #ffa200;
      }
    }

    .resoult {
      margin: 20px 0;
      width: 100%;
      border: 1px solid #000000;
      border-radius: 3px;
      h3 {
        margin: 10px 0;
        text-align: center;
      }
      .resoult__ul {
        padding: 10px 10px;
        .resoult__li {
          line-height: 35px;
          color: #000000;
          list-style: none;
          font-size: 18px;
          span {
            margin: 0 10px;
            font-weight: 700;
          }
        }
      }
    }
  }
  @media (${breakpoints.mobileL}) {
    max-width: 425px;
    margin: 70px auto;
    .content {
      margin: 0 auto;
      .resoult {
        h3 {
          margin: 10px 0 10px 10px;
          text-align: left;
        }
      }
    }
  }
  @media (${breakpoints.tablet}) {
    max-width: 70%;
    margin: 70px auto;
    .content {
      margin: 0 auto;

      .resoult {
        margin: 40px 0;
        h3 {
          font-size: 20px;
        }
      }
    }
  }

  @media (${breakpoints.laptop}) {
    max-width: 70%;
    margin: 30px auto 0 auto;

    .content {
      .resoult {
        margin: 60px 0;
      }
    }
  }
`;
export default Calculator;
