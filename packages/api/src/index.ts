import 'dotenv/config';
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { router as postRouter } from './routes/posts';
import { router as userRouter } from './routes/users';

const app = express();
const port = process.env.SERVER_PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ credentials: false }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use("/posts", postRouter);
app.use("/users", userRouter);

app.listen(port, () => {
  console.log(`🚀 Server is listening on port ${port}`)
})
