const mongoose = require('mongoose');
const Education = require('../models/Education.model');
const { education } = require('../public/js/education.json');
require('../config/db.config');


mongoose.connection.once('open', () => {
    mongoose.connection.dropCollection('educations')
        .then(() => {
            console.log('DB cleared');
        })
        .then(() => {
            return Education.create(education);
        })
        .then((educations) => {
            educations.forEach(education => console.log(`${education.course} has been created`));
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