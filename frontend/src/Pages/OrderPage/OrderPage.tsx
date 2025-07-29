import { Button, ConfigProvider, Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import {
  Container,
  StyledFooter,
  GreenButton,
  StyledIncButton,
  StyledInputNumber,
  Title,
  Total,
  YellowButton,
  StyledButtonsDiv,
} from "./OrderPageStyles.ts";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../Stores/Store.ts";
import { removeSelectedProduct } from "../../Stores/Slices/ProductSlice.ts";
import { useEffect } from "react";
import {
  removeProductQuantity,
  setSum,
  updateProductQuantities,
} from "../../Stores/Slices/OrderSlice.ts";
import { useNavigate } from "react-router-dom";
import type { Product } from "../../types.ts";
import useLock from "../../Hooks/UseLock.ts";

const OrderPage = () => {
  useLock();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectedProducts = useSelector(
    (state: RootState) => state.product_brands.selectedProducts,
  );

  const productQuantities = useSelector(
    (state: RootState) => state.order.productQuantities,
  );
  const total = useSelector((state: RootState) => state.order.totalToPay);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (
      newQuantity > 0 &&
      newQuantity <= (selectedProducts.find((p) => p.id === id)?.quantity || 0)
    ) {
      dispatch(updateProductQuantities({ id, quantity: newQuantity }));
    }
  };

  const removeProduct = (id: number) => {
    dispatch(removeSelectedProduct(id));
    dispatch(removeProductQuantity(id));
  };

  const selectedProductsIsEmpty = selectedProducts.length === 0;

  useEffect(() => {
    console.log(productQuantities);
    const total = selectedProducts.reduce((sum, product) => {
      const match = productQuantities.find((q) => q.id === product.id);
      const quantity = match ? match.quantity : 0;
      return sum + product.price * quantity;
    }, 0);

    dispatch(setSum(total));
  }, [productQuantities, selectedProducts, dispatch]);

  const columns = [
    {
      title: "Товар",
      key: "name",
      render: (product: Product) => (
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <img
            src={product.imageUrl}
            alt={product.name}
            style={{
              width: 48,
              height: 64,
              objectFit: "cover",
              marginRight: 16,
            }}
          />
          <span>{product.name}</span>
        </div>
      ),
    },
    {
      title: "Количество",
      key: "quantity",
      render: (product: Product) => {
        const quantity =
          productQuantities.find((q) => q.id === product.id)?.quantity ?? 1;

        return (
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <StyledIncButton
              onClick={() => updateQuantity(product.id, quantity - 1)}
            >
              -
            </StyledIncButton>
            <StyledInputNumber
              min={1}
              max={product.quantity}
              value={quantity}
              onChange={(value) =>
                updateQuantity(product.id, Number(value) || 1)
              }
            />
            <StyledIncButton
              onClick={() => updateQuantity(product.id, quantity + 1)}
            >
              +
            </StyledIncButton>
          </div>
        );
      },
    },
    {
      title: "Цена",
      key: "price",
      render: (selectedProduct: Product) => (
        <strong style={{ fontSize: 16 }}>
          {selectedProduct.price *
            (productQuantities.find((p) => p.id === selectedProduct.id)
              ?.quantity || 0)}{" "}
          руб.
        </strong>
      ),
    },
    {
      title: "",
      key: "remove",
      render: (product: Product) => (
        <Button
          type="text"
          icon={<DeleteOutlined />}
          onClick={() => removeProduct(product.id)}
          style={{ fontSize: 20 }}
        />
      ),
    },
  ];

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            fontFamily: "cursive, sans-serif",
          },
          components: {
            Table: {
              headerBg: "transparent",
              headerSplitColor: "transparent",
            },
          },
        }}
      >
        <Container>
          <Title>Оформление заказа</Title>
          {!selectedProductsIsEmpty ? (
            <Table
              dataSource={selectedProducts}
              rowKey="id"
              columns={columns}
              pagination={false}
            />
          ) : (
            <div>
              <Title>
                У вас нет ни одного товара, вернитесь на страницу каталога
              </Title>
            </div>
          )}

          <StyledFooter>
            <Total>
              Итоговая сумма: <strong>{total} руб.</strong>
            </Total>
            <StyledButtonsDiv>
              <YellowButton onClick={() => navigate("/")}>
                Вернуться
              </YellowButton>
              <GreenButton
                disabled={selectedProductsIsEmpty}
                onClick={() => navigate("/payment")}
              >
                Оплата
              </GreenButton>
            </StyledButtonsDiv>
          </StyledFooter>
        </Container>
      </ConfigProvider>
    </>
  );
};

export default OrderPage;
