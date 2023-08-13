import usersModel from "./users-model.js";



export const findAllUsers = () =>   usersModel.find();


export const findUserById = (id) => {
   return usersModel.findById(id);

};


export const findUserByUsername = (username) => {
    return usersModel.findOne({ username });

};


export const findUserByCredentials = (username, password) => {
    return usersModel.findOne({ username, password });

};


export const createUser = (user) =>   usersModel.create(user);



export const updateUser = (id,user) => {

   return  usersModel.updateOne({ _id: id }, { $set: user });

};
export const deleteUser = (id) => {
    return usersModel.deleteOne({ _id: id });

};
