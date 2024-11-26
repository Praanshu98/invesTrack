import "./src/utils/env.js";

import app from "./src/app.js";

app.listen(process.env.BACKEND_PORT, () => {
  console.log(`Backend Listening on port: ${process.env.BACKEND_PORT}`);
});
