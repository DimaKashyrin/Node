const {Schema, model} = require('mongoose');
const { tokenType } = require('../configs');

const actionTokenSchema = new Schema({
  token: {
    type: String,
    required: true,
    trim: true
  },
  token_type: {
    type: String,
    required: true,
    enum: Object.values(tokenType),
    trim: true
  },
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user'
  }
}, {
  timestamps: true ,
  toObject: { virtuals: true },
  toJSON:{ virtuals: true }
}) ;

module.exports = model('action_token', actionTokenSchema);
