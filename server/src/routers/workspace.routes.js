const express = require("express");
const {
  createWorkspaceValidetion,
} = require("../middleware/validate.middleware.js");
const {
  createWorkspaceController,
} = require("../controller/workspace.controller.js");
const workspaceRouter = express.Router();

workspaceRouter.post(
  "/create",
  createWorkspaceValidetion,
  createWorkspaceController,
);

module.exports = workspaceRouter;
