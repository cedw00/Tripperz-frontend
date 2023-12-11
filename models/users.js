const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
 username: String,
 email: String,
 areaCode: String,
 phoneNumber: String,
 favDestinations: String,
 favFoods: String,
 email: String,
 country: String,
 cityDest: String,
 activitiesList: [String],
 usersList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
});

const User = mongoose.model('users', userSchema);

module.exports = User;