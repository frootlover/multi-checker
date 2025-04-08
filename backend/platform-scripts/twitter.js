const axios = require("axios");
const config = require("../config.json");

async function checkTwitter(username) {
  const token = config.TWITTER_BEARER_TOKEN;
  if (!token) {
    console.error("❌ Missing Twitter bearer token in config.json");
    return false;
  }

  const url = `https://api.twitter.com/2/users/by/username/${encodeURIComponent(username)}`;

  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  };

  try {
    console.log(`🔍 Checking Twitter username: ${username}`);
    const response = await axios.get(url, options);

    if (response.data && response.data.data) {
      console.log(`❌ Username "${username}" is taken (Twitter user ID: ${response.data.data.id})`);
      return false; // Username is taken
    }

    console.log(`✅ Username "${username}" is available`);
    return true;
  } catch (err) {
    if (err.response) {
      console.error(`❗ Twitter API Error (${err.response.status}): ${err.response.data.title || err.response.statusText}`);

      if (err.response.status === 404) {
        return true; // Username not found = available
      }
    } else {
      console.error("❗ Network or unknown error:", err.message);
    }

    return false; // On any failure, assume taken for safety
  }
}

module.exports = checkTwitter;
