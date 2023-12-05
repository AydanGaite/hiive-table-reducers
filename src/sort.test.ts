import { describe, test, expect } from 'vitest';
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';
import sort, { SortDirection, SortVariables } from './sort';

const defaultColumnId = 'test';

const getValue = (columnId: 'test', variables: SortVariables) =>
  pipe(
    variables,
    sort<typeof variables, 'test'>({ columnId }),
    E.matchW(
      (error) => error,
      ({ sortBy }) => sortBy,
    ),
  );

describe('sort', () => {
  test('Sorting an asc value returns desc direction', () => {
    const variables = {
      sortBy: {
        field: defaultColumnId,
        direction: SortDirection.Asc,
      },
    };

    const value = getValue(defaultColumnId, variables);

    if (value && 'direction' in value) {
      expect(value.direction).toStrictEqual(SortDirection.Desc);
    }
  });

  test('Sorting a desc value returns asc direction', () => {
    const variables = {
      sortBy: {
        field: 'test',
        direction: SortDirection.Desc,
      },
    };

    const value = getValue(defaultColumnId, variables);

    if (value && 'direction' in value) {
      expect(value.direction).toStrictEqual(SortDirection.Asc);
    }
  });
});
