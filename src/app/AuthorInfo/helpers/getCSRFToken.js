export default function getCSRFToken() {
  const initGET = { method: 'GET' };
  const request = new Request('http://localhost:8000/test/');
  return fetch(request, initGET).then(resp => resp.json());
}
