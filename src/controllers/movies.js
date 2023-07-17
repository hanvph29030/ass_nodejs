import { error } from 'console'
import fs from 'fs'
import Joi from 'joi'
// Model
const movies = [
    {
        "id": 1,
        "title": "The Grudge",
        "year": 2020,
        "cast": [
            "Andrea Riseborough",
            "Demián Bichir",
            "John Cho",
            "Betty Gilpin",
            "Lin Shaye",
            "Jacki Weaver"
        ],
        "genres": [
            "Horror",
            "Supernatural"
        ],
        "href": "The_Grudge_(2020_film)",
        "extract": "The Grudge is a 2020 American psychological supernatural horror film written and directed by Nicolas Pesce. Originally announced as a reboot of the 2004 American remake and the original 2002 Japanese horror film Ju-On: The Grudge, the film ended up taking place before and during the events of the 2004 film and its two direct sequels, and is the fourth installment in the American The Grudge film series. The film stars Andrea Riseborough, Demián Bichir, John Cho, Betty Gilpin, Lin Shaye, and Jacki Weaver, and follows a police officer who investigates several murders that are seemingly connected to a single house.",
        "thumbnail": "https://upload.wikimedia.org/wikipedia/en/3/34/The_Grudge_2020_Poster.jpeg",
    },
    {
        "id": 2,
        "title": "Underwater",
        "year": 2020,
        "cast": [
            "Kristen Stewart",
            "Vincent Cassel",
            "Jessica Henwick",
            "John Gallagher Jr.",
            "Mamoudou Athie",
            "T.J. Miller"
        ],
        "genres": [
            "Action",
            "Horror",
            "Science Fiction"
        ],
        "href": "Underwater_(film)",
        "extract": "Underwater is a 2020 American science fiction action horror film directed by William Eubank. The film stars Kristen Stewart, Vincent Cassel, Jessica Henwick, John Gallagher Jr., Mamoudou Athie, and T.J. Miller.",
        "thumbnail": "https://upload.wikimedia.org/wikipedia/en/4/4a/Underwater_poster.jpeg",
    },
    {
        "id": 3,
        "title": "Like a Boss",
        "year": 2020,
        "cast": [
            "Tiffany Haddish",
            "Rose Byrne",
            "Salma Hayek",
            "Jennifer Coolidge",
            "Billy Porter"
        ],
        "genres": [
            "Comedy"
        ],
        "href": "Like_a_Boss_(film)",
        "extract": "Like a Boss is a 2020 American comedy film directed by Miguel Arteta, written by Sam Pitman and Adam Cole-Kelly, and starring Tiffany Haddish, Rose Byrne, and Salma Hayek. The plot follows two friends who attempt to take back control of their cosmetics company from an industry titan.",
        "thumbnail": "https://upload.wikimedia.org/wikipedia/en/9/9a/LikeaBossPoster.jpg",
    },
    {
        "id": 4,
        "title": "Three Christs",
        "year": 2020,
        "cast": [
            "Richard Gere",
            "Peter Dinklage",
            "Walton Goggins",
            "Bradley Whitford"
        ],
        "genres": [
            "Drama"
        ],
        "href": "Three_Christs",
        "extract": "Three Christs, also known as State of Mind, is a 2017 American drama film directed, co-produced, and co-written by Jon Avnet and based on Milton Rokeach's nonfiction book The Three Christs of Ypsilanti. It screened in the Gala Presentations section at the 2017 Toronto International Film Festival. The film is also known as: Three Christs of Ypsilanti, The Three Christs of Ypsilanti, Three Christs of Santa Monica, and The Three Christs of Santa Monica.",
        "thumbnail": "https://upload.wikimedia.org/wikipedia/en/a/a1/Three_Christs_poster.jpg",
    }
]

// Controller
const schema = Joi.object({
    id: Joi.number(),
    title: Joi.string().min(10).required().messages({
        'any.required':"Trường {{#label}} là bắt buộc",
        'string.empty': "Trường {{#label}} không để trống",
        "string.min": "{{#label}} tối thiểu 10 ký tự"
    }),
    genres: Joi.array().items(Joi.string()).min(1).messages({
        'array.base': "Trường {{#label}} phải là một mảng",
        'array.min': "Trường {{#label}} phải có 1 phần tử",
    }),
    cast: Joi.array().items(Joi.string()).min(1).messages({
        'array.base': "Trường {{#label}} phải là một mảng",
        'array.min': "Trường {{#label}} phải có 1 phần tử",
    }),
    year:Joi.number().required().max(2100).messages({
        'any.required':"Trường {{#label}} là bắt buộc",
        'number.base': "Trường {{#label}} phải là một số",
        'number.empty': "Trường {{#label}} là bắt buộc",
        "number.max": "Trường {{#label}} không được vượt quá 2100"
    }),
    href: Joi.string().messages({
        'string.base': "Trường {{#label}} phải là string ",
        "string.min": "{{#label}} tối thiểu 10 ký tự"
    }),
    extract: Joi.string().messages({
        'string.base': "Trường {{#label}} phải là string ",
        "string.min": "{{#label}} tối thiểu 10 ký tự"
    }),
    thumbnail: Joi.string().messages({
        'string.base': "Trường {{#label}} phải là string ",
        "string.min": "{{#label}} tối thiểu 10 ký tự"
    }),
})

export const getAllMovies = function (req, res) {
    if (movies) {
        res.status(200).send(movies)
    } else {
        res.status(500).send({
            message: "Server internal errors"
        })
    }
    res.end()
}

export const getMovieById = function (req, res) {
    const { id } = req.params
    const movie = movies.find(m => m.id == id)
    res.send(movie)
    res.end()
}

export const UpdateById = function (req, res) {
    const { id } = req.params
    const index = movies.findIndex(movie => movie.id == id)
    const data = { ... req.body}
    console.log(data)
    const { error } = schema.validate(data)
    if(!error){
        if (index !== -1) {
            movies[index] = { ...movies[index], ... req.body}
            res.send(movies[index])
            console.log(`Đã cập nhật sản phẩm  id ${id}`);
        } else {
            console.log(`Không thấy sản phẩm id ${id}`);
        }
    }
    else{
        res.status(400).send({
            message: error.details[0].message
        })
    }
    res.end()
}
export const addMoviePage = function (req, res) {
    const html = fs.readFileSync('./src/pages/add.html', "utf-8")
    res.send(html)
    res.end()
}

export const createMovie = function (req, res) {
    const data = { ...req.body, id: Date.now() }
    const { error } = schema.validate(data)
    if (!error) {
        movies.push(data)
        res.send(movies)
        console.log(1);
    } else {
        res.status(400).send({
            message: error.details[0].message
        })
    }
    res.end()
}

export const DeleteMovie = function (req, res) {
    const { id } = req.params
    const index = movies.findIndex(movie => movie.id == id)
    if (index !== -1) {
        movies.splice(index, 1)
        res.send(movies)
        console.log(`Đã xóa sản phẩm  id ${id}`);
      } else {
        console.log(`Không thấy sản phẩm id ${id}`);
      }
    res.end()
}