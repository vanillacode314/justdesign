declare global {
  type Hi = {
    y: never
  }
  /* :BREAK: */

  type Test = {
    x: never
  }
  /* :BREAK: */

  type Not<T> = {
    [P in keyof T]?: never
  }
  /* :BREAK: */

  /* TYPES: Not */
  type Diff<
    T extends Record<PropertyKey, unknown>,
    U extends Record<PropertyKey, unknown>
  > = T & Not<Omit<U, keyof T>>
  /* :BREAK: */

  /* TYPES: Diff */
  type Xor<
    T extends Record<PropertyKey, unknown>,
    U extends Record<PropertyKey, unknown>
  > = Diff<T, U> | Diff<U, T>
  /* :BREAK: */
}
export {}
