import { describe, test, expect } from 'vitest';
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';
import nextPage, { NextPageVariables } from './nextPage';

const cursor = `CURSOR`;

const getValue = (variables: NextPageVariables) =>
  pipe(
    variables,
    nextPage({ endCursor: cursor }),
    E.matchW(
      (error) => error,
      ({ page }) => page,
    ),
  );

describe('nextPage', () => {
  test('can navigate to next page', () => {
    const variables = {
      first: 20,
      page: 1,
      after: cursor,
    };

    expect(getValue(variables)).toStrictEqual(2);
  });

  test('negative page value returns error', () => {
    const variables = {
      first: 20,
      page: -1,
      after: cursor,
    };

    expect(getValue(variables)).toBeInstanceOf(Error);
  });
});
