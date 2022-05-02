export function getArrayFromNumber(number: number): number[] {
  return Array.from(Array(number + 1).keys()).slice(1);
};