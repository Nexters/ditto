type SnakeToCamelCaseConvert<S extends string> = S extends `${infer T}_${infer U}`
  ? `${T}${Capitalize<SnakeToCamelCaseConvert<U>>}`
  : S;

export type SnakeToCamelCase<T> = T extends Record<string, unknown>
  ? {
      [K in keyof T as SnakeToCamelCaseConvert<K & string>]: SnakeToCamelCase<T[K]>;
    }
  : T;
