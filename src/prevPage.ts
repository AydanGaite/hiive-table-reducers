import * as E from 'fp-ts/Either';
import { DEFAULT_FETCH_LIMIT } from './globals';

export type PrevPageVariables = {
  last: number;
  page: number;
  before: string;
} & Record<string, unknown>;

export type PrevPageParams = {
  startCursor: string;
  fetchLimit?: number;
};

const prevPage =
  <T extends PrevPageVariables = PrevPageVariables>({
    startCursor,
    fetchLimit = DEFAULT_FETCH_LIMIT,
  }: PrevPageParams) =>
  (prevVariables: T): E.Either<Error, T> => {
    const { page } = prevVariables;

    if (page < 1) {
      return E.left(
        new Error('A transformation cannot occur on a page below 1'),
      );
    }

    if (page - 1 <= 0) {
      return E.left(
        new Error('Cannot travel to a page lower than or equal to 0'),
      );
    }

    return E.right({
      ...prevVariables,
      last: fetchLimit,
      before: startCursor,
      page: page - 1,
    });
  };

export default prevPage;
