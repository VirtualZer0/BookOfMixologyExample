export type StringRange<N extends number, Result extends Array<unknown> = [1]> = Result['length'] extends N
  ? [...Result, `${Result['length']}`]
  : StringRange<N, [...Result, `${Result['length']}`]>;
