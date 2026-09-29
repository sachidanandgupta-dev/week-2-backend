const mongoose = require('mongoose');
const Note = require('../models/Note');

const validId = (id) => mongoose.isValidObjectId(id);
const pick = (body) => {
  const out = {};
  ['title', 'content', 'tags', 'pinned'].forEach((k) => {
    if (body[k] !== undefined) out[k] = body[k];
  });
  return out;
};

// POST /api/notes
exports.createNote = async (req, res, next) => {
  try {
    const note = await Note.create({ ...pick(req.body), user: req.user._id });
    res.status(201).json(note);
  } catch (err) {
    next(err);
  }
};

// GET /api/notes?search=word&tag=work
exports.getNotes = async (req, res, next) => {
  try {
    const filter = { user: req.user._id };
    if (req.query.tag) filter.tags = String(req.query.tag);
    if (req.query.search) {
      const rx = new RegExp(String(req.query.search).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
      filter.$or = [{ title: rx }, { content: rx }];
    }
    const notes = await Note.find(filter).sort({ pinned: -1, updatedAt: -1 });
    res.json(notes);
  } catch (err) {
    next(err);
  }
};

// GET /api/notes/:id
exports.getNote = async (req, res, next) => {
  try {
    if (!validId(req.params.id)) return res.status(400).json({ message: 'Invalid note id' });
    const note = await Note.findOne({ _id: req.params.id, user: req.user._id });
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json(note);
  } catch (err) {
    next(err);
  }
};

// PUT /api/notes/:id
exports.updateNote = async (req, res, next) => {
  try {
    if (!validId(req.params.id)) return res.status(400).json({ message: 'Invalid note id' });
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      pick(req.body),
      { new: true, runValidators: true }
    );
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json(note);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/notes/:id
exports.deleteNote = async (req, res, next) => {
  try {
    if (!validId(req.params.id)) return res.status(400).json({ message: 'Invalid note id' });
    const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json({ message: 'Note deleted' });
  } catch (err) {
    next(err);
  }
};
