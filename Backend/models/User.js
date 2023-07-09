const { Schema, mongoose} = require('mongoose');

const UserSchema = new Schema ({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    userType:{
        type: String,
        default: "user"
    },
    nomOfnotes:{
        type: Number,
    }
});
const User= mongoose.model('user',UserSchema);
module.exports = User;
