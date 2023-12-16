const mongoose = require('mongoose');
const User = require('../models/User.model');
const { users } = require('../public/js/users.json');
require('../config/db.config');


mongoose.connection.once('open', () => {
    mongoose.connection.dropCollection('users')
        .then(() => {
            console.log('DB cleared');
        })
        .then(() => {
            return User.create(users);
        })
        .then((users) => {
            users.forEach(user => console.log(`${user} has been created`));
        })
        .catch(err => console.error(err))
        .finally(() => {
            mongoose.connection.close()
                .then(() => {
                    console.log('End of seeds');
                })
                .catch((err) => console.error('Error while disconnecting', err))
                .finally(() => process.exit(0))
        })
})