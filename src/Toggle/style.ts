import styled from "styled-components";

export const InputLabel = styled.label`
  width: 60px;
  height: 30px;
  position: relative;
  display: inline-block;
`;

export const InputCheckbox = styled.input`
  width: 0;
  height: 0;
  opacity: 0;

  &:checked + span:before {
    transform: translateX(29px);
  }

  &:checked + span {
    background-color: #00c853;
  }
`;

export const InputSpan = styled.span`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  cursor: pointer;
  transition: 0.3s;
  position: absolute;
  border-radius: 30px;
  background: #2c3e50;

  &:before {
    content: "";
    left: 3px;
    width: 25px;
    height: 25px;
    bottom: 2.6px;
    transition: 0.3s;
    position: absolute;
    border-radius: 50%;
    background-color: #fff;
  }
`;
