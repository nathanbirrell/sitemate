import { CreateIssueBody, Issue } from "./types";

let ALL_ISSUES = [
  {
    id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
    title: "Help my PDF does not load",
    description: "I can't annotate my PDF, it is broken plz help.",
  },
  {
    id: "9b1deb4a-3b7e-4bac-9bdd-2b0d7b3dcb6y",
    title: "Help my project is over budget",
    description: "I can't afford this!",
  },
];

export const getIssues = (id?: string) => {
  return ALL_ISSUES;
};

export const getIssueById = (id: string) => {
  return ALL_ISSUES.find((item) => item.id === id);
};

export const createIssue = (input: Issue) => ALL_ISSUES.push(input);

// TODO: crude update here, should not need to iterate over every single item for this task
export const updateIssue = (id: string, input: Partial<Issue>) => {
  let updatedIssue;
  ALL_ISSUES = ALL_ISSUES.map((item) => {
    if (item.id !== id) return item;
    const newItem = {
      ...item,
      input,
    };
    updatedIssue = newItem;
    return newItem;
  });

  return updateIssue;
};

export const deleteIssue = (id: string) => {
  const index = ALL_ISSUES.findIndex((item) => item.id === id);
  if (index !== -1) {
    ALL_ISSUES = ALL_ISSUES.splice(index, 1);
  } else {
    throw new Error("That issue does not exist");
  }
};
