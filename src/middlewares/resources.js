export default ({joi}) => {
    const validateAddNewResource = async (req, res, next) => {
        try {
            const schema = {
                type: Joi.string().required(),
                description: Joi.string().required(),
                quantity: Joi.number()
                    .min(1)
                    .required(),
            };
            await Joi.validate(req.body, schema);
            next();
        } catch (err) {
            return res.status(400).json({
                status: 'error',
                message: String(err.details[0].message),
                type: 'validation',
            });
        }
    };

    const validateUpdateResource = async (req, res, next) => {
        try {
            const schema = {
                type: Joi.string().allow('', null),
                description: Joi.string().allow('', null),
                quantity: Joi.number()
                    .min(1)
                    .allow('', null),
            };
            await Joi.validate(req.body, schema);
            next();
        } catch (err) {
            return res.status(400).json({
                status: 'error',
                message: String(err.details[0].message),
                type: 'validation',
            });
        }
    };

    return {
        validateAddNewResource,
        validateUpdateResource,
    };
};
