import { TOGGLE_IS_FETCHING } from '../../actions';

import { isFetching } from './isFetching';

test('isFetching returns state when invoked with an unexpected action', () => {
  expect(isFetching(false, { type: 'FAKE_ACTION' })).toBe(false);
});

test('isFetching returns state when invoked with an unexpected action', () => {
  expect(isFetching(false, { type: 'ANOTHER_FAKE_ONE' })).toBe(false);
});

test('isFetching returns state when invoked with an unexpected action', () => {
  expect(isFetching(true, { type: 'AUTH_USER' })).toBe(true);
});

test('isFetching returns !state when invoked with TOGGLE_IS_FETCHING', () => {
  expect(isFetching(false, {
    type: TOGGLE_IS_FETCHING,
  })).toBe(true);
});

  test('isFetching returns !state when invoked with TOGGLE_IS_FETCHING', () => {
  expect(isFetching(true, {
    type: TOGGLE_IS_FETCHING,
  })).toBe(false);
});

  test('isFetching returns !state when invoked with TOGGLE_IS_FETCHING', () => {
  expect(isFetching(false, {
    type: TOGGLE_IS_FETCHING,
  })).toBe(true);
});