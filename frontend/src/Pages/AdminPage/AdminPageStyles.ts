import styled from "styled-components";
import { Header } from "antd/es/layout/layout";

export const StyledHeader = styled(Header)`
  background: transparent;
  display: flex;
  gap: 16px;
`;

export const MainDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
`;

export const StyledGreenButton = styled.button`
  background-color: #25ae02;
  color: white;
  border-color: transparent;
  padding: 8px 48px;
  transition: background-color 0.3s ease;
  font-family: cursive, sans-serif;
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

export const ToRootButton = styled.button`
  background-color: #cfcfcf;
  color: black;
  border-color: transparent;
  padding: 8px 48px;
  transition: background-color 0.3s ease;
  font-family: cursive, sans-serif;
  font-size: 14px;

  &:hover {
    background-color: #939393;
  }

`;