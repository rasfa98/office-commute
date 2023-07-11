export const postRequest = <T>(
  url: string,
  body: BodyInit,
  headers: HeadersInit
): Promise<T> => {
  return fetch(`${process.env.REACT_APP_API_URL}${url}`, {
    method: "POST",
    headers,
    body,
  }).then((response) => response.json());
};

export const getRequest = async <T>(
  url: string,
  headers: HeadersInit
): Promise<T> => {
  return fetch(`${process.env.REACT_APP_API_URL}${url}`, {
    method: "GET",
    headers,
  }).then((response) => response.json());
};
