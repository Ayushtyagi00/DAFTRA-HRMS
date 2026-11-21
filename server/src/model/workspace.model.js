const pool = require("../config/dbConfig.js");

const createWorkspace = async ({
  workspaceName,
  industryType,
  teamSize,
  created_by,
  created_at,
}) => {
  const { rows } = await pool.query(
    `INSERT INTO workspaces (name, industry, team_size, created_by, created_at)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, name, industry, team_size,created_at`,
    [workspaceName, industryType, teamSize, created_by, created_at],
  );
  return rows[0];
};

module.exports = {
  createWorkspace,
};
