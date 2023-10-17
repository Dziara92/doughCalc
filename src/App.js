import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Header, Footer, ShopCart } from "./components";
import { Calculator, Ingredients, ShopPage, SingleProduct } from "./Page";
import { useProductsContext } from "./ContextApp";

function App() {
  const { state } = useProductsContext();
  const { shopCart } = state;
  return (
    <BrowserRouter>
      <Header />
      {shopCart && <ShopCart />}
      <Routes>
        <Route path="/" element={<Calculator />} />
        <Route path="/Ingredients" element={<Ingredients />} />
        <Route path="/Sklep" element={<ShopPage />} />
        <Route path="/Sklep/:idProduct" element={<SingleProduct />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
