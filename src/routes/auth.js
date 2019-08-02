import AdminController from '../controllers/admin';
import AuthMiddleware from '../controllers/auth';
import AdminMiddleware from '../middlewares/admin';

export default ({express, AdminModel, jwt, bcrypt, trimRequest, joi}) => {
    const authMiddleware = AuthMiddleware({jwt});
    const adminMiddleware = AdminMiddleware({joi});
    const adminController = AdminController({
        AdminModel,
        bcrypt,
        authMiddleware,
    });
    const router = express.Router();

    router.post(
        '/signup',
        adminMiddleware.validateSignUp,
        trimRequest.body,
        authMiddleware.signAdminToken,
        adminController.adminSignup
    );

    router.post(
        '/login',
        adminMiddleware.validateLogin,
        trimRequest.body,
        authMiddleware.verifyToken,
        adminController.adminLogin
    );

    return router;
};
