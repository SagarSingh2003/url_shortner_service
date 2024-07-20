import cors from "cors";
import express from "express";
import shortenerRoute from "./routes/shortener.js";
import urlOperations from "./controller/urlOperations.js";
import "./db/db.js";
import "dotenv/config";

const PORT = process.env.PORT || 3000;

const app = express();

app.set("trust proxy" , true);

app.use(cors());

app.use(express.json());

app.use("/shorten" , shortenerRoute );

app.get("/:id" , urlOperations.getLinkAndUpdateAnalytics);

app.listen(PORT , () => {
    console.log(`app listening on port ${PORT}`)
})