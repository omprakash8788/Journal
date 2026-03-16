import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";
import template from "../template.js";

import userRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.js'
import postRoutes from './routes/post.routes.js'

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
// app.use(helmet());
// app.use(cors());

app.use(
  helmet({
    crossOriginResourcePolicy: false
  })
);

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))

app.use((req, res, next) => {
  console.log("REQUEST:", req.method, req.url);
  next();
});


// mount routes
app.use('/', userRoutes)
app.use('/', authRoutes)
app.use('/', postRoutes)

// Catch unauthorised errors
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + ": " + err.message });
  } else if (err) {
    res.status(400).json({ error: err.name + ": " + err.message });
    console.log(err);
  }
});

app.get("/", (req, res) => {
  res.status(200).send(template());
});
export default app;
