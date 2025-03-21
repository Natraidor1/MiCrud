
const clientsController = {};

import clientsModel from "../models/Clients.js";

clientsController.getClients = async (req, res) => {
    const clients = await clientsModel.find();
    res.json(clients);
  };

  clientsController.insertClients = async (req, res) => {
    const { name, lastName, birthday, email, password, telephone, dui, isVerified} = req.body;
    const newClient = new clientsModel({ name, lastName, birthday, email, password, telephone, dui, isVerified });
    await newClient.save();
    res.json({ message: "Client saved" });
  };

  clientsController.deleteClients = async (req, res) => {
    await clientsModel.findByIdAndDelete(req.params.id);
    res.json({ message: "client deleted" });
  };

  clientsController.updateClients = async (req, res) => {
    const {  name, lastName, birthday, email, password, telephone, dui, isVerified} = req.body;
    const updateClients = await clientsModel.findByIdAndUpdate(
      req.params.id,
      {  name, lastName, birthday, email, password, telephone, dui, isVerified },
      { new: true }
    );
    res.json({ message: "client updated successfully" });
  };
  
  export default clientsController;