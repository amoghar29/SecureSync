import { Router } from "express";
import { signup } from "../controllers/auth/signup";
import { signin } from "../controllers/auth/signin";
import { signout } from "../controllers/auth/signout";
const router: Router = Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signout", signout);

export default router;
