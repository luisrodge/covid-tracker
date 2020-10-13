const base_url = "http://localhost:9000/.netlify/functions";

export default async function api(endpoint = '', method, body) {
  try {
    const response = await fetch(`${base_url}/api/${endpoint}`, {
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
