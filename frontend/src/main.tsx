import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import RootPage from "./Pages/RootPage/RootPage.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminPage from "./Pages/AdminPage/AdminPage.tsx";
import { Provider } from "react-redux";
import { store } from "./Stores/Store.ts";
import OrderPage from "./Pages/OrderPage/OrderPage.tsx";
import PaymentPage from "./Pages/PaymentPage/PaymentPage.tsx";
import ChangePage from "./Pages/ChangePage/ChangePage.tsx";
import WaitingPage from "./Pages/WaitingPage/WaitingPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<RootPage />} />
          <Route path={"/admin"} element={<AdminPage />} />
          <Route path={"/order"} element={<OrderPage />} />
          <Route path={"/payment"} element={<PaymentPage />} />
          <Route path={"/change"} element={<ChangePage />} />
          <Route path={"/waiting"} element={<WaitingPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
