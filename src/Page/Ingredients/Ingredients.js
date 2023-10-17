import styled from "styled-components";
import { useState, useEffect } from "react";
import { breakpoints } from "../../assets/breakpoints";
import { useProductsContext } from "../../ContextApp";

const Ingredients = () => {
  const { ingredients } = useProductsContext();
  const [openMessage, setOpenMessage] = useState(false);
  const [howMenyTimes, setHowManyTimes] = useState(0);
  const [ingredient, setIngredient] = useState(ingredients[0].name);
  const [selectItngredient, setSelectIngredient] = useState(ingredients[0]);
  const [choosenIngredients, setChoosenIngredients] = useState([]);
  const [total, setTotal] = useState({});

  useEffect(() => {
    totalVal();
  }, [choosenIngredients]);

  const handleIngredients = (e) => {
    setIngredient(e.target.value);
    const ing = ingredients.find((ing) => ing.name === e.target.value);
    setSelectIngredient(ing);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (choosenIngredients.find((ing) => ing.id === selectItngredient.id)) {
      return;
    } else {
      setChoosenIngredients((prev) => [...prev, selectItngredient]);
    }

    setOpenMessage(true);
    if (howMenyTimes === 0) {
      setTimeout(() => {
        setHowManyTimes(1);
      }, 4000);
    }
  };

  const handleWeight = (e) => {
    const oldValueIng = ingredients.find((ing) => ing.name === e.target.name);

    const changedWeightIng = choosenIngredients.map((ing) => {
      if (ing.name === e.target.name) {
        ing.kcal = oldValueIng.kcal;
        ing.fat = oldValueIng.fat;
        const numberWeight = e.target.value;
        const kcal = (ing.kcal * numberWeight) / 100;
        const fat = (ing.fat * numberWeight) / 100;
        return { ...ing, weight: numberWeight, kcal, fat };
      }
      return ing;
    });

    setChoosenIngredients(changedWeightIng);
  };

  const handleDeleteIng = (id) => {
    const choosenIngredientsAfterDelite = choosenIngredients.filter(
      (ing) => ing.id !== id
    );
    setChoosenIngredients(choosenIngredientsAfterDelite);
  };

  const totalVal = () => {
    let { kcal, fat } = choosenIngredients.reduce(
      (total, ing) => {
        const { kcal, fat } = ing;
        total.kcal += kcal;
        total.fat += fat;
        return total;
      },
      { kcal: 0, fat: 0 }
    );
    setTotal((prev) => {
      return { ...prev, kcal, fat };
    });
  };

  return (
    <Wrapper className="wrapper">
      <div className="content">
        <h2>Składniki</h2>
        <form onSubmit={handleSubmitForm}>
          <label htmlFor="ingredients">Wybierz składniki:</label>
          <select
            name="ingredients"
            value={ingredient}
            onChange={handleIngredients}
          >
            {ingredients.map((ingredient) => {
              const { name, id } = ingredient;
              return (
                <option value={name} key={id}>
                  {name}
                </option>
              );
            })}
          </select>
          <button className="btn__add">Add</button>
        </form>
        <div className="ingredients__container">
          {openMessage && (
            <div className={howMenyTimes === 0 ? "message open" : "message"}>
              <p>W najbliższym czasie dodamy więcej składników</p>
            </div>
          )}

          {choosenIngredients.map((item) => {
            const { id, name, weight, kcal, fat } = item;
            return (
              <div className="container__item" key={id}>
                <label className="item__name" htmlFor="name">
                  {name}
                </label>
                <div className="item__input">
                  <p>
                    <span>W:</span>
                  </p>
                  <input name={name} value={weight} onChange={handleWeight} />
                  <p>
                    <span>T:</span>
                    {fat}
                  </p>
                  <p>
                    <span>Kcal:</span>
                    {kcal.toFixed(0)}
                  </p>
                  <button
                    className="btn_delete"
                    onClick={() => handleDeleteIng(id)}
                  >
                    usuń
                  </button>
                </div>
              </div>
            );
          })}
          {choosenIngredients.length > 0 && (
            <div className="container__total">
              <h4>Total: </h4>
              <p className="total__fat">
                <span>Tłuszcz:</span>
                {total.fat.toFixed(0)}
              </p>
              <p className="total__kcal">
                <span>Kcal:</span>
                {total.kcal.toFixed(0)}
              </p>
            </div>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  margin-top: 30px;

  .content {
    width: 90%;
    margin: 20px auto;
    form {
      label {
        margin-right: 5px;
      }
      select {
        background-color: transparent;
        border: 1px solid #111;
        border-radius: 3px;
        padding: 5px 10px;
      }
      .btn__add {
        margin-left: 20px;
        padding: 8px 18px;
        border: none;
        border-radius: 3px;
        background-color: #389c3e;
        color: #fff;
        transition: background-color 0.2s;
        font-weight: 700;
        &:hover {
          background-color: #0b4f1e;
        }
      }
    }

    h2 {
      font-size: 25px;
      margin-bottom: 30px;
      text-align: center;
    }
    .ingredients__container {
      position: relative;
      .message {
        position: absolute;
        top: -30px;
        left: 50%;
        transform: translateX(-50%);
        text-align: center;
        color: #fff;
        padding: 15px;
        border-radius: 5px;
        background-color: #ffa200;
        opacity: 0;
        transition: opacity 0.6s ease;
        pointer-events: none;
        &.open {
          opacity: 1;
          pointer-events: all;
        }
      }
    }

    .container__item {
      width: 100%;
      margin: 20px 0;
      label.item__name {
        color: #389c3e;
        font-size: 19px;
        margin-right: 10px;
        font-weight: 700;
      }
      .item__input {
        display: flex;
        align-items: center;
        margin: 15px 0;

        input {
          width: 20%;
        }
        p {
          margin: 0 10px;
          span {
            font-weight: 700;
            margin-right: 5px;
          }
        }
        .btn_delete {
          background-color: #111;
          padding: 8px 18px;
          border: none;
          border-radius: 2px;
          color: #fff;
          font-size: 15px;
          font-weight: 700;
          margin-left: 40px;
          cursor: pointer;
          transition: background-color 0.2s;
          &:hover {
            background-color: #333;
          }
        }
      }
    }

    .container__total {
      border: 1px solid #111;
      border-radius: 3px;
      padding: 10px 10px;
      margin-top: 30px;
      h4 {
        margin-bottom: 10px;
        font-size: 23px;
      }
      p {
        display: inline-block;
        font-size: 18px;
        span {
          font-weight: 700;
          margin-right: 5px;
        }
      }
      .total__kcal {
        margin-left: 20px;
      }
    }
  }

  @media (${breakpoints.mobileL}) {
    .content {
      max-width: 425px;
      .message {
        font-size: 20px;
        width: 80%;
        margin: 20px auto;
      }
      .container__total {
        margin: 50px auto 0 auto;
      }
    }
  }
  @media only screen and (${breakpoints.tablet}) {
    .content {
      max-width: 768px;

      form {
        width: 55%;
        margin: 30px auto 30px auto;
      }

      .container__item {
        margin: 40px auto;
        width: 80%;

        label.item__name {
          font-size: 22px;
        }

        .item__input {
          width: 70%;
          margin: 20px 0;
        }
      }

      .container__total {
        max-width: 80%;
        margin: 70px auto 0 auto;
        h4 {
          font-size: 28px;
        }

        .total__kcal {
          margin-left: 25px;
        }
      }
    }
  }

  @media only screen and (${breakpoints.laptop}) {
    .content {
      max-width: 1024px;

      form {
        max-width: 40%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        label {
          margin-right: 10px;
        }

        .btn__add {
          margin-left: 40px;
          padding: 8px 18px;
        }
      }

      .container__item {
        margin: 40px auto;
        width: 80%;
        label.item__name {
          font-size: 22px;
        }

        .item__input {
          width: 70%;
        }
      }
    }
  }
`;

export default Ingredients;
