import styled from "styled-components";
import { Card } from "antd";

export const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 16px;
  width: 250px;
  gap: 8px;
`;

export const StyledImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: contain;
`

export const StyledProperty = styled("div")`
  gap: 16px;
  margin-top: 8px;
`;