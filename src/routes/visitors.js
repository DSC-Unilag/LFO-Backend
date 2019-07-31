import VisitorController from "../controllers/visitors";

export default ({ express, VisitorModel }) => {
	const visitorController = VisitorController({ VisitorModel });
	const router = express.Router();

	router.get("/", visitorController.getAllVisitors);
	router.post("/", visitorController.addVisitor);
	router.get("/:id", visitorController.getSingleVisitor);

	return router;
};
