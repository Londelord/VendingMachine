import styled from "styled-components";

export const Container = styled.div`
  max-width: 720px;
  margin: 40px auto;
  padding: 24px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  font-family: sans-serif;
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
  color: ${props => props.$isEnough ? 'green' : 'red'};
`;