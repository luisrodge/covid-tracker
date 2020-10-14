
export default async function api(endpoint = '', method, body) {
  try {
    const response = await fetch(`${process.env.REACT_APP_API}/api/${endpoint}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      mode: 'cors',
      body: JSON.stringify(body),
    });
    return response.json();
  } catch (error) {
    throw error;
  }
}
