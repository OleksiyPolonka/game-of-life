import styled from "styled-components";

export const HeaderContainer = styled.div`
  display: flex;
  padding: 8px 16px;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid ${({ theme }) => theme.borderColor};
`;

export const HeaderLogo = styled.img`
  height: 50px;
`;
