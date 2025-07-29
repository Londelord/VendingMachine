import styled from "styled-components";
import { InputNumber } from "antd";

export const Container = styled.div`
  padding: 40px;
  max-width: 900px;
  margin: 0 auto;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

export const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
  font-size: 18px;
`;

export const BoldText = styled.span`
  font-weight: bold;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 32px;
`;

export const AmountText = styled.span<{ $isEnough: boolean }>`
  color: ${(props) => (props.$isEnough ? "green" : "#c80000")};
  font-weight: bold;
`;

export const StyledInputNumber = styled(InputNumber)`
  border-radius: 0;
  text-align: center;
  border: 1px solid #ccc;
`;

export const StyledIncButton = styled.button`
  background-color: #1e1e1e;
  color: white;
  border: none;
  font-size: 16px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const GreenButton = styled.button`
  background-color: #25ae02;
  color: white;
  border-color: transparent;
  padding: 8px 0;
  width: 25%;
  transition: background-color 0.3s ease;
  font-size: 14px;

  &:not(:disabled):hover {
    background-color: #2ad102;
  }

  &:disabled {
    background-color: #d3d3d3;
    color: #888;
    cursor: not-allowed;
  }
`;

export const YellowButton = styled.button`
  background-color: #edd103;
  color: black;
  border-color: transparent;
  width: 25%;
  padding: 8px 0;
  transition: background-color 0.3s ease;
  font-size: 14px;

  &:hover {
    background-color: #d4bb01;
  }
`;
