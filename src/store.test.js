import store from './store';

test('initial state', (done) => {
  expect(store.getState()).toBe({
    isFetching: false,
  })
  done()
})