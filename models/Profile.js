const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required:true, 
    ref: 'User',
  },
  company: {
    type: String,
   },
  location: {
    type: String
  },
  website: {
    type: String
  },
  bio: {
    type: String
  },
  skills: {
    required: true,
    type: String
  },
  status: {
    required: true,
    type: String
  },
 website : {
    type: String
  },
githubusername: {
    type: String
  },
  experience: [
    {
      title: {
        type: String,
        required: true
      },
      company: {
        type: String,
        required: true
      },
      location: {
        type: String
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  education: [
    {
      school: {
        type: String,
        required: true
      },
      degree: {
        type: String,
        required: true
      },
      fieldofstudy: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  social:[
    {
        linkedin: {
            type: String
          },
        instagram: {
            type: String
          },
         twitter: {
            type: String
          },
         facebook: {
            type: String
          },
        youtube : {
            type: String
          },
         Whatsapp_number : {
            type: String  
          },   
    }
  ]


},
{
    timestamps : true
});
module.exports = mongoose.model('Profile', ProfileSchema);