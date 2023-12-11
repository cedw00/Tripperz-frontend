const mongoose = require('mongoose');

const tripSchema = mongoose.Schema({
 startDate: String,
 endDate: String,
 countryDest: String,
 cityDest: String,
 activitiesList: [String],
 usersList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
});

const Trip = mongoose.model('trips', tripSchema);

module.exports = Trip;