// 템플릿을 렌더링하지않을때 백엔드와 프론트엔드가 소통하는 방법.
import express from "express";
import {
  registerView,
  createComment,
  deleteComment,
} from "../controllers/videoContoroller";
const apiRouter = express.Router();

apiRouter.post("/videos/:id([0-9a-f]{24})/view", registerView);
apiRouter.route("/videos/:id([0-9a-f]{24})/comment").post(createComment);
apiRouter.delete("/comments/:id([0-9a-f]{24}/delete)", deleteComment);
export default apiRouter;
