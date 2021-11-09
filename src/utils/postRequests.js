const baseURL = 'https://my-worker.priyadarshan.workers.dev/';

export const postRequest = (endpoint = '') => async (body = {}) => {
  const response = await fetch(`${baseURL}${endpoint}`, {
    "method": "POST",
    "headers": {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
  const jsonR = await response.json();
  return jsonR;
};

export const getRequest = (endpoint = '') => async () => {
  const resp = await fetch(`${baseURL}${endpoint}`);
  const postsResp = await resp.json();
  return postsResp;
};
