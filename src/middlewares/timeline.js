export default ({joi: Joi}) => {
    const validateAddNewTimeline = async (req, res, next) => {
        try {
            const schema = {
                description: Joi.string().required(),
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

    const validateUpdateTimeline = async (req, res, next) => {
        try {
            const schema = {
                description: Joi.string().allow('', null),
            };
            await Joi.validate(req.body, schema);
            if (req.files !== null) {
                const imageMimes = ['image/jpeg', 'image/jpg', 'image/png'];
                if (!imageMimes.includes(req.files.image.mimetype)) {
                    throw new Error('Only JPG, JPEG & PNG Images are allowed');
                }
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
        validateAddNewTimeline,
        validateUpdateTimeline,
    };
};
