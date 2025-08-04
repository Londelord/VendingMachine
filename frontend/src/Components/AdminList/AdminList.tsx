import AdminCard from "../AdminCard/AdminCard.tsx";
import type { AppDispatch, RootState } from "../../Stores/Store.ts";
import { useDispatch, useSelector } from "react-redux";
import {
  setEditedProducts,
  setIsProductEdited,
} from "../../Stores/Slices/AdminPageSlice.ts";
import type { UpdateProductRequest } from "../../BackendService/Contracts.ts";
import { MainDiv, StyledCol, StyledRow } from "./AdminListStyles.ts";
import Title from "antd/es/typography/Title";

const AdminList = () => {
  const dispatch: AppDispatch = useDispatch();

  const products = useSelector(
    (state: RootState) => state.product_brands.products,
  );
  const editedProducts = useSelector(
    (state: RootState) => state.admin_page.editedProducts,
  );

  const AddEditedProduct = (product: UpdateProductRequest) => {
    dispatch(setIsProductEdited(true));

    const updatedProducts = editedProducts.some((p) => p.id === product.id)
      ? editedProducts.map((p) => (p.id === product.id ? product : p))
      : [...editedProducts, product];

    dispatch(setEditedProducts(updatedProducts));
  };

  return products.length > 0 ? (
    <MainDiv>
      <StyledRow gutter={[8, 16]} >
        {products.map((product) => (
          <StyledCol key={product.id} xs={24} sm={12} md={8} lg={6} xl={6}>
            <AdminCard product={product} onInputChange={AddEditedProduct} />
          </StyledCol>
        ))}
      </StyledRow>
    </MainDiv>
  ) : (
    <div style={{ width: "75%", textAlign: "center" }}>
      <Title level={1}>Нет продуктов</Title>
    </div>
  );
};

export default AdminList;
