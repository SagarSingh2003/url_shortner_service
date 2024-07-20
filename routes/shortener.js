import {Router} from "express";
import urlOperations from "../controller/urlOperations.js";

const router = Router();


router.get("/" , urlOperations.generateLink);

export default router;