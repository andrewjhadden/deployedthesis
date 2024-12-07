/**
* Copyright 2024 Allison Berkowitz and Andrew Hadden
* Licensed under the MIT License. See the LICENSE.txt file in the project root for full license information.
*/

// Component: data.js
// Hamilton College Fall '24 Thesis
// Ally Berkowitz and Andrew Hadden
// Description: Connecting the math bills data in the MongoDB database to the website/how we want to 
//      show our data.

//this is the part that determines database/api/data
//make sure that the latest version of data.js is getting deployed via vercel

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Get from Vercel
const mongoUri = process.env.MONGODB_URI; 

async function connectToDB() {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(mongoUri);
    }
}

// const billSchema = new mongoose.Schema({
//     congress: Number,
//     number: String,
//     originChamber: String,
//     originChamberCode: String,
//     title: String,
//     type: String,
//     updateDateIncludingText: String,
//     url: String
// });
  
// const activitiesSchema = new mongoose.Schema({
//     date: String,
//     name: String
// });
  
// const latestActionSchema = new mongoose.Schema({
//     actionDate: String,
//     actionTime: String,
//     text: String
// });
  
// const relationshipDetailsSchema = new mongoose.Schema({
//     identifiedBy: String,
//     type: String
// });
  
// // Define Mongoose schema and model
// const dataSchema = new mongoose.Schema({
//     bill: {
//         actionDate: String,
//         actionDesc: String,
//         bill: billSchema,
//         currentChamber: String,
//         currentChamberCode: String,
//         lastSummaryUpdateDate: String,
//         text: String,
//         updateDate: String,
//         versionCode: String},
//     sponsors: [{
//         bioguideId: String,
//         district: Number,
//         firstName: String,
//         fullName: String,
//         isByRequest: String,
//         lastName: String,
//         middleName: String,
//         party: String,
//         state: String,
//         url: String}],
//     cosponsors: [{
//         bioguideId: String,
//         district: Number,
//         firstName: String,
//         fullName: String,
//         isOriginalCosponsor: Boolean,
//         lastName: String,
//         party: String,
//         sponsorshipDate: String,
//         state: String,
//         url: String}],
//     committees: [{
//         activities: [activitiesSchema],
//         chamber: String,
//         name: String,
//         systemCode: String,
//         type: String,
//         url: String}],
//     relatedBills: [{
//         congress: Number,
//         latestAction: latestActionSchema,
//         number: Number,
//         relationshipDetails: [relationshipDetailsSchema],
//         title: String,
//         type: String,
//         url: String}],
//     keywordsMatched: [String]
// });

const dataSchema = new mongoose.Schema({
    bill: Object,
    sponsors: Array,
    cosponsors: Array,
    committees: Array,
    relatedBills: Array,
    keywordsMatched: [String]
});

const dataModel = mongoose.model('thesisdbcollections', dataSchema);

// Handler function edited for the serverless function
export default async function handler(request, response) {
    // Set CORS headers
    // response.setHeader('Access-Control-Allow-Credentials', true)
    // Need to allow all origins
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    response.setHeader('Access-Control-Allow-Headers', 'Content-Length');
    response.setHeader('Cache-Control', 'no-store'); //new

    if (request.method === 'OPTIONS') {
        response.status(200).end(); // 200 is okay
        return;
    }

    try {
        await connectToDB();
        const data = await dataModel.find();
        console.log("Raw data from MongoDB:", JSON.stringify(data, null, 2)); //new
        response.status(200).json(data); // 200 is okay
    } catch (error) {
        console.error('Error in handler:', error);
        response.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
}