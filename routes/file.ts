import { Router } from "express";
import { upload } from "../controllers/file";

const router = Router();

router.post('/', upload.single('file'), function (req, res) {
    const file = req.file;

    res
        .status(200)
        .json(file.filename)
});

export default router;