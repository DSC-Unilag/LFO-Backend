export default ({joi: Joi}) => {
    const validateAddNewWard = async (req, res, next) => {
        try {
            const schema = {
                name: Joi.string().required(),
                age: Joi.string().required(),
                school: Joi.string().required(),
                origin: Joi.string().required(),
                date_admitted: Joi.string().required(),
                height: Joi.string().required(),
                weight: Joi.string().required(),
                blood_group: Joi.string().required(),
                genotype: Joi.string().required(),
                adopted: Joi.boolean(),
            };
            await Joi.validate(req.body, schema);
            if (req.files === null) {
                throw new Error('Meal Image Required');
            }
            const imageMimes = ['image/jpeg', 'image/jpg', 'image/png'];
            if (!imageMimes.includes(req.files.image.mimetype)) {
                throw new Error('Only JPG, JPEG & PNG Images are allowed');
            }
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
        validateAddNewWard,
    };
};
