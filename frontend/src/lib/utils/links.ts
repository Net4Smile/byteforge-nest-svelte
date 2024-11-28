export function createLink(...args: any[]) {
  return "/" + args.join('/').toLowerCase().replaceAll(" ", '-');
}

type NormalizeResult<T> = T extends string ? string : undefined;

type NormalizeArgs = (string | undefined)[];

type NormalizedArray<T extends NormalizeArgs> = {
  [K in keyof T]: NormalizeResult<T[K]>
};

export function normalizeLink<T extends NormalizeArgs>(
  ...args: T
): NormalizedArray<T> {
  return args.map(arg =>
    arg === undefined ? undefined : arg.replaceAll("-", ' ').capitalize()
  ) as NormalizedArray<T>;
}
