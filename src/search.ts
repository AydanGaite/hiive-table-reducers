import { pipe } from 'fp-ts/function';
import * as E from 'fp-ts/Either';
import { DEFAULT_FETCH_LIMIT, DEFAULT_PAGE } from './globals';

export type SearchVariables = {
  filterBy?: {
    searchText?: string;
  };
} & Record<string, unknown>;

export type SearchParams = {
  search: string;
  defaultPage?: number;
  fetchLimit?: number;
};

const isNewSearchTerm = (search: string, prevSearch: string) =>
  search !== prevSearch;

const resetKeysOnNewSearch =
  <T extends SearchVariables = SearchVariables>({
    search,
    defaultPage = DEFAULT_PAGE,
    fetchLimit = DEFAULT_FETCH_LIMIT,
  }: SearchParams) =>
  (prevVariables: T): E.Either<Error, T> =>
    isNewSearchTerm(search, prevVariables.filterBy?.searchText ?? ``)
      ? E.right({
          ...prevVariables,
          page: defaultPage,
          first: fetchLimit,
          last: undefined,
          before: undefined,
          after: undefined,
          filterBy: {
            searchText: search,
          },
        })
      : E.left(
          new Error(
            `The search term provided is the same as the previous value`,
          ),
        );

const search =
  <T extends SearchVariables = SearchVariables>(params: SearchParams) =>
  (prevVariables: T): E.Either<Error, T> =>
    pipe(prevVariables, resetKeysOnNewSearch(params));

export default search;
