import { ReactNode, useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";

enum CUSTOM_BUTTON_THEME {
  MAIN,
  SECONDARY,
}

interface CustomButtonProps {
  disabled?: boolean;
  onClick: () => void;
  children: ReactNode;
  buttonTheme?: CUSTOM_BUTTON_THEME;
}

type ButtonProps = {
  buttonTheme: CUSTOM_BUTTON_THEME;
};

type CircleEffectProps = {
  top: number;
  left: number;
};

const clickEffectAnimation = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(25);
    opacity: 0.375;
  }
  100% {
    transform: scale(50);
    opacity: 0;
  }
`;

const Button = styled.button<ButtonProps>`
  position: relative;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: background-color 0.3s;

  ${(props) =>
    props.buttonTheme === CUSTOM_BUTTON_THEME.MAIN
      ? css`
          background-color: ${props.theme.mainButtonColor};
          color: #fff;
        `
      : css`
          background-color: ${props.theme.secondaryButtonColor};
          color: #fff;
        `}

  ${(props) =>
    props.disabled &&
    css`
      background-color: ${props.theme.disabledButtonColor};
      color: #888;
      cursor: not-allowed;
    `}
`;

const CircleEffect = styled.div<CircleEffectProps>`
  width: 20px;
  height: 20px;
  position: absolute;
  background: rgba(255, 255, 255, 0.7);
  display: block;
  content: "";
  border-radius: 9999px;
  opacity: 1;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  animation: 0.9s ease 1 forwards ${clickEffectAnimation};
`;

const CustomButton = ({
  onClick,
  children,
  disabled = false,
  buttonTheme = CUSTOM_BUTTON_THEME.MAIN,
}: CustomButtonProps) => {
  const [effectPosition, setEffectPosition] = useState({ top: -1, left: -1 });
  const [isRippling, setIsRippling] = useState(false);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const buttonElement = event.currentTarget as HTMLButtonElement;
    const buttonRect = buttonElement.getBoundingClientRect();
    const clickPosition = {
      top: event.clientY - buttonRect.top,
      left: event.clientX - buttonRect.left,
    };
    setEffectPosition(clickPosition);
    onClick();
  };

  useEffect(() => {
    if (effectPosition.top !== -1 && effectPosition.left !== -1) {
      setIsRippling(true);
      setTimeout(() => setIsRippling(false), 300);
    } else setIsRippling(false);
  }, [effectPosition]);

  useEffect(() => {
    if (!isRippling) setEffectPosition({ top: -1, left: -1 });
  }, [isRippling]);

  return (
    <Button buttonTheme={buttonTheme} disabled={disabled} onClick={handleClick}>
      {children}
      {isRippling && (
        <CircleEffect top={effectPosition.top} left={effectPosition.left} />
      )}
    </Button>
  );
};

export default CustomButton;
