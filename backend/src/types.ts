export type Issue = {
  id: string;
  title: string;
  description: string;
};

export type GetIssueByIdParams = Pick<Issue, "id">;

export type CreateIssueBody = Pick<Issue, "title" | "description">;

export type UpdateIssueParams = Pick<Issue, "id">;
export type UpdateIssueBody = Partial<Pick<Issue, "title" | "description">>;

export type DeleteIssueParams = Pick<Issue, "id">;

export type IssueError = {
  error: string;
};
