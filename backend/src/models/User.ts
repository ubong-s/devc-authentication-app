import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
   name: {
      type: String,
   },
   email: {
      type: String,
      unique: true,
      required: [true, 'Please provide email'],
      validate: {
         validator: validator.isEmail,
         message: 'Please provide valid email',
      },
   },
   password: {
      type: String,
      required: [true, 'Please provide password'],
      minlength: 6,
   },
   bio: {
      type: String,
   },
   phone: {
      type: String,
   },
   role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
   },
   verificationToken: String,
   isVerified: {
      type: Boolean,
      default: false,
   },
   verified: Date,
});

UserSchema.set('toJSON', {
   transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id;
      delete returnedObject._id;
      delete returnedObject._v;
      delete returnedObject.password;
   },
});

UserSchema.pre('save', async function () {
   if (!this.isModified('password')) return;

   const salt = await bcrypt.genSalt(10);
   this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (userPassword: string) {
   const isMatch = await bcrypt.compare(userPassword, this.password);

   return isMatch;
};

export default mongoose.model('User', UserSchema);
