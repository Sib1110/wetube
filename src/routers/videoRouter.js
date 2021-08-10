import express from 'express';
import {
    watch, 
    getEdit, 
     
    deleteVideo,
    postEdit,
    getUpload,
    postUpload,
} from '../controllers/videoContoroller'



const videoRouter = express.Router();


videoRouter.get(("/:id([0-9a-f]{24})"), watch);
videoRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit);
videoRouter.get("/:id(\\d+)/delete", deleteVideo);

videoRouter.get("/upload", getUpload);
videoRouter.post("/upload", postUpload);

export default videoRouter;