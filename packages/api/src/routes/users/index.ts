import { Router } from "express";
import {
  getUser,
  getUsers,
  getUserPosts,
  createUser,
  updateUser,
  deleteUser,
} from "./handlers";

export const router = Router();

router.get("/", getUsers);
router.post("/", createUser);
router.get("/:id", getUser);
router.get("/:id/posts", getUserPosts)
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
