const employeesController = {}

import EmployeesModel from "../models/Employees.js"

employeesController.getEmployees = async(req, res)=>{
    const employees = await EmployeesModel.find();
    res.json(employees);
};

employeesController.insertEmployees = async(req, res)=>{
    const{name, lastName, birthday, email, address, hireDate, password, telephone,dui, isssNumber, isVerified} = req.body;
    const newEmployees = new EmployeesModel({name, lastName, birthday, email, address, hireDate, password, telephone,dui, isssNumber, isVerified});
    await newEmployees.save();
    res.json({message:"Employee saved"})
};

employeesController.deleteEmployees= async (req, res) => {
    await EmployeesModel.findByIdAndDelete(req.params.id);
    res.json({message:"employee deleted"})
};

employeesController.updateEmployees = async (req, res) => {
    const { name, lastName, birthday, email, address, hireDate, password, telephone,dui, isssNumber, isVerified} = req.body;
    const updateEmployees = await EmployeesModel.findByIdAndUpdate(
      req.params.id,
      {  name, lastName, birthday, email, address, hireDate, password, telephone,dui, isssNumber, isVerified},
      { new: true }
    );
    res.json({ message: "employee updated successfully" });
  };

  export default employeesController;
  