import { Request, Response } from "express";

type Post = {
  text: string;
  id: number;
  timestamp: number;
};
type Posts = Post[];

let posts: Posts = [];

const getAll = (req: Request, res: Response) => {
  res.status(200).json(posts);
};

export {getAll}



