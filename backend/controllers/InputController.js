import Inputs from "../models/InputModels.js";
import ErrorResponse from "../utils/errorResponse.js";


export const getInputs = async (req, res) =>{
    try {
        const inputs = await Inputs.find();
        res.json(inputs);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getInputsById = async (req, res) =>{
    try {
        const inputs = await Inputs.findById(req.params.id);
        res.json(inputs);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const saveInputs = async (req, res) =>{
    const { date, time, area, report, image, latitude, longitude, status, petugas } = new Inputs(req.body);
    
    // const imageData = "data:image/png;base64," + Buffer.from(image).toString('base64');
    try {

    const input = new Inputs({
      date,
      time,
      area,
      report,
      image,
      latitude,
      longitude,
      status,
      petugas
    //   user: req.user.id
    });
        const insertedinput = await input.save()
        res.status(200).json(insertedinput);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const updateInputsById = async (req, res) =>{
    const { id } = req.params;
    const { status } = req.body;
    try {
        const updateInputs = await Inputs.findByIdAndUpdate(id, {status}, {new: true});
        res.status(200).json(updateInputs);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const deleteInputsById = async (req, res) =>{
    const { id } = req.params;
    try {
        const deleteInputs = await Inputs.findByIdAndDelete(id);
        if (!deleteInputs) {
            res.status(404).json({error: "Data not found"});
        }
        res.status(200).json(deleteInputs);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}