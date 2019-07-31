import WardController from "../controllers/wards";

export default ({
	express,
	WardModel,
	MedicalModel,
	cloudinary,
	trimRequest
}) => {
	const wardController = WardController({
		WardModel,
		MedicalModel,
		cloudinary
	});
	const router = express.Router();

    router.get("/", wardController.getAllWards);
    
    router.get("/adopted", wardController.getAdoptedWards);

	router.get("/:id", wardController.getSingleWard);

	router.post("/", trimRequest.body, wardController.addWard);

	router.put(
		"/:id/adopt",
		trimRequest.body,
		wardController.updateAdoptionStatus
	);

	router.delete("/:id", wardController.deleteWard);

	return router;
};
