import ProductCard from "../ProductCard/ProductCard.tsx";
import { useSelector } from "react-redux";
import type { RootState } from "../../Stores/Store.ts";
import Title from "antd/es/typography/Title";
import { MainDiv, StyledCol, StyledRow } from "./CardListStyles.ts";

const CardList = () => {
  const filteredProducts = useSelector(
    (state: RootState) => state.filter.filteredProducts,
  );

  return filteredProducts.length > 0 ? (
    <MainDiv>
      <StyledRow gutter={[16, 16]}>
        {filteredProducts.map((product) => (
          <StyledCol key={product.id} xs={24} sm={12} md={8} lg={6} xl={6}>
            <ProductCard product={product} />
          </StyledCol>
        ))}
      </StyledRow>
    </MainDiv>
  ) : (
    <div style={{ textAlign: "center" }}>
      <Title level={1}>Нет продуктов</Title>
    </div>
  );
};

export default CardList;
