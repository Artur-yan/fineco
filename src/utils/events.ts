const supportsPassive = false;

export const wheelOpt = supportsPassive;

export const inRange = (numA: number, numB: number) => (num: number) =>
  num > numA && num < numB;

export const preventDefault = <E extends Event>(
  condition: (e?: E) => boolean,
  thenDo: (e: E) => void
) => (e: E) => {
  if (condition(e)) {
    e.preventDefault();
    thenDo(e);
  }
};
