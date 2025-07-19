import { Image, InputNumber } from "antd";
import type { Product } from "../../types.ts";
import type { UpdateProductRequest } from "../../BackendService/Contracts.ts";
import { StyledCard, StyledProperty } from "./AdminCardStyles.ts";

interface Props {
  product: Product;
  onInputChange: (editedProduct: UpdateProductRequest) => void;
}

const alt = "Нет картинки";

const AdminCard = ({ product, onInputChange }: Props) => {
  const handlePriceChange = (value: number | null) => {
    if (value !== null) {
      onInputChange({
        ...product,
        price: value,
      });
    }
  };

  const handleQuantityChange = (value: number | null) => {
    if (value !== null) {
      onInputChange({
        ...product,
        quantity: value,
      });
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
        <p>Цена: </p>
        <InputNumber
          min={0}
          defaultValue={product.price}
          onChange={handlePriceChange}
        />
      </StyledProperty>
      <StyledProperty>
        <p>Количество: </p>
        <InputNumber
          min={0}
          defaultValue={product.quantity}
          onChange={handleQuantityChange}
        />
      </StyledProperty>
    </StyledCard>
  );
};

export default AdminCard;
