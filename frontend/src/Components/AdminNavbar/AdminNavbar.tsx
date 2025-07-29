import {
  Button,
  Form,
  type FormProps,
  Input,
  InputNumber,
  notification,
  Select,
  Space,
} from "antd";
import { BackendService } from "../../BackendService/BackendService.ts";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../Stores/Store.ts";
import type { AddProductRequest } from "../../BackendService/Contracts.ts";
import {
  setEditedProducts,
  setIsProductEdited,
} from "../../Stores/Slices/AdminPageSlice.ts";
import { setProducts } from "../../Stores/Slices/ProductSlice.ts";
import { CheckCircleOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { MainDiv } from "./AdminNavbarStyles.ts";

const AdminNavbar = () => {
  const dispatch = useDispatch();

  const [api, contextHolder] = notification.useNotification();

  const brands = useSelector((state: RootState) => state.product_brands.brands);
  const isEdited = useSelector(
    (state: RootState) => state.admin_page.productIsEdited,
  );
  const editedProducts = useSelector(
    (state: RootState) => state.admin_page.editedProducts,
  );

  const onFinish: FormProps<AddProductRequest>["onFinish"] = async (
    addProductRequest,
  ) => {
    try {
      await BackendService.AddProduct(addProductRequest);
      const updatedProducts = await BackendService.GetAllProducts();
      dispatch(setProducts(updatedProducts));
      api.success({
        message: "Продукт добавлен",
        description: "Новый продукт успешно добавлен в систему",
        placement: "bottomRight",
        icon: <CheckCircleOutlined style={{ color: "green" }} />,
        showProgress: true,
        pauseOnHover: true,
      });
    } catch (error) {
      console.error(error);
      api.error({
        message: "Ошибка",
        description: "Не удалось добавить продукт",
        placement: "bottomRight",
        icon: <ClockCircleOutlined style={{ color: "red" }} />,
        showProgress: true,
        pauseOnHover: true,
      });
    }
  };

  const onConfirmEditing = async () => {
    await BackendService.UpdateProducts(editedProducts);
    dispatch(setIsProductEdited(false));
    dispatch(setEditedProducts([]));
    const updatedProducts = await BackendService.GetAllProducts();
    dispatch(setProducts(updatedProducts));
  };

  return (
    <MainDiv>
      {contextHolder}
      <Form<AddProductRequest>
        onFinish={onFinish}
        style={{
          border: "1px solid #ededed",
          padding: "24px",
          borderRadius: 16,
        }}
      >
        <Space direction="vertical">
          <h1>Добавить продукт</h1>
          <Form.Item
            name={"name"}
            label="Название продукта"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={"price"}
            label="Цена продукта"
            rules={[{ required: true }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name={"quantity"}
            label="Количество"
            rules={[{ required: true }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name={"imageUrl"}
            label="Url картинки"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={"brandId"}
            label="Бренд"
            rules={[{ required: true }]}
          >
            <Select
              options={brands.map((brand) => ({
                label: brand.name,
                value: brand.id,
              }))}
              placeholder={"Выберите бренд"}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Добавить
            </Button>
          </Form.Item>
        </Space>
      </Form>
      <Button onClick={onConfirmEditing} disabled={!isEdited} type="primary">
        Подтвердить изменения
      </Button>
    </MainDiv>
  );
};

export default AdminNavbar;
