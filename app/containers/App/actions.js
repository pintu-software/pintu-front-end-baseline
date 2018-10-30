/*
 *
 * App actions
 *
 */
import { SAVE_EIKON_USER_INFO } from './constants';

export function storeEikonUserInfo(payload) {
  return {
    type: SAVE_EIKON_USER_INFO,
    payload,
  }
}
