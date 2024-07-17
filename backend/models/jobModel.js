const mongoose = require("mongoose");

const jobModel = new mongoose.Schema(
  {
   company:[{type: mongoose.Schema.Types.ObjectId,
    ref: "Employe"}]
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobModel);
module.exports = Job;
