// controllers/projectController.js — CRUD for Projects/Campaigns
const Project = require('../models/Project');

/**
 * @route   GET /api/projects
 * @desc    Get all projects (supports ?category=&status= filters)
 * @access  Public
 */
const getProjects = async (req, res, next) => {
  try {
    const { category, status, featured } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (status) filter.status = status;
    if (featured === 'true') filter.featured = true;

    const projects = await Project.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/projects/:id
 * @desc    Get single project by ID
 * @access  Public
 */
const getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   POST /api/projects
 * @desc    Create a new project (admin only)
 * @access  Protected
 */
const createProject = async (req, res, next) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   PUT /api/projects/:id
 * @desc    Update a project (admin only)
 * @access  Protected
 */
const updateProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,           // Return the updated document
      runValidators: true, // Run schema validators on update
    });
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   DELETE /api/projects/:id
 * @desc    Delete a project (admin only)
 * @access  Protected
 */
const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getProjects, getProjectById, createProject, updateProject, deleteProject };
