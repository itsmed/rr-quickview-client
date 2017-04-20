import { UPDATE_SEARCH_CATEGORY } from '../../actions';
import { updateSearchCategory } from './updateSearchCategory';

test('updateSearchCategory returns state when passed an action with type other than UPDATE_SEARCH_CATEGORY', () => {
  expect(updateSearchCategory('users', { type: 'FAKE_ACTION'})).toBe('users');
});

test('updateSearchCategory returns state when passed an action with type other than UPDATE_SEARCH_CATEGORY', () => {
  expect(updateSearchCategory('users', { type: 'UNAUTH_USER'})).toBe('users');
});

test('updateSearchCategory returns state when passed an action with type other than UPDATE_SEARCH_CATEGORY', () => {
  expect(updateSearchCategory('transaction', { type: 'TOGGLE_IS_FETCHING'})).toBe('transaction');
});

test('updateSearchCategory returns the action.payload when passed an action with type UPDATE_SEARCH_CATEGORY', () => {
  expect(updateSearchCategory('users', {
    type: UPDATE_SEARCH_CATEGORY,
    payload: 'transactions'
  })).toBe('transactions');
});

test('updateSearchCategory returns the action.payload when passed an action with type UPDATE_SEARCH_CATEGORY', () => {
  expect(updateSearchCategory('transactions', {
    type: UPDATE_SEARCH_CATEGORY,
    payload: 'transactions'
  })).toBe('transactions');
});

test('updateSearchCategory returns the action.payload when passed an action with type UPDATE_SEARCH_CATEGORY', () => {
  expect(updateSearchCategory('users', {
    type: UPDATE_SEARCH_CATEGORY,
    payload: 'philosophy'
  })).toBe('philosophy');
});