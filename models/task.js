const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    name: {type: String, required: true},
    done: {type: Boolean, default: false},
    checklist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Checklist',
        required: true
    }
})

//Uma checklist tem várias tasks, então vamos relacionar essas duas collections

module.exports = mongoose.model('Task', taskSchema);