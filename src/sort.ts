import * as E from 'fp-ts/Either';

export enum SortDirection {
  Asc = `ASC`,
  Desc = `DESC`,
}

export type SortVariables = {
  sortBy: {
    field: string;
    direction: SortDirection;
  };
};

export type SortParams<T extends string> = {
  columnId: T;
};

const sort =
  <T extends SortVariables = SortVariables, K extends string = string>({
    columnId,
  }: SortParams<K>) =>
  (prevVariables: T): E.Either<Error, T> => {
    const { sortBy } = prevVariables;

    const newDirection =
      sortBy.direction === SortDirection.Asc
        ? SortDirection.Desc
        : SortDirection.Asc;

    return E.right({
      ...prevVariables,
      sortBy: {
        field: columnId,
        direction: newDirection,
      },
    });
  };

export default sort;
