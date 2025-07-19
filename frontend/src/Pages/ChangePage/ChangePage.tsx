import CoinIcon from "../../Components/CoinIcon/CoinIcon.tsx";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../Stores/Store.ts";
import { Button, Divider } from "antd";
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
import { CoinList, CoinRow, Container, Title } from "./ChangePageStyles.ts";

const ChangePage = () => {
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
      <Divider />
      <Title style={{ marginBottom: 32 }}>Ваши монеты:</Title>

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
      <Button
        style={{ marginTop: 32 }}
        variant={"solid"}
        color={"orange"}
        onClick={() => toRootPath()}
      >
        Каталог напитков
      </Button>
    </Container>
  );
};

export default ChangePage;
