const joi = require("joi");

module.exports = {

    async validate(schema, data) {
        try {
            await schema.validateAsync(data);
            return false;

        } catch ({ details: [error] }) {
            return error.message
        }
    },
    signUpSchema: joi.object({
        firstname: joi.string().min(2).required(),
        lastname: joi.string().required(),
        email: joi.string().email().required(),
        mobile: joi.number().positive().min(10).required(),
        password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        cpassword: joi.ref("password")
    }),

    signInSchema: joi.object({
        email: joi.string().email().required(),
        password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    }),


    postSchema: joi.object({
        Name: joi.string().required(),
        Reviews: joi.string().required(),
        NoOfShows: joi.string().required(),
        NoOfSeats: joi.string().required(),
        ACFacility: joi.boolean().required(),
        movies: joi.array().items(
            joi.object({
            Title: joi.string().required(),
            Timing: joi.string().required(),
            Rate: joi.number().required(),
            Reviews: joi.string().required(),
    })
        ),
    })
}