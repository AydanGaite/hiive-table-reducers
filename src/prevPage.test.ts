import { describe, test, expect } from 'vitest';
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';
import prevPage, { PrevPageVariables } from './prevPage';

const cursor = `CURSOR`;

const getValue = (variables: PrevPageVariables) =>
  pipe(
    variables,
    prevPage({ startCursor: cursor }),
    E.matchW(
      (error) => error,
      ({ page }) => page,
    ),
  );

describe('prevPage', () => {
  test('can navigate to prev page', () => {
    const variables = {
      last: 20,
      page: 2,
      before: cursor,
    };

    expect(getValue(variables)).toStrictEqual(1);
  });

  test('negative page value returns error', () => {
    const variables = {
      last: 20,
      page: -1,
      before: cursor,
    };

    expect(getValue(variables)).toBeInstanceOf(Error);
  });

  test('traveling to page below 0 returns error', () => {
    const variables = {
      last: 20,
      page: 1,
      before: cursor,
    };

    expect(getValue(variables)).toBeInstanceOf(Error);
  });
});
