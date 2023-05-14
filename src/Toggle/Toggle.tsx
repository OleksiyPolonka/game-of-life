import { useState } from "react";
import { InputCheckbox, InputLabel, InputSpan } from "./style";
import { ToogleProps } from "./types";

const Toggle = ({ toggled = false, onClick }: ToogleProps) => {
  const [isToggled, toggle] = useState(toggled);

  const callback = () => {
    toggle(!isToggled);
    onClick(!isToggled);
  };

  return (
    <InputLabel>
      <InputCheckbox
        type="checkbox"
        onClick={callback}
        defaultChecked={isToggled}
      />
      <InputSpan />
    </InputLabel>
  );
};

export default Toggle;
