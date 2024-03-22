import Box from "@mui/material/Box";
import { type Component } from "@app/types";
import { type breakpoints } from "@utils/hooks";

type ResponsiveValue<TValue> =
  | TValue
  | Partial<Record<keyof typeof breakpoints, TValue>>;

type ResponsiveProps<TProps> = Partial<{
  [Key in keyof TProps]: ResponsiveValue<TProps[Key]>;
}>;

type GridProps = ResponsiveProps<{
  columns: string | number;
  gap: string;
  rowGap: string;
  columnGap: string;
  alignItems:
    | "self-start"
    | "start"
    | "center"
    | "end"
    | "self-end"
    | "baseline";
  justifyItems: "center";
  placeItems: "center";
  backgroundColor: string;
  height: string;
  maxHeight: string;
  minHeight: string;
  width: string;
  borderRadius: string;
  marginBlock: string;
  marginBlockStart: string;
  marginBlockEnd: string;
  paddingInline: string;
  paddingInlineStart: string;
  paddingBlock: string;
  paddingBlockEnd: string;
  overflowX: "auto";
  overflowY: "auto";
  justifyContent: "center";
}>;

const Grid: Component<GridProps> = ({ columns, children, ...props }) => (
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns:
        typeof columns === "number" ? `repeat(${columns}, 1fr)` : columns,
      ...props,
    }}
  >
    {children}
  </Box>
);

type ItemProps = Partial<{
  colSpan: number;
  colStart: number;
  justifySelf: "end" | "start" | "center";
  alignSelf: "end" | "start" | "center";
}>;

const Item: Component<ItemProps> = ({
  colSpan = 1,
  colStart,
  justifySelf,
  alignSelf,
  children,
}) => (
  <Box
    sx={{
      gridColumnStart: colStart,
      gridColumnEnd: `span ${colSpan}`,
      justifySelf,
      alignSelf,
    }}
  >
    {children}
  </Box>
);

export { Grid, Item };
