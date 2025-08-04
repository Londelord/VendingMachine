import styled from "styled-components";
import { Form } from "antd";
import type { AddProductRequest } from "../../BackendService/Contracts.ts";

export const StyledForm = styled(Form<AddProductRequest>)`
  padding: 24px;
  border: 1px solid #ccc;
  border-radius: 0;
`

export const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const StyledGreenButton = styled.button`
  background-color: #25ae02;
  color: white;
  border-color: transparent;
  padding: 8px 48px;
  transition: background-color 0.3s ease;
  font-family: cursive, sans-serif;
  font-size: 14px;
  margin-top: 16px;
  width: 100%;

  &:not(:disabled):hover {
    background-color: #2ad102;
  }

  &:disabled {
    background-color: #d3d3d3;
    color: #888;
    cursor: not-allowed;
  }
`;