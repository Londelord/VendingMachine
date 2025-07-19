import { Button, Image } from "antd";
import { type Product } from "../../types.ts";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../Stores/Store.ts";
import {
  addSelectedProduct,
  removeSelectedProduct,
} from "../../Stores/Slices/ProductSlice.ts";
import {
  removeProductQuantity,
  updateProductQuantities,
} from "../../Stores/Slices/OrderSlice.ts";
import { StyledCard, StyledProperty } from "./ProductCardStyles.ts";

interface Props {
  product: Product;
}

const alt = "Нет картинки";

const ProductCard = ({ product }: Props) => {
  const dispatch = useDispatch();

  const selectedProducts = useSelector(
    (state: RootState) => state.product_brands.selectedProducts,
  );

  const isSelected = selectedProducts.some((p) => p.id === product.id);

  const handleSelect = () => {
    if (isSelected) {
      dispatch(removeSelectedProduct(product.id));
      dispatch(removeProductQuantity(product.id));
    } else {
      dispatch(addSelectedProduct(product));
      dispatch(updateProductQuantities({ id: product.id, quantity: 1 }));
    }
  };

  return (
    <StyledCard>
      <Image
        alt={alt}
        fallback="/no-image.png"
        src={product.image}
        style={{}}
      />
      <h3>{product.name}</h3>
      <StyledProperty>
        <p>Цена: {product.price} руб.</p>
      </StyledProperty>
      <StyledProperty>
        <p>Количество: {product.quantity} шт.</p>
      </StyledProperty>
      <StyledProperty>
        <Button
          disabled={product.quantity === 0}
          color={isSelected ? "green" : "orange"}
          variant={"solid"}
          onClick={handleSelect}
        >
          {isSelected ? "Выбран" : "Выбрать"}
        </Button>
      </StyledProperty>
    </StyledCard>
  );
};

export default ProductCard;
