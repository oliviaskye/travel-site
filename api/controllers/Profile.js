import User from '../models/Auth.js';


export const findUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
    if (!result){
        res.send("Not found").status(404);}
    else {
    res.send(result).status(200);}
       
}
