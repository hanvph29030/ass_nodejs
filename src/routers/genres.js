import { Router } from 'express'
import { createGenres, getAllGenres, getGenresById, UpdateById, DeleteGenres} from '../controllers/genres'

const router = Router()
router.get("/", getAllGenres)
// Dynamic routing
router.get("/:id", getGenresById)
router.delete("/delete/:id", DeleteGenres)
router.put("/update/:id", UpdateById)
router.post("/", createGenres)
export default router