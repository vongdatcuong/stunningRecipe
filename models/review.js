const mongoose = require('mongoose');
const Review = mongoose.model('Review');
const constant = require('../Utils/constant');


module.exports = {
    // getComments(query, option) {
    //     option = option || {};
    //     let findPromise = Comment.find(query)
    //         .select({});
    //     if (option.perPage) {
    //         findPromise = findPromise.limit(option.perPage);
    //         if (option.page) {
    //             findPromise = findPromise.skip(option.perPage * (option.page - 1));
    //         }
    //     }
    //     if (option.sort) {
    //         findPromise = findPromise.sort(option.sort);
    //     }
    //     return findPromise
    //         .populate('user')
    //         .exec();
    // },
    // getCountComment(query) {
    //     return Comment.count(query).exec();
    // },
    // Add comment
    async addReview(dishID, userID, rating, content) {
        return new Review({
            dishID: dishID,
            userID: userID,
            rating: rating,
            content: content,
            createdDate: Date.now()
        }).save();
    }
};