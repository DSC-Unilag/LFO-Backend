export default ({joi: Joi}) => {
    const validateAddNewDonation = async (req, res, next) => {
        try {
            const schema = {
                name: Joi.string().required(),
                description: Joi.string().required(),
                amount: Joi.number()
                    .min(1)
                    .required(),
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
        validateAddNewDonation,
    };
};
