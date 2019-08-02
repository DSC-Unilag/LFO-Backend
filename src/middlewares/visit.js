export default ({joi}) => {
    const validateAddNewVisit = async (req, res, next) => {
        try {
            const schema = {
                fullName: Joi.string().required(),
                organization: Joi.organization().required(),
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
                message: String(err.details[0].message),
                type: 'validation',
            });
        }
    };

    return {
        validateAddNewVisit,
    };
};
