"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";

const PasswordInput = (
  props: Omit<React.ComponentProps<"input">, "type">,
) => {
  const [visible, setVisible] = useState(false);

  return (
    <InputGroup>
      <InputGroupInput type={visible ? "text" : "password"} {...props} />
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          size="icon-xs"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? <EyeOff /> : <Eye />}
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
};

export default PasswordInput;
