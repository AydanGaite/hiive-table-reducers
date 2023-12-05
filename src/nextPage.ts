import * as E from 'fp-ts/Either';
import { DEFAULT_FETCH_LIMIT } from './globals';

export type NextPageVariables = {
  first: number;
  page: number;
  after: string;
} & Record<string, unknown>;

export type NextPageParams = {
  endCursor: string;
  fetchLimit?: number;
};

const nextPage =
  <T extends NextPageVariables = NextPageVariables>({
    endCursor,
    fetchLimit = DEFAULT_FETCH_LIMIT,
  }: NextPageParams) =>
  (prevVariables: T): E.Either<Error, T> => {
    const { page } = prevVariables;

    if (page < 1) {
      return E.left(new Error('The index of page cannot be below 1'));
    }

    return E.right({
      ...prevVariables,
      first: fetchLimit,
      after: endCursor,
      page: page + 1,
    });
  };

export default nextPage;
