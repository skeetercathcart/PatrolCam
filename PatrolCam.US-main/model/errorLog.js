const mongoose = require('mongoose');
const Schema = mongoose.Schema

const errorLogSchema = new Schema({
    timestamp: {
        type: Date,
        default: Date.now, // Automatically set to current date/time
      },
      level: {
        type: String,
        enum: ['TRACE', 'FATAL', 'INFO', 'WARN', 'ERROR', 'DEBUG'], // Allowed log levels. See https://stackoverflow.com/questions/2031163/when-to-use-the-different-log-levels for details
        required: true,
      },
      desc: {
        type: String,
        required: true,
      },
      // Service / function throwing the error
      source: {  
        type: String,
        required: true,
      },
      // If user is logged in, track 
      userId: {
        type: String,
        required: false, 
      },
      code: {
          type: String,
          required: false,
      },
      meta: {
        message: {
          type: String,
          required: false
        }, 
        stack: {
        type: String,
        required: false 
      }
    }
    });
    

module.exports = mongoose.model('errorLog', errorLogSchema);