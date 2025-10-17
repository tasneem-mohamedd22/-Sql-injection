// flood-rate-limit.js
const axios = require('axios');

const url = 'http://localhost:1234/login';
async function flood(n = 20) {
  const attempts = [];
  for (let i = 0; i < n; i++) {
    const p = axios.post(url, { username: 'admin', password: 'wrongpass' })
      .then(r => ({ i, status: r.status, data: r.data }))
      .catch(e => ({ i, status: e.response ? e.response.status : 'ERR', data: e.response ? e.response.data : e.message }));
    attempts.push(p);
    // small delay to better trigger rate-limit within window
    await new Promise(r => setTimeout(r, 50));
  }
  const results = await Promise.all(attempts);
  results.forEach(r => console.log(`[${r.i}] status=${r.status} data=${JSON.stringify(r.data)}`));
}
flood(process.argv[2] ? parseInt(process.argv[2], 10) : 20);