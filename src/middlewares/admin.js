export default ({joi: Joi}) => {
    const validateSignUp = async (req, res, next) => {
        try {
            const schema = {
                name: Joi.string().required(),
                email: Joi.string()
                    .email()
                    .required(),
                phone: Joi.number()
                    .min(11)
                    .required(),
                password: Joi.string()
                    .min(7)
                    .required(),
            };
            await Joi.validate(req.body, schema);
            next();
        } catch (err) {
            return res.status(400).json({
                status: 'error',
                message: err.message,
                type: 'validation',
            });
        }
    };

    const validateLogin = async (req, res, next) => {
        try {
            const schema = {
                email: Joi.string()
                    .email()
                    .required(),
                password: Joi.string()
                    .min(7)
                    .required(),
            };
            await Joi.validate(req.body, schema);
            next();
        } catch (err) {
            return res.status(400).json({
                status: 'error',
                message: err.message,
                type: 'validation',
            });
        }
    };

    return {
        validateSignUp,
        validateLogin,
    };
};
