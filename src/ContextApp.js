import { useContext, createContext, useReducer, useEffect } from "react";
import { products } from "./assets/products";
import { ingredients } from "./assets/ingredient";
import reducer from "./reducer";

const ProductsContext = createContext();

const initialstate = {
  qtyBusket: 0,
  shopCart: false,
  cart: [],
  summaryAllBusket: 0,
};

const ContextApp = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialstate);

  useEffect(() => {
    dispatch({ type: "REFRESH_TOTAL_PRICE" });
  }, [state.cart]);

  const orderItem = (qtyitem, id) => {
    const tempProduct = products.find((item) => item.id === id);
    dispatch({ type: "ORDER_ITEM", payload: { qtyitem, tempProduct } });
  };

  const openShopCard = () => {
    dispatch({ type: "OPEN_SHOP_CARD" });
  };
  const closeShopCard = () => {
    dispatch({ type: "CLOSE_SHOP_CARD" });
  };

  const clearBusket = () => {
    dispatch({ type: "CLEAR_BUSKET" });
  };

  const deleteItem = (id) => {
    dispatch({ type: "DELITE_ITEM", payload: id });
  };

  const incriseAmountItem = (id) => {
    dispatch({ type: "INCRISE", payload: id });
  };

  const decreseAmountItem = (id) => {
    dispatch({ type: "DECRESE", payload: id });
  };
  return (
    <ProductsContext.Provider
      value={{
        products,
        ingredients,
        state,
        orderItem,
        openShopCard,
        closeShopCard,
        clearBusket,
        deleteItem,
        incriseAmountItem,
        decreseAmountItem,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export default ContextApp;

export const useProductsContext = () => {
  return useContext(ProductsContext);
};
