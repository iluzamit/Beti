import { Application } from "express";
import * as bodyParser from "body-parser";
import { Server as HttpServer } from "http";
import { Router } from "./router";

const jsonParser = bodyParser.json();

export class Server {
  app: Application;
  server: HttpServer;
  io;

  public static bootstrap(server, app: Application, io): Server {
    return new Server(server, app, io);
  }

  constructor(server, app, io) {
    this.server = server;
    this.app = app;
    this.io = io;
    this.configSockets(io);
    this.app.use(jsonParser);
    this.app.use(Router)
  }

  public configSockets(io) {
  }
}
