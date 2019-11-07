const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
mongoose.promise = Promise

// Define userSchema
const UserSchema = new Schema({
  username: { type: String, required: true },
  firstname: { type: String, required: false },
  lastname: { type: String, required: false },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

// Define schema methods
UserSchema.methods = {
	checkPassword: function (inputPassword) {
		return bcrypt.compareSync(inputPassword, this.password)
	},
	hashPassword: plainTextPassword => {
		return bcrypt.hashSync(plainTextPassword, 10)
	}
}

// Define hooks for pre-saving
UserSchema.pre('save', function (next) {
	if (!this.password) {
		console.log('models/user.js =======NO PASSWORD PROVIDED=======')
		next()
	} else {
		console.log('models/user.js hashPassword in pre save');
		
		this.password = this.hashPassword(this.password)
		next()
	}
})

const User = mongoose.model("User", UserSchema);

module.exports = User;
