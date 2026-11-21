const { createWorkspace } = require("../model/workspace.model.js");

const createWorkspaceController = async (req, res, next) => {
  try {
    const { workspaceName, industryType, teamSize, created_by } = req.body;
    const created_at = new Date().toISOString();

    const workspace = await createWorkspace({
      workspaceName,
      industryType,
      teamSize,
      created_by,
      created_at,
    });

    return res.status(201).json({
      success: true,
      message: "Workspace created successfully",
      workspace: {
        id: workspace.id,
        name: workspace.name,
        industry: workspace.industry,
        teamSize: workspace.team_size,
        createdAt: workspace.created_at,
      },
    });
  } catch (error) {
    console.error("Error creating workspace:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while creating the workspace",
      error: error.message,
    });
  }
};

module.exports = {
  createWorkspaceController,
};
