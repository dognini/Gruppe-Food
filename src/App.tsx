import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/home";
import Carrinho from "./pages/carrinho";
import Container from "./layout/container";
import CreateUser from "./pages/createUser";
import RestaurantEdit from "./pages/restaurant";
import CreateRestaurant from "./pages/createRestaurant";
import Login from "./pages/login";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Container />}>
          <Route index element={<Home />} />
          <Route path="/restaurant/:id" element={<RestaurantEdit />} />
          <Route path="/carrinho" element={<Carrinho />} />
          <Route path="/create-restaurant" element={<CreateRestaurant />} />
          <Route path="/create-user" element={<CreateUser />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}