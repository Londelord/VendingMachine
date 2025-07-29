import styled from "styled-components";
import { Col } from "antd";

export const FilterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 32px;
  margin-bottom: 20px;
  width: 100%;
  justify-content: center;
`;

export const FilterBarCol = styled(Col)`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 8px;
`

export const SliderWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 12px;
`;

export const Label = styled.div`
  position: absolute;
  top: 0;
  font-size: 12px;
  color: black;
`;

export const MinLabel = styled(Label)`
  left: 0;
`;

export const MaxLabel = styled(Label)`
  right: 0;
`;

