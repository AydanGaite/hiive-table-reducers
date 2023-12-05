import { describe, test, expect } from 'vitest';
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';
import search, { SearchVariables } from './search';

const defaultSearchText = `Hey`;

const getValue = (searchText: string, variables: SearchVariables) =>
  pipe(
    variables,
    search({ search: searchText }),
    E.matchW(
      (error) => error,
      ({ filterBy }) => filterBy?.searchText,
    ),
  );

describe('search', () => {
  test('can search', () => {
    const variables = {
      search: ``,
    };

    expect(getValue(defaultSearchText, variables)).toStrictEqual(
      defaultSearchText,
    );
  });

  test('searching for same value returns error', () => {
    const variables = {
      filterBy: {
        searchText: defaultSearchText,
      },
    };

    expect(getValue(defaultSearchText, variables)).toBeInstanceOf(Error);
  });
});
