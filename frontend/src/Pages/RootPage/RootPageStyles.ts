import styled from "styled-components";

export const StyledHeader = styled.div`
  margin: 16px;
  background: transparent;
  display: flex;
  justify-self: center;
  flex-direction: row;
  width: 60%;
  justify-content: space-around;
`;

export const FilterBarAndHeaderDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 70%;
  gap: 16px;
`;

export const NavigationButtonsDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 32px;
  gap: 16px;
`

export const StyledButton = styled.button`
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

export const ToAdminButton = styled.button`
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
