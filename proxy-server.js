const express = require("express");
const request = require("request");
const app = express();

const allowedHosts = (process.env.ALLOW_IMAGE_HOSTNAME ?? "")
  .split(",")
  .map((host) => host.trim());

app.get("/", (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl || !/^https?:\/\/.+/.test(targetUrl)) {
    return res.status(400).send("Invalid URL");
  }

  try {
    const hostname = new URL(targetUrl).hostname;
    if (!allowedHosts.includes(hostname)) {
      return res.status(403).send("Forbidden");
    }
  } catch {
    return res.status(400).send("Malformed URL");
  }

  req
    .pipe(request(targetUrl))
    .on("error", () => {
      res.status(500).send("Proxy error");
    })
    .pipe(res);
});

app.listen(3000, () => {
  console.log("Proxy server listening on port 3000");
  console.log("Allow: ", allowedHosts);
});
