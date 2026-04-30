const db = require("../config/db");

// ✅ Create Project
exports.createProject = (req, res) => {
  const { name, description } = req.body;
  const userId = req.user.id;

  if (!name) {
    return res.status(400).json({ msg: "Project name required" });
  }

  const query = `
    INSERT INTO projects (name, description, created_by)
    VALUES (?, ?, ?)
  `;

  db.query(query, [name, description, userId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ msg: "Error creating project" });
    }

    res.json({
      msg: "Project created",
      projectId: result.insertId
    });
  });
};

// ✅ Get all projects for logged-in user
exports.getProjects = (req, res) => {
  const userId = req.user.id;

  const query = `
    SELECT * FROM projects
    WHERE created_by = ?
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ msg: "Error fetching projects" });
    }

    res.json(results);
  });
};

// ✅ Add member to project
exports.addMember = (req, res) => {
  const { project_id, user_id, role } = req.body;

  if (!project_id || !user_id) {
    return res.status(400).json({ msg: "Project ID and User ID required" });
  }

  const query = `
    INSERT INTO project_members (project_id, user_id, role)
    VALUES (?, ?, ?)
  `;

  db.query(query, [project_id, user_id, role || "member"], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ msg: "Error adding member" });
    }

    res.json({ msg: "Member added successfully" });
  });
};