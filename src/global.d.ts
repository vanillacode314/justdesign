declare global {
  type Not<T> = {
    [P in keyof T]?: void
  }
  /* :BREAK: */

  type Exclusive<
    T extends Record<PropertyKey, unknown>,
    U extends Record<PropertyKey, unknown>
  > = (T & Not<U>) | (U & Not<T>)
  /* :BREAK: */
}
export {}
