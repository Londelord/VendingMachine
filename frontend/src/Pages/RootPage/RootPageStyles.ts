import styled from "styled-components";
import { Header } from "antd/es/layout/layout";
import { Button } from "antd";

export const StyledHeader = styled(Header)`
  background: transparent;
  margin: -8px;
  display: flex;
  flex-direction: row;
  justify-items: center;
`;

export const ToAdminButton = styled(Button)`
  margin-left: auto;
  margin-top: auto;
`;