import { Router } from 'express'
import { addMoviePage, createMovie, getAllMovies, getMovieById, UpdateById, DeleteMovie} from '../controllers/movies'

const router = Router()
router.get("/", getAllMovies)
router.get("/add", addMoviePage)
// Dynamic routing
router.get("/:id", getMovieById)
router.delete("/delete/:id", DeleteMovie)
router.put("/update/:id", UpdateById)
router.post("/", createMovie)

export default router