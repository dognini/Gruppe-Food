import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/home";
import Login from "./pages/login";
import Carrinho from "./pages/carrinho";
import Container from "./layout/container";

import UserList from "./pages/user/userList";
import CreateUser from "./pages/user/createUser";

import EditUSer from "./pages/user/editUser";
import Restaurant from "./pages/restaurant/restaurant";
import VizualizarUser from "./pages/user/vizualizarUser";
import EditRestaurant from "./pages/restaurant/editRestaurant";
import CreateRestaurant from "./pages/restaurant/createRestaurant";
import RestaurantesList from "./pages/restaurant/restaurantesList";
import ViewRestaurant from "./pages/restaurant/viewRestaurant";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Container />}>

          <Route index element={<Home />} />
          <Route path="/carrinho" element={<Carrinho />} />

          <Route path="/usuarios" element={<UserList />} />
          <Route path="/create-user" element={<CreateUser />} />
          <Route path="/edit-user/:id" element={<EditUSer />} />
          <Route path="/view-user/:id" element={<VizualizarUser />} />

          <Route path="/restaurant/:id" element={<Restaurant />} />
          <Route path="/restaurantes" element={<RestaurantesList />} />
          <Route path="/edit-restaurant/:id" element={<EditRestaurant />} />
          <Route path="/create-restaurant" element={<CreateRestaurant />} />
          <Route path="/view-restaurant/:id" element={<ViewRestaurant />} />

        </Route>

      </Routes>
    </BrowserRouter>
  )
}