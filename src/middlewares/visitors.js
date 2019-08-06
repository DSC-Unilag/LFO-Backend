export default ({joi: Joi}) => {
    const validateAddNewVisitor = async (req, res, next) => {
        try {
            const schema = {
                fullName: Joi.string().required(),
                email: Joi.email().required(),
                description: Joi.string().required(),
                date: Joi.string().required(),
                phone: Joi.string()
                    .min(11)
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
        validateAddNewVisitor,
    };
};
