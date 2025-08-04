import styled from "styled-components";
import { Card } from "antd";

export const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  padding: 4px;
  width: 250px;
  gap: 8px;
  border: 1px solid #ccc;
  border-radius: 0;
`;

export const StyledImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: contain;
`

export const StyledProperty = styled("div")`
  display: flex;
  flex-direction: row;
  gap: 16px;
  margin-top: 8px;
  justify-content: end;
  align-items: center;
`;