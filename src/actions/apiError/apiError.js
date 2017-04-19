import { API_ERROR } from '../types';

export function apiError(message) {
  return {
    type: API_ERROR,
    payload: message
  }
}