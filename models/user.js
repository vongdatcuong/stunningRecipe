const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcryptjs');
const constant = require('../Utils/constant');

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
    }
};