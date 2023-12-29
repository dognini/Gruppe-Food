import { BrowserRouter, Route, Routes } from "react-router-dom";

import 'react-toastify/dist/ReactToastify.css';

import Home from "./pages/home";
import Login from "./pages/login";
import Carteira from "./pages/carteira";
import Carrinho from "./pages/carrinho";
import Container from "./layout/container";
import MeusPedidos from "./pages/meusPedidos";

import UserList from "./pages/user/userList";
import CreateUser from "./pages/user/createUser";

import EditUSer from "./pages/user/editUser";
import Restaurant from "./pages/restaurant/restaurant";
import VizualizarUser from "./pages/user/vizualizarUser";
import EditRestaurant from "./pages/restaurant/editRestaurant";
import CreateRestaurant from "./pages/restaurant/createRestaurant";
import RestaurantesList from "./pages/restaurant/restaurantList";
import ViewRestaurant from "./pages/restaurant/viewRestaurant";
import Enderecos from "./pages/enderecos";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Container />}>

          <Route index element={<Home />} />
          <Route path="/carrinho" element={<Carrinho />} />

          <Route path="/carteira" element={<Carteira />} />
          <Route path="/enderecos" element={<Enderecos />} />
          <Route path="/meus-pedidos" element={<MeusPedidos />} />

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