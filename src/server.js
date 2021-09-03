import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";
import { localsMiddleware } from "./middlewares";
import apiRouter from "./routers/apiRouter";
import flash from "express-flash";

const app = express();
const logger = morgan("dev");

app.use(logger);

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
// req.에서 오는 정보들을 받게 해주는 미들웨어
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // text형식으로 보내오는 파일들을 읽게해주는 미들웨어
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(flash()); //flash가 message라는 것을 사용하게 만들어줌.
app.use(localsMiddleware);
app.use("/uploads", express.static("uploads")); // <-- static은 폴더를 공개해서 열어주는것. 기본적으로 폴더는 비공개상태임.
app.use("/static", express.static("assets")); // URL이름은 다른것 사용해도 무관, assets,upload일필요없음.
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);
app.use("/api", apiRouter);
app.use(
  "/static",
  express.static("assets"),
  express.static("node_modules/@ffmpeg/core/dist")
);

export default app;
