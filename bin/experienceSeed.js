const mongoose = require('mongoose');
const Experience = require('../models/Experience.model');
const { experience } = require('../public/js/experience.json');
require('../config/db.config');


mongoose.connection.once('open', () => {
    mongoose.connection.dropCollection('experiences')
        .then(() => {
            console.log('DB cleared');
        })
        .then(() => {
            return Experience.create(experience);
        })
        .then((experiences) => {
            experiences.forEach(experience => console.log(`${experience.position} has been created`));
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