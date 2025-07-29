import styled from "styled-components";


export const Container = styled.div`
  padding: 24px;
`;

export const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 16px;
`;

export const CoinList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const CoinRow = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
  font-size: 18px;
`;

export const YellowButton = styled.button`
  background-color: #edd103;
  color: black;
  border-color: transparent;
  padding: 8px 64px;
  transition: background-color 0.3s ease;
  font-weight: bold;

  &:hover {
    background-color: #d4bb01;
  }
`