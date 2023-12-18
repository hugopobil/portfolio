const mongoose = require('mongoose');
const Project = require('../models/Project.model');
const { project } = require('../public/js/project.json');
require('../config/db.config');


mongoose.connection.once('open', () => {
    mongoose.connection.dropCollection('projects')
        .then(() => {
            console.log('DB cleared');
        })
        .then(() => {
            return Project.create(project);
        })
        .then((projects) => {
            projects.forEach(project => console.log(`${project.title} has been created`));
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