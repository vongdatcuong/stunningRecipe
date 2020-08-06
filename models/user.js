const mongoose = require('mongoose');
const User = mongoose.model('User');
const UserFavoriteDish = mongoose.model('UserFavoriteDish');
const bcrypt = require('bcryptjs');
const constant = require('../Utils/constant');
const azureBlob = require('./azure_blob');

module.exports = {
    findUsername(username) {
        return User.findOne({ username: username }).exec();
    },
    findEmail(email) {
        return User.findOne({ email: email }).exec();
    },
    addUser(firstName, lastName, username, email, phone, password) {
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, constant.SALT_ROUNDS, (err, hash) => {
                today = new Date();
                const newUser = new User({
                    firstName: firstName,
                    lastName: lastName,
                    username: username,
                    email: email,
                    phone: phone,
                    password: hash,
                    gender: "",
                    birthDate: today,
                    address: "",
                    avatar: "avatar_default.png",
                    createdDate: today,
                    isActive: true
                });
                try {
                    newUser.save(function(err) {
                        if (err) {
                            resolve(false);
                        } else {
                            resolve(true);
                        }
                    });
                } catch (err) {
                    console.log('error at signUp' + err);
                }
            })
        })
    },
    getUser(userID) {
        return User.findOne({ userID: userID }).exec();
    },
    setPassword(userID, pwdNew) {
        hash = bcrypt.hashSync(pwdNew, constant.SALT_ROUND);
        return User.findOneAndUpdate({ userID: userID }, {
            password: hash
        }).exec();
    },
    setUserInfo(userID, info) {
        return User.findOneAndUpdate({ userID: userID }, {
            firstName: info.firstName || "",
            lastName: info.lastName || "",
            gender: info.gender || "",
            email: info.email || "",
            birthDate: info.birthDate || "",
            phone: info.phone || "",
            address: info.address || ""
        }).exec();
    },
    async uploadUserImageModel(userID, image) {
        const extension = image.originalname.slice(image.originalname.lastIndexOf('.'));
        return await azureBlob.uploadImage(userID, image, extension);
    },
    setUserUrlImage(userID, urlImage) {
        User.findOneAndUpdate({ userID: userID }, { avatar: urlImage }).exec();
    },
    getUserFavoriteDishes(userID, dishIDs) {
        return UserFavoriteDish.find({
            userID: userID, 
            dishID: {$in: dishIDs}
        })
            .select({dishID: 1})
            .exec();
    }
};