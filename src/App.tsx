import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/home";
import Login from "./pages/login";
import Carrinho from "./pages/carrinho";
import Container from "./layout/container";
import CreateUser from "./pages/createUser";
import RestaurantEdit from "./pages/restaurant";
import CreateRestaurant from "./pages/createRestaurant";
import Restaurantes from "./pages/restaurantesList";
import EditRestaurant from "./pages/editRestaurant";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Container />}>
          <Route index element={<Home />} />
          <Route path="/carrinho" element={<Carrinho />} />
          <Route path="/create-user" element={<CreateUser />} />
          <Route path="/restaurantes" element={<Restaurantes />} />
          <Route path="/edit-restaurant/:id" element={<EditRestaurant />} />
          <Route path="/restaurant/:id" element={<RestaurantEdit />} />
          <Route path="/create-restaurant" element={<CreateRestaurant />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}