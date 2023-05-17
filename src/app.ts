import express from "express";
import apiRoute from "./routes";

const app = express();

app.use(express.json());

app.use("/", apiRoute);

export = app;
