import styled from "styled-components";

export const GridCanvas = styled.canvas`
  width: 30vw;
  height: 30vw;
  cursor: pointer;
  margin-bottom: 20px;
`;

export const GridContainer = styled.div`
  display: flex;
  padding: 16px;
  align-items: center;
  flex-direction: column;
`;

export const GridButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  button {
    margin: 0 20px;
  }
`;

export const GridHeader = styled.h3`
  color: ${({ theme }) => theme.mainFontColor};
`;
