const chalk = require('chalk');
const p = console.log;
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify:false,
    useNewUrlParser: true
})


