const { Schema, model, Types } = require('mongoose');
const { schema } = require('./Thought');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
        },
        thoughts: [{ type: Schema.Types.ObjectId, ref: "Thought"}],
        friends: [{ type: Schema.Types.ObjectId, ref: "User"}]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        },
       
    }
);

UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
})

const User = model('User', UserSchema);

module.exports = User;