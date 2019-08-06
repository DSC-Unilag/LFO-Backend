import AdminController from '../controllers/admin';
import AdminMiddleware from '../middlewares/admin';

export default ({
    express,
    AdminModel,
    bcrypt,
    trimRequest,
    joi,
    authController,
}) => {
    const adminMiddleware = AdminMiddleware({joi});
    const adminController = AdminController({
        AdminModel,
        bcrypt,
        authController,
    });
    const router = express.Router();

    router.post(
        '/signup',
        trimRequest.body,
        adminMiddleware.validateSignUp,
        adminController.adminSignup
    );

    router.post(
        '/login',
        trimRequest.body,
        adminMiddleware.validateLogin,
        adminController.adminLogin
    );

    return router;
};
