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
`;

export const StyledProperty = styled("div")`
  gap: 16px;
  margin-top: 8px;
`;

export const StyledButton = styled.button<{ $isSelected: boolean }>`
  background-color: ${({ $isSelected }) =>
    $isSelected ? "#25ae02" : "#edd103"};
  color: ${({ $isSelected }) =>
    $isSelected ? "white" : "black"};;
  border-radius: 0;
  width: 100%;
  border-color: transparent;
  padding: 8px 32px;

  transition: background-color 0.3s ease, color 0.3s ease;

  &:not(:disabled):hover {
    background-color: ${({ $isSelected }) =>
      $isSelected ? "#2ad102" : "#d4bb01"};
    color: ${({ $isSelected }) =>
      $isSelected ? "white" : "black"};
  }

  &:disabled { 
    background-color: #d3d3d3;
    color: #888;
    cursor: not-allowed;
  }
`;
