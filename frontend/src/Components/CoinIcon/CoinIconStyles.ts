import styled from "styled-components";

export const IconDiv = styled.div<{ size: number }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 50%;
  margin: auto 0;
  background-color: #e6e6e6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  border: 1px solid black;
`;