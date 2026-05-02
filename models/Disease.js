const mongoose = require('mongoose');

const DiseaseSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    image: String,
    video: String,
    translations: {
        en: {
            name: String, symptoms: String, causes: String, prevention: String, medicine: String,
            faq: [{ question: String, answer: String }]
        },
        te: {
            name: String, symptoms: String, causes: String, prevention: String, medicine: String,
            faq: [{ question: String, answer: String }]
        },
        hi: {
            name: String, symptoms: String, causes: String, prevention: String, medicine: String,
            faq: [{ question: String, answer: String }]
        },
        ta: {
            name: String, symptoms: String, causes: String, prevention: String, medicine: String,
            faq: [{ question: String, answer: String }]
        },
        kn: {
            name: String, symptoms: String, causes: String, prevention: String, medicine: String,
            faq: [{ question: String, answer: String }]
        },
        mr: {
            name: String, symptoms: String, causes: String, prevention: String, medicine: String,
            faq: [{ question: String, answer: String }]
        },
        gu: {
            name: String, symptoms: String, causes: String, prevention: String, medicine: String,
            faq: [{ question: String, answer: String }]
        }
    }
});

module.exports = mongoose.model('Disease', DiseaseSchema);
