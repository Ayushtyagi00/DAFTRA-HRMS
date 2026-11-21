import api from "./api.js";

export const workspaceAPI = {
  createWorkspace: (workspaceName, industryType, teamSize, userId) =>
    api.post("/workspace/create", {
      workspaceName,
      industryType,
      teamSize,
      created_by: userId,
    }),
};
