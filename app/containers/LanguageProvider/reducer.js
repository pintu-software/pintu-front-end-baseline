/*
 *
 * LanguageProvider reducer
 *
 */

import { CHANGE_LOCALE } from './constants';
import { DEFAULT_LOCALE } from '../../i18n'; // eslint-disable-line

export const initialState = {
  locale: DEFAULT_LOCALE,
};

function languageProviderReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_LOCALE:
      return action.locale;
    default:
      return state;
  }
}

export default languageProviderReducer;
