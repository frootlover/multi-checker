const express = require("express");
const router = express.Router();

const checkRoblox = require("./platform-scripts/roblox");
const checkTwitter = require("./platform-scripts/twitter");

const platformMap = {
  roblox: checkRoblox,
  twitter: checkTwitter,
};

router.post("/check", async (req, res) => {
  const { username, platforms } = req.body;
  const results = {};

  await Promise.all(
    platforms.map(async (platform) => {
      const checkFunc = platformMap[platform];
      if (checkFunc) {
        results[platform] = await checkFunc(username);
      } else {
        results[platform] = null; // Unknown platform
      }
    })
  );

  res.json(results);
});

module.exports = router;
