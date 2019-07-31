import AdminController from '../controllers/admin';
import AuthController from '../controllers/auth';

export default ({express, AdminModel, jwt, bcrypt, trimRequest}) => {
    const authController = AuthController({jwt});
    const adminController = AdminController({
        AdminModel,
        bcrypt,
        authController,
    });
    const router = express.Router();

    router.post('/signup', trimRequest.body, adminController.adminSignup);

    router.post('/login', trimRequest.body, adminController.adminLogin);

    return router;
};
