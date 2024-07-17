const mongoose = require("mongoose");

const jobModel = new mongoose.Schema(
  {
   company:[{type: mongoose.Schema.Types.ObjectId,
    ref: "Employe"}],
    profile:{
        type:String,
        required:true
    },
    skills:{
        type:String
    },
    interntype:{
        type:String,
        required:true
    },
    openings:{
        type:String,
        required:true

    },
    start:{
        type:String,
        required:true
    },
    duration:{
        type:String,
        required:true
    },
    responsibity:{
        type:Array,
        required:true
    },
    stipend:{
        type:Object,
        required:true
    }
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobModel);
module.exports = Job;
