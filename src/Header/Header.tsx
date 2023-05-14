import Toggle from "../Toggle";
import { HeaderProps } from "./types";
import logo from "../assets/logo.png";
import { HeaderContainer, HeaderLogo } from "./style";

const Header = ({ onToggleClick, toggled }: HeaderProps) => (
  <HeaderContainer>
    <HeaderLogo src={logo} alt="game-of-life" />
    <Toggle toggled={toggled} onClick={onToggleClick} />
  </HeaderContainer>
);

export default Header;
