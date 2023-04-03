const express = require("express");
const next = require("next");
const metadataRoutes = require("./src/pages/api/metadata");
const updateMetadataRoutes = require("./src/pages/api/update-metadata");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use("/api/metadata", metadataRoutes);
  server.use("/api/update-metadata", updateMetadataRoutes);

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  const port = process.env.PORT || 3000;

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
