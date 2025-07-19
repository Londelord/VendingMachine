import styled from "styled-components";
import { Button } from "antd";

export const Container = styled.div`
  padding: 40px;
  max-width: 900px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
`;

export const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 32px;
`;

export const Table = styled.div`
  display: grid;
  grid-template-columns: 1fr 150px 100px 50px;
  gap: 24px;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #eee;
`;

export const Header = styled(Table)`
  font-weight: bold;
  border-bottom: 2px solid #ddd;
`;

export const Image = styled.img`
  width: 48px;
  height: 64px;
  margin-right: 16px;
`;

export const ProductName = styled.div`
  display: flex;
  align-items: center;
`;

export const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Footer = styled.div`
  margin-top: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const YellowButton = styled(Button)`
  background: #f7c744;
  color: black;
  border: none;
  &:hover {
    background: #e6b931 !important;
  }
`;

export const GreenButton = styled(Button)`
  background: #4caf50;
  color: white;
  border: none;
  &:hover {
    background: #43a047 !important;
  }
`;

export const Total = styled.div`
  font-size: 18px;
  font-weight: bold;
`;