import { Router } from "express";
import Areas from "../controllers/areas";
import { validateToken } from "../middlewares/validate_token";

const router = Router();
const areas = new Areas();

router.get('/',[
    validateToken
],areas.getAll)

export default router;