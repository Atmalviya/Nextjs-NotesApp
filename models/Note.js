import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    maxlength: [40, 'Title cannot be more than 40 characters'],
  },
  description: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Note || mongoose.model('Note', NoteSchema);
