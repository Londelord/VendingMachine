import React from "react";
import { Button, InputNumber, Table } from "antd";
import {
  AmountText,
  BoldText,
  Container,
  Footer,
  QuantityControl,
  SummaryRow,
  Title,
} from "./PaymentPageStyles.ts";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../Stores/Store.ts";
import {
  setChange,
  updateCoinQuantity,
} from "../../Stores/Slices/OrderSlice.ts";
import type { Coin } from "../../types.ts";
import { BackendService } from "../../BackendService/BackendService.ts";
import type { PayRequest } from "../../BackendService/Contracts.ts";
import CoinIcon from "../../Components/CoinIcon/CoinIcon.tsx";
import useNotification from "antd/es/notification/useNotification";
import { ClockCircleOutlined } from "@ant-design/icons";
import axios from "axios";

const PaymentPage: React.FC = () => {
  const dispatch = useDispatch();

  const [api, contextHolder] = useNotification();

  const totalToPay = useSelector((state: RootState) => state.order.totalToPay);
  const coins = useSelector((state: RootState) => state.order.coinQuantities);
  const change = useSelector((state: RootState) => state.order.change);

  const productQuantities = useSelector(
    (state: RootState) => state.order.productQuantities,
  );

  const paidAmount = coins.reduce((sum, coin) => {
    const match = coins.find((c) => c.denomination === coin.denomination);
    const quantity = match ? match.quantity : 0;
    return sum + coin.denomination * quantity;
  }, 0);

  const handleChange = (coinId: number, value: number) => {
    dispatch(updateCoinQuantity({ denomination: coinId, quantity: value }));
  };

  const getRublesString = (denomination: number): string => {
    const lastDigit = denomination % 10;
    const lastTwoDigits = denomination % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
      return `${denomination} рублей`;
    }

    switch (lastDigit) {
      case 1:
        return `${denomination} рубль`;
      case 2:
      case 3:
      case 4:
        return `${denomination} рубля`;
      default:
        return `${denomination} рублей`;
    }
  };

  const handlePay = async () => {
    try {
      const request: PayRequest = {
        products: productQuantities,
        coins: coins,
      };

      const response = await BackendService.Pay(request);

      const responseChange = response.data;

      const updatedChange = change.map((coin) => {
        const fromServer = responseChange.find(
          (c) => c.denomination === coin.denomination,
        );
        return {
          denomination: coin.denomination,
          quantity: fromServer ? fromServer.quantity : 0,
        };
      });

      dispatch(setChange(updatedChange));

      navigate("/change");
    } catch (error) {
      let errorMessage = "Не удалось произвести оплату";

      if (axios.isAxiosError(error)) {
        if (error.response && typeof error.response.data === 'string') {
          errorMessage = error.response.data;
        }
        else if (error.request) {
          errorMessage = "Сервер не ответил на запрос";
        }
      }

      api.error({
        message: "Ошибка",
        description: errorMessage,
        placement: "bottomRight",
        icon: <ClockCircleOutlined style={{ color: "red" }} />,
        showProgress: true,
        pauseOnHover: true,
      });

      console.error(error);
    }
  };

  const navigate = useNavigate();

  return (
    <Container>
      {contextHolder}
      <Title>Оплата</Title>
      <Table
        dataSource={coins}
        pagination={false}
        rowKey="denomination"
        columns={[
          {
            title: "Номинал",
            render: (coin: Coin) => (
              <div style={{ display: "flex", gap: 16 }}>
                <CoinIcon size={36} value={coin.denomination} />
                <span style={{ margin: "auto 0" }}>
                  {getRublesString(coin.denomination)}
                </span>
              </div>
            ),
          },
          {
            title: "Количество",
            render: (coin: Coin) => (
              <QuantityControl>
                <Button
                  onClick={() =>
                    handleChange(coin.denomination, coin.quantity - 1)
                  }
                >
                  -
                </Button>
                <InputNumber
                  value={coin.quantity}
                  min={0}
                  onChange={(val) =>
                    handleChange(coin.denomination, Number(val) || 0)
                  }
                />
                <Button
                  onClick={() =>
                    handleChange(coin.denomination, coin.quantity + 1)
                  }
                >
                  +
                </Button>
              </QuantityControl>
            ),
          },
          {
            title: "Сумма",
            render: (coin: Coin) => (
              <span>{coin.denomination * coin.quantity} руб.</span>
            ),
          },
        ]}
      />
      <SummaryRow>
        <span>
          Итоговая сумма: <BoldText>{totalToPay} руб.</BoldText>
        </span>
        <span>
          Вы внесли:{"  "}
          <AmountText $isEnough={paidAmount >= totalToPay}>
            {paidAmount} руб.
          </AmountText>
        </span>
      </SummaryRow>
      <Footer>
        <Button
          color="orange"
          variant="solid"
          onClick={() => navigate("/order")}
        >
          Вернуться
        </Button>
        <Button
          color="green"
          variant="solid"
          disabled={paidAmount < totalToPay}
          onClick={() => handlePay()}
        >
          Оплатить
        </Button>
      </Footer>
    </Container>
  );
};

export default PaymentPage;
