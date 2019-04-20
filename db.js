const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/nodejs', { useNewUrlParser: true })
        .then(() =>  console.error('Connected to Mongo'))
        .catch(err => console.error('Something wrong', err))
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);