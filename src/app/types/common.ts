import type { AxiosError } from "axios";

type Component<Props = Record<string, unknown>> = React.FC<
  React.PropsWithChildren<Props>
>;

type VoidComponent<Props = Record<string, unknown>> = React.FC<Props>;

type Maybe<TType> =
  TType extends Record<string, unknown>
    ? {
        [Key in keyof TType]?: TType[Key] | null;
      }
    : TType | null | undefined;

type Page<TData> = {
  meta: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    itemCount: number;
    page: number;
    pageCount: number;
    take: number;
  };
  data: Array<TData>;
};

// To handle responses
type Response<TData> = {
  model: TData;
};

type Error = AxiosError<{
  message: string | Array<string> | null;
  didError: true;
  typeMessage: string;
  statusCode: string;
}>;

// Convert cases

// Came to Snake
type CamelToSnakeKey<Key extends string> =
  Key extends `${infer First}${infer Rest}`
    ? `${First extends Capitalize<First>
        ? "_"
        : ""}${Lowercase<First>}${CamelToSnakeKey<Rest>}`
    : Key;

type CamelToSnake<TType> = {
  [Key in keyof TType as CamelToSnakeKey<Key & string>]: TType[Key];
};

// Snake to Camel
type SnakeToCamelCaseKey<S extends string> = S extends `${infer A}_${infer B}`
  ? `${Lowercase<A>}${Capitalize<Lowercase<B>>}`
  : S;

type SnakeToCamel<TType> = {
  [Key in keyof TType as Key extends string
    ? SnakeToCamelCaseKey<Key>
    : never]: TType[Key];
};

export type {
  Component,
  Maybe,
  Response,
  Error,
  Page,
  VoidComponent,
  CamelToSnake,
  SnakeToCamel,
};
