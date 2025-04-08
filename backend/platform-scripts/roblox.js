const axios = require("axios");

async function checkRoblox(username) {
  const url = `https://auth.roblox.com/v1/usernames/validate?birthday=2006-09-21T07:00:00.000Z&context=Signup&username=${username}`;
  try {
    const res = await axios.get(url);
    return res.data.code === 0;
  } catch (err) {
    console.error("Roblox error:", err.message);
    return false;
  }
}

module.exports = checkRoblox;
