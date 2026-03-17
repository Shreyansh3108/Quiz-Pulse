const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    questionText: { type: String, required: true },
    options: { type: [String], required: true },
    correctOption: { type: Number, required: true }, 
    category: { type: String, required: true },     
    subtopic: { type: String, required: true }      
});

module.exports = mongoose.model('Question', QuestionSchema);