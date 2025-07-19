import { IconDiv } from "./CoinIconStyles.ts";

interface Props {
  size: number;
  value: number;
}

const CoinIcon = ({size, value} : Props) => {
  return (
    <IconDiv size={size} children={value} />
  );
};

export default CoinIcon;