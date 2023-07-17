import { Router } from 'express'
import {  createcast, getAllcast, getcastById, UpdateById, Deletecast} from '../controllers/cast'

const router = Router()
router.get("/", getAllcast)
// Dynamic routing
router.get("/:id", getcastById)
router.delete("/delete/:id", Deletecast)
router.put("/update/:id", UpdateById)
router.post("/", createcast)
export default router