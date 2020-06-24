import * as express from "express";
import * as path from 'path'
import * as bodyParser from "body-parser";
import { DefaultRouter } from "./routes/default-router";

export const Router = express.Router();
Router.use(bodyParser.json());
Router.use(
  bodyParser.urlencoded({
    extended: true
  })
);

Router.use("/api", DefaultRouter);
Router.use(express.static(path.join(__dirname, "../../client/build")));