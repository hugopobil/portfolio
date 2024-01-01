const mongoose = require('mongoose');
const Reference = require('../models/References.model');
const { reference } = require('../public/js/reference.json');
require('../config/db.config');


mongoose.connection.once('open', () => {
    mongoose.connection.dropCollection('references')
        .then(() => {
            console.log('DB cleared');
        })
        .then(() => {
            return Reference.create(reference);
        })
        .then((references) => {
            references.forEach(reference => console.log(`${reference.name} has been created`));
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