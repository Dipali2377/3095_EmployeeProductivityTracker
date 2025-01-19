import mongoose from "mongoose";

import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true, // Ensure the username is unique
  },
  password: {
    type: String,
    required: true,
  },
});

// Hash the password before saving the user
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    // this.password = await bcrypt.hash(this.password, salt);

    this.password = this.password;
  }
  next();
});
// Method to compare the password entered with the stored hashed password
userSchema.methods.comparePassword = async function (enteredPassword) {
  try {
    // No need to hash the entered password again, bcrypt.compare() will handle that
    const isMatch = await bcrypt.compare(enteredPassword, this.password); // Compare entered password with stored hashed password
    console.log({ enteredPassword, pass: this.password });
    return enteredPassword === this.password; // Returns true if passwords match, false otherwise
  } catch (error) {
    console.log({ error });
    throw new Error("Error comparing passwords");
  }
};

const User = mongoose.model("User", userSchema);

export default User;
