// function concatStringLikeArray<
//   T extends string[] = string[],
//   U extends string[] = string[]
// >(a: T, b: U) {
//   return [...a, ...b];
// }

function concatStringLikeArray(a: string[], b: string[]) {
  return [...a, ...b];
}

type MyString = string;

const a: MyString[] = ["hi", "world"];
const b = ["cool", "array"];

concatStringLikeArray(a, b);
