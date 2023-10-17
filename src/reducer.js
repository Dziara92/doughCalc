const reducer = (state, action) => {
  if (action.type === "ORDER_ITEM") {
    const { qtyitem, tempProduct } = action.payload;
    tempProduct.amount = qtyitem;
    tempProduct.summary = tempProduct.price * tempProduct.amount;

    let productInCart = state.cart.find((i) => i.id === tempProduct.id);

    if (productInCart) {
      const cartTemp = state.cart.map((cartItem) => {
        if (cartItem.id === productInCart.id) {
          let newAmount = cartItem.amount + qtyitem;
          if (newAmount > cartItem.stock) {
            newAmount = cartItem.stock;
          }
          let summary = newAmount * cartItem.price;
          return { ...cartItem, amount: newAmount, summary };
        } else {
          return cartItem;
        }
      });

      const tempQtyBusket = cartTemp.reduce((acc, item) => {
        return acc + item.amount;
      }, 0);

      return {
        ...state,
        qtyBusket: tempQtyBusket,
        cart: cartTemp,
      };
    } else {
      return {
        ...state,
        qtyBusket: state.qtyBusket + qtyitem,
        cart: [...state.cart, tempProduct],
      };
    }
  }

  if (action.type === "OPEN_SHOP_CARD") {
    return { ...state, shopCart: !state.shopCart };
  }

  if (action.type === "CLOSE_SHOP_CARD") {
    return { ...state, shopCart: (state.shopCart = false) };
  }

  if (action.type === "CLEAR_BUSKET") {
    return { ...state, qtyBusket: 0, cart: [] };
  }

  if (action.type === "DELITE_ITEM") {
    const tempItemInCart = state.cart.filter(
      (item) => item.id !== action.payload
    );

    const temQtyBusket = tempItemInCart.reduce((acc, currentValue) => {
      return acc + currentValue.amount;
    }, 0);

    return { ...state, qtyBusket: temQtyBusket, cart: tempItemInCart };
  }

  if (action.type === "INCRISE") {
    const tempCart = state.cart.map((item) => {
      if (item.id === action.payload) {
        let newAmount = item.amount + 1;
        if (newAmount > item.stock) {
          newAmount = item.stock;
        }
        let summary = newAmount * item.price;
        return { ...item, amount: newAmount, summary };
      } else {
        return item;
      }
    });

    const temQtyBusket = tempCart.reduce((acc, currentValue) => {
      return acc + currentValue.amount;
    }, 0);

    return {
      ...state,
      qtyBusket: temQtyBusket,
      cart: tempCart,
    };
  }

  if (action.type === "DECRESE") {
    const tempCart = state.cart.map((item) => {
      if (item.id === action.payload) {
        let newAmount = item.amount - 1;
        if (newAmount <= 1) {
          newAmount = 1;
        }
        let summary = newAmount * item.price;
        return { ...item, amount: newAmount, summary };
      } else {
        return item;
      }
    });

    const temQtyBusket = tempCart.reduce((acc, currentValue) => {
      return acc + currentValue.amount;
    }, 0);

    return {
      ...state,
      qtyBusket: temQtyBusket,
      cart: tempCart,
    };
  }

  if (action.type === "REFRESH_TOTAL_PRICE") {
    const { summaryAllBusket } = state.cart.reduce(
      (acc, curentValue) => {
        acc.summaryAllBusket += curentValue.amount * curentValue.price;
        return acc;
      },
      { summaryAllBusket: 0 }
    );

    return { ...state, summaryAllBusket };
  }
};

export default reducer;
