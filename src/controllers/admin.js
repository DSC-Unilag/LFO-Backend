import {ApiError, handleApiError} from '../util/logger/api';

export default ({AdminModel, bcrypt, authController}) => {
    const adminSignup = async (req, res) => {
        try {
            const {name, email, phone, password} = req.body;
            const hash = await bcrypt.hash(password, 10);
            const admin = await AdminModel.create({
                name,
                email,
                phone,
                password: hash,
            });
            if (!admin) {
                throw new ApiError('Failed to create Admin', 'server');
            }
            const validAdmin = {
                id: admin.id,
                name: admin.name,
                email: admin.email,
                phone: admin.phone,
            };
            const token = authController.signAdminToken(validAdmin);
            return res.status(201).json({
                status: 'success',
                message: 'Admin Registered',
                token: `Bearer ${token}`,
                admin: validAdmin,
            });
        } catch (error) {
            return handleApiError(res, error);
        }
    };

    const adminLogin = async (req, res) => {
        try {
            const {email, password} = req.body;
            const admin = await AdminModel.findOne({where: {email}});
            if (!admin) {
                throw new ApiError(
                    'Admin with that email does not exist',
                    'validation'
                );
            }
            const result = await bcrypt.compare(password, admin.password);
            if (!result) {
                throw new ApiError(
                    "Password doesn't match our records",
                    'validation'
                );
            }
            const validAdmin = {
                id: admin.id,
                name: admin.name,
                email: admin.email,
                phone: admin.phone,
            };
            const token = authController.signAdminToken(validAdmin);
            return res.status(200).json({
                status: 'success',
                message: 'Admin Logged In',
                token: `Bearer ${token}`,
                admin: validAdmin,
            });
        } catch (error) {
            return handleApiError(res, error);
        }
    };
    return {
        adminSignup,
        adminLogin,
    };
};
