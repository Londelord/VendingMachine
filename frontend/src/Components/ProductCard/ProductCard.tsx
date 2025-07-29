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
import {
  StyledButton,
  StyledCard,
  StyledImage,
  StyledProperty,
} from "./ProductCardStyles.ts";

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
  const isOutOfStock = product.quantity === 0;

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
      <StyledImage alt={alt} src={product.imageUrl || "/no-image.png"} />
      <h3>{product.name}</h3>
      <StyledProperty>
        <p>Цена: {product.price} руб.</p>
      </StyledProperty>
      <StyledProperty>
        <p>Количество: {product.quantity} шт.</p>
      </StyledProperty>
      <StyledProperty>
        <StyledButton
          disabled={isOutOfStock}
          onClick={handleSelect}
          $isSelected={isSelected}
        >
          {isOutOfStock ? "Закончился" : isSelected ? "Убрать" : "Выбрать"}
        </StyledButton>
      </StyledProperty>
    </StyledCard>
  );
};

export default ProductCard;
