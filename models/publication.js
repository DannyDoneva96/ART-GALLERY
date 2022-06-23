const { Schema, model, Types: { ObjectId } } = require('mongoose');

const URL_PATTERN = /^https?:\/\/(.+)/;

const publicationSchema = new Schema({
    title: { type: String, minlength: [6, 'Title should be a minimum of 6 characters long!'] },
    technique: { type: String, required: [true, 'Painting technique is required!'], maxlength: [15, 'Painting technique should be a maximum of 15 characters long!'] },
    picture: {
        type: String, required: [true, 'Art picture is required!'], validate: {
            validator(value) {
                return URL_PATTERN.test(value);
            },
            message: 'Art picture should be starts with http:// or https://'
        }
    },
    certificate: {
        type: String, enum:
        {
            values: ['Yes', 'No'],
            message: 'Certificate of authenticity can be "Yes" or "No".'
        },
        required: [true, 'Certificate of authenticity can be "Yes" or "No".']
    },
    owner: { type: ObjectId, ref: 'User', required: true },
    shared: { type: [ObjectId], ref: 'User', default: [] }
});

const Publication = model('Publication', publicationSchema);

module.exports = Publication;