import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/home";
import Login from "./pages/login";
import Carrinho from "./pages/carrinho";
import Container from "./layout/container";
import CreateUser from "./pages/createUser";
import { AuthProvider } from "./authContext";
import RestaurantEdit from "./pages/restaurant";
import CreateRestaurant from "./pages/createRestaurant";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
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
      </AuthProvider>
    </BrowserRouter>
  )
}