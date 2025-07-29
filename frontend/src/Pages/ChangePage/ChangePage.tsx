import CoinIcon from "../../Components/CoinIcon/CoinIcon.tsx";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../Stores/Store.ts";
import { useNavigate } from "react-router-dom";
import { setSelectedBrand } from "../../Stores/Slices/FilterSlicer.ts";
import {
  clearChange,
  clearCoinQuantities,
  setSum,
} from "../../Stores/Slices/OrderSlice.ts";
import {
  setProducts,
  setSelectedProducts,
} from "../../Stores/Slices/ProductSlice.ts";
import { BackendService } from "../../BackendService/BackendService.ts";
import {
  CoinList,
  CoinRow,
  Container,
  Title,
  YellowButton,
} from "./ChangePageStyles.ts";
import { ConfigProvider } from "antd";
import useLock from "../../Hooks/UseLock.ts";

const ChangePage = () => {
  useLock();

  const dispatch = useDispatch();
  const change = useSelector((state: RootState) => state.order.change);
  const navigate = useNavigate();

  const toRootPath = async () => {
    dispatch(setSelectedBrand(null));
    dispatch(setSum(0));
    dispatch(setSelectedProducts([]));
    dispatch(clearChange());
    dispatch(clearCoinQuantities());
    const newProductList = await BackendService.GetAllProducts();
    dispatch(setProducts(newProductList));
    navigate("/");
  };

  return (
    <Container style={{ justifyItems: "center", textAlign: "center" }}>
      <ConfigProvider
        theme={{
          token: { fontFamily: "cursive, sans-serif" },
        }}
      >
        <Title>Спасибо за покупку!</Title>
        <Title>
          Пожалуйста, возьмите вашу сдачу:{" "}
          <span style={{ color: "green" }}>
            {change.reduce(
              (sum, coin) => sum + coin.denomination * coin.quantity,
              0,
            )}{" "}
            руб.
          </span>
        </Title>
        <Title style={{ margin: "64px 0 32px 0" }}>Ваши монеты:</Title>

        <CoinList>
          {change.length === 0 ? (
            <div>Сдачи нет</div>
          ) : (
            change.map((coin) => (
              <CoinRow key={coin.denomination}>
                <CoinIcon size={64} value={coin.denomination} />
                <span>{coin.quantity} шт.</span>
              </CoinRow>
            ))
          )}
        </CoinList>
        <YellowButton style={{ marginTop: 32 }} onClick={() => toRootPath()}>
          Каталог напитков
        </YellowButton>
      </ConfigProvider>
    </Container>
  );
};

export default ChangePage;
