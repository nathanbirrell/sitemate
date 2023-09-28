import express from "express";
import "dotenv/config";
import { v4 as uuidv4 } from "uuid";
import type {
  CreateIssueBody,
  DeleteIssueParams,
  GetIssueByIdParams,
  Issue,
  IssueError,
  UpdateIssueBody,
  UpdateIssueParams,
} from "./types";
import * as db from "./mockDb";

const app = express();

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

app.get("/", (req, res) => {
  res.send("Hello from express and typescript");
});

app.get("/issues", (req: express.Request, res: express.Response<Issue[]>) => {
  res.send(db.getIssues());
});

app.get(
  "/issues/:id",
  (req: express.Request<GetIssueByIdParams>, res: express.Response<Issue>) => {
    const result = db.getIssueById(req.params.id);
    res.send(result);
  }
);

app.post(
  "/issues",
  (
    req: express.Request<{}, Issue, CreateIssueBody>,
    res: express.Response<Issue | IssueError>
  ) => {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newIssue = { id: uuidv4(), title, description };

    db.createIssue(newIssue);

    res.status(201).json(newIssue);
  }
);

app.put(
  "/issues/:id",
  (
    req: express.Request<UpdateIssueParams, unknown, UpdateIssueBody>,
    res: express.Response<Issue | IssueError>
  ) => {
    const { id } = req.params;

    if (!id) return res.status(400).json({ error: "Missing ID param" });
    if (Object.keys(req.body).length < 1)
      return res.status(400).json({ error: "Missing input body" });

    const issue = db.getIssueById(id);

    if (!issue)
      return res.status(404).send({ error: "We couldn't find that issue" });

    const updatedIssue = db.updateIssue(id, req.body) as unknown as Issue;

    // Return the updated product object
    res.send(updatedIssue);
  }
);

app.delete(
  "/issues/:id",
  (
    req: express.Request<DeleteIssueParams>,
    res: express.Response<undefined | IssueError>
  ) => {
    const { id } = req.params;
    try {
      db.deleteIssue(id);
      res.status(204).send();
    } catch (error) {
      res.status(404).send({ error: `Issue with id ${id} not found` });
    }
  }
);

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`App listening on PORT ${port}`));
