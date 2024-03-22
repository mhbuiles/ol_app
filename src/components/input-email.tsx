import type { Component } from "@app/types";
import { Input } from "@components/input";
import type { InputProps } from "@components/input";

type InputEmailProps = Omit<InputProps, "icon" | "type">;

const InputEmail: Component<InputEmailProps> = ({ ...props }) => (
  <Input {...props} type="email" />
);

export { InputEmail };
