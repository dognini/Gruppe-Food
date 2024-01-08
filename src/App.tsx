import { BrowserRouter, Route, Routes } from "react-router-dom";

import 'react-toastify/dist/ReactToastify.css';

import Home from "./pages/home";
import Login from "./pages/login";
import Carrinho from "./pages/carrinho";
import Container from "./layout/container";
import MeusPedidos from "./pages/meusPedidos";

import Cadastro from "./pages/cadstros/cadastro";

import Carteira from "./pages/carteira/carteiras";
import EditCarteira from "./pages/carteira/carteira";

import Enderecos from "./pages/endereco/enderecos";
import Endereco from "./pages/endereco/endereco";

import UserList from "./pages/user/userList";
import EditUSer from "./pages/user/editUser";
import CreateUser from "./pages/user/createUser";
import VizualizarUser from "./pages/user/vizualizarUser";

import Restaurant from "./pages/restaurant/restaurant";
import EditRestaurant from "./pages/restaurant/editRestaurant";
import ViewRestaurant from "./pages/restaurant/viewRestaurant";
import RestaurantesList from "./pages/restaurant/restaurantList";
import CreateRestaurant from "./pages/restaurant/createRestaurant";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="cadastro" element={<Cadastro />} />

        <Route path="/" element={<Container />}>

          <Route index element={<Home />} />
          <Route path="/carrinho" element={<Carrinho />} />

          <Route path="/meus-pedidos" element={<MeusPedidos />} />

          <Route path="/carteira" element={<Carteira />} />
          <Route path="/carteira/:id" element={<EditCarteira />} />

          <Route path="/enderecos" element={<Enderecos />} />
          <Route path="/endereco/:id" element={<Endereco />} />

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