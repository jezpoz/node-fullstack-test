import { Router } from "express";
import {
  getPost,
  getPosts,
  createPost,
  updatePost,
  deletePost,
} from "./handlers";

export const router = Router();

router.get("/", getPosts);
router.post("/", createPost);
router.get("/:id", getPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
