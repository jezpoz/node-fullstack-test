import { Request, Response } from "express";

import { db, eq } from "fullstack-db";
import { insertUserSchema, users } from "fullstack-db/schema";

export async function getUser(req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.params;

    const user = await db.query.users.findFirst({
      where: eq(users.id, id),
    });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    return res.status(200).send(user);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Error encountered!" });
  }
}

export async function getUsers(_: Request, res: Response): Promise<Response> {
  try {
    const allUsers = await db.query.users.findMany();
    return res.status(200).send(allUsers);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Error encountered!" });
  }
}

export async function getUserPosts(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const { id } = req.params;
    const user = await db.query.users.findFirst({
      where: eq(users.id, id),
      with: {
        posts: true,
      },
    });
    if (!user) {
      return res.status(404).send({ message: "User could not be found" });
    }
    return res.status(200).send(user.posts);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Error encountered!" });
  }
}

export async function createUser(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const { name } = req.body;
    const user = insertUserSchema.parse({ name });
    const results = await db.insert(users).values(user).returning();
    if (!results || results.length < 1) {
      return res.status(500).send({ message: "User could not be created." });
    }
    return res.status(200).send(results[0]);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Error encountered!" });
  }
}

export async function updateUser(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updatedUsers = await db
      .update(users)
      .set({ name })
      .where(eq(users.id, id))
      .returning();
    if (!updatedUsers || updatedUsers.length < 1) {
      return res.status(500).send({ message: "User could not be updated" });
    }
    return res.status(200).send(updatedUsers[0]);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Error encountered!" });
  }
}

export async function deleteUser(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const { id } = req.params;
    const deletedUsers = await db
      .delete(users)
      .where(eq(users.id, id))
      .returning({
        id: users.id,
      });
    if (!deletedUsers || deletedUsers.length < 1) {
      return res.status(500).send({ message: "Post could not be deleted" });
    }
    return res.status(200).send(deletedUsers[0]);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Error encountered!" });
  }
}
