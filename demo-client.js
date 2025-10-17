// demo-client.js
const axios = require('axios');

async function test() {
  try {
    console.log('1) Normal login (should succeed):');
    const r1 = await axios.post('http://localhost:1234/login', {
      username: 'admin',
      password: 'admin123'
    }, { timeout: 5000 });
    console.log('->', r1.status, r1.data);
  } catch (e) {
    console.error('Normal login failed:', e.response ? e.response.data : e.message);
  }

  try {
    console.log('\n2) Injection attempt (should fail):');
    const r2 = await axios.post('http://localhost:1234/login', {
      username: 'admin',
      password: "' OR '1'='1"
    }, { timeout: 5000 });
    console.log('->', r2.status, r2.data);
  } catch (e) {
    console.log('Injection blocked as expected:', e.response ? e.response.data : e.message);
  }

  try {
    console.log('\n3) Test vuln-login route (fixed) with correct creds:');
    const r3 = await axios.post('http://localhost:1234/vuln-login', {
      username: 'alice',
      password: 'alicepass'
    }, { timeout: 5000 });
    console.log('->', r3.status, r3.data);
  } catch (e) {
    console.error('vuln-login normal test failed:', e.response ? e.response.data : e.message);
  }

  try {
    console.log('\n4) Test vuln-login route (fixed) with injection payload:');
    const r4 = await axios.post('http://localhost:1234/vuln-login', {
      username: 'alice',
      password: "' OR '1'='1"
    }, { timeout: 5000 });
    console.log('->', r4.status, r4.data);
  } catch (e) {
    console.log('vuln-login injection blocked as expected:', e.response ? e.response.data : e.message);
  }
}

test();