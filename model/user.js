import mongoose , {models} from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    select: false,
    required: true,
    minlength: 7
  },

  // 🔥 MAIN RECOMMENDATION PROFILE
  gamePreferences: {
    type: Map,
    of: Number,
    default: {}
  },

  dateCreated: {
    type: Date,
    default: Date.now
  }
});

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const UserModel = models.user || mongoose.model('user', UserSchema);
export default UserModel;