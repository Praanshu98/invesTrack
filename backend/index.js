import dotenv from "dotenv";
import app from "./src/app.js"

dotenv.config({
  path:"../.env"
});

app.listen(process.env.BACKEND_PORT, () => {
  console.log(`Example app listening on port ${process.env.BACKEND_PORT}`)
})