import { Button, InputNumber, Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { Container, Footer, Title, Total } from "./OrderPageStyles.ts";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../Stores/Store.ts";
import { removeSelectedProduct } from "../../Stores/Slices/ProductSlice.ts";
import { useEffect } from "react";
import {
  setSum,
  updateProductQuantities,
} from "../../Stores/Slices/OrderSlice.ts";
import { useNavigate } from "react-router-dom";
import type { Product } from "../../types.ts";

const OrderPage = () => {
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
  };

  const selectedProductsIsEmpty = selectedProducts.length === 0;

  useEffect(() => {
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
            src={product.image}
            alt={product.name}
            style={{ width: 48, height: 64, objectFit: "cover" }}
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
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Button onClick={() => updateQuantity(product.id, quantity - 1)}>
              -
            </Button>
            <InputNumber
              min={1}
              max={product.quantity}
              value={quantity}
              onChange={(value) =>
                updateQuantity(product.id, Number(value) || 1)
              }
            />
            <Button onClick={() => updateQuantity(product.id, quantity + 1)}>
              +
            </Button>
          </div>
        );
      },
    },
    {
      title: "Цена",
      key: "price",
      render: (selectedProduct: Product) =>
        `${
          selectedProduct.price *
          (productQuantities.find((p) => p.id === selectedProduct.id)
            ?.quantity || 0)
        } руб.`,
    },
    {
      title: "",
      key: "remove",
      render: (product: Product) => (
        <Button
          danger
          type="text"
          icon={<DeleteOutlined />}
          onClick={() => removeProduct(product.id)}
        />
      ),
    },
  ];

  return (
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

      <Footer>
        <Button color="orange" variant="solid" onClick={() => navigate("/")}>
          Вернуться
        </Button>
        <div>
          <Total>Итоговая сумма: {total} руб.</Total>
          <Button
            color="green"
            variant="solid"
            disabled={selectedProductsIsEmpty}
            style={{ marginTop: 8 }}
            onClick={() => navigate("/payment")}
          >
            Оплата
          </Button>
        </div>
      </Footer>
    </Container>
  );
};

export default OrderPage;
