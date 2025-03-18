const evaluationsController = {}

import EvaluationsModel from "../models/Evaluations.js"

evaluationsController.getEvaluations = async(req, res)=>{
    const evaluations = await EvaluationsModel.find();
    res.json(evaluations);
};

evaluationsController.insertEvaluations = async(req, res)=>{
    const{comment, grade, role, idEmployee} = req.body;
    const newEvaluations = new EvaluationsModel({comment, grade, role, idEmployee});
    await newEvaluations.save();
    res.json({message:"Evaluation saved"})
};

evaluationsController.deleteEvaluations= async (req, res) => {
    await EvaluationsModel.findByIdAndDelete(req.params.id);
    res.json({message:"Evaluation deleted"})
};

evaluationsController.updateEvaluation= async (req, res) => {
    const {comment, grade, role, idEmployee} = req.body;
    const updateEvaluation = await EvaluationsModel.findByIdAndUpdate(
      req.params.id,
      { comment, grade, role, idEmployee},
      { new: true }
    );
    res.json({ message: "evaluation updated successfully" });
  };

  export default evaluationsController;
