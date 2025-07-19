import styled from "styled-components";
import { Card } from "antd";

export const StyledCard = styled(Card)`
  padding: 16px;
  width: 250px;
  gap: 8px;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
  
`;

export const StyledProperty = styled("div")`
  gap: 16px;
  margin-top: 8px;
`;