export type Validator<T> = (input: any) => T | null;

export type ValidationSchema<T> = {
  [Property in keyof T]: Validator<T[Property]>;
}