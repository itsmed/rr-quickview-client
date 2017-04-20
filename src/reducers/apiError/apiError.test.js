import { API_ERROR } from '../../actions';
import { apiErrorReducer } from './apiError';

test('apiErrorReducer returns state when passed  actions with types other than API_ERROR', () => {
  expect(apiErrorReducer('noodles', { type: 'FAKE_ACTION'})).toBe('noodles');
});

test('apiErrorReducer returns state when passed  actions with types other than API_ERROR', () => {
  expect(apiErrorReducer('', { type: 'ANOTHER_FAKE_ONE'})).toBe('');
});

test('apiErrorReducer returns state when passed  actions with types other than API_ERROR', () => {
  expect(apiErrorReducer(null, { type: 'BLOORGH'})).toBe(null);
});

test('returns action.payload when invoked with action.type API_ERROR', () => {
  expect(apiErrorReducer('', {
    type:  API_ERROR,
    payload: 'funky'
  })).toEqual('funky');
});

test('returns action.payload when invoked with action.type API_ERROR', () => {
  expect(apiErrorReducer('cereal', {
    type:  API_ERROR,
    payload: 'Database Error'
  })).toEqual('Database Error');
});

test('returns action.payload when invoked with action.type API_ERROR', () => {
  expect(apiErrorReducer(null, {
    type:  API_ERROR,
    payload: 'sunny'
  })).toEqual('sunny');
});
