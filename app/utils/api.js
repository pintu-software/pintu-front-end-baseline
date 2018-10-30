import axios from 'axios';
import _ from 'lodash';

export function get(endpoint, payload, auth = null) {
  const authHeaders = { headers: { Authorization: `Bearer ${auth}` } };
  const getFunc = auth ? axios.get(endpoint, authHeaders) : axios.get(endpoint);

  return getFunc.then(response => response).catch(error => {
    throw error.response;
  });
}

export async function post(endpoint, payload, auth = null) {
  const authHeaders = { headers: { Authorization: `Bearer ${auth}` } };
  const postFunc = auth
    ? axios.post(endpoint, payload, authHeaders)
    : axios.post(endpoint, payload);

  return postFunc.then(response => response).catch(error => {
    throw error.response;
  });
}
