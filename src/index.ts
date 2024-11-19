import 'module-alias/register'
import dotenv from "dotenv";
import { startServer } from "./server";

dotenv.config();

startServer()
  .then(() => console.log(`🚀  Server ready at localhost:4000`))
  .catch((e) => {
    console.error(e);
  });
