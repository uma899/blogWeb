import express from "express";
import cors from "cors";
import records from "./routes/record.js";
import creators from "./routes/creators.js"

const PORT = 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/blogs", records);
app.use("/creators", creators);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
