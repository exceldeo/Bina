export const bearerToken = () => {
  const token = localStorage.getItem('token');
  const headers = {};

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};
