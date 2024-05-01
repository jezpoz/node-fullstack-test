import type { Request, Response } from "express";

import { db, eq } from "fullstack-db";
import { insertPostSchema, posts } from "fullstack-db/schema";

export async function getPost(req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.params;

    const post = await db.query.posts.findFirst({
      where: eq(posts.id, id),
    });

    if (!post) {
      return res.status(404).send({ message: "Post not found" });
    }

    return res.status(200).send(post);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Error encountered!" });
  }
}

export async function getPosts(req: Request, res: Response): Promise<Response> {
  try {
    const allPosts = await db.query.posts.findMany();
    return res.status(200).send(allPosts);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Error encountered!" });
  }
}

export async function createPost(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const { title, content, authorId } = req.body;

    const newPost = insertPostSchema.parse({ title, content, authorId });

    const results = await db.insert(posts).values(newPost).returning();

    if (!results || results.length < 1) {
      return res.status(500).send({ message: "Post could not be created." });
    }
    return res.status(200).send(results[0]);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Error encountered!" });
  }
}

export async function updatePost(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const post = insertPostSchema
      .partial({ title: true, content: true })
      .parse({ title, content });

    const updatedPosts = await db
      .update(posts)
      .set(post)
      .where(eq(posts.id, id))
      .returning();

    if (!updatedPosts || updatedPosts.length < 1) {
      return res.status(500).send({ message: "Post could not be updated" });
    }
    return res.status(200).send(updatedPosts[0]);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Error encountered!" });
  }
}

export async function deletePost(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const { id } = req.params;
    const deletedPosts = await db
      .delete(posts)
      .where(eq(posts.id, id))
      .returning({
        id: posts.id,
      });
    if (!deletedPosts || deletedPosts.length < 1) {
      return res.status(500).send({ message: "Post could not be deleted" });
    }
    return res.status(200).send(deletedPosts[0]);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Error encountered!" });
  }
}
