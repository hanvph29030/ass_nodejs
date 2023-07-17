import { error } from 'console'
import fs from 'fs'
import Joi from 'joi'
// Model
const genres = [
    {
        "id": 1,
        "name": "Horor"
    },
    {
        "id": 2,
        "name": "Comedy"
    },
    {
        "id": 3,
        "name": "Drama"
    },
    {
        "id": 4,
        "name": "Science Fiction"
    },
    {
        "id": 5,
        "name": "Action"
    },
    

]

// Controller
const schema = Joi.object({
    id: Joi.number(),
    name: Joi.string().min(10).required().messages({
        'any.required':"Trường {{#label}} là bắt buộc",
        'string.empty': "Trường {{#label}} không được để trống",
        "string.min": "Trường {{#label}} tối thiểu 10 ký tự"
    }),
    
})

export const getAllGenres = function (req, res) {
    if (genres) {
        res.status(200).send(genres)
    } else {
        res.status(500).send({
            message: "Server internal errors"
        })
    }
    res.end()
}

export const getGenresById = function (req, res) {
    const { id } = req.params
    const movie = genres.find(m => m.id == id)
    res.send(genres)
    res.end()
}

export const UpdateById = function (req, res) {
    const { id } = req.params
    const index = genres.findIndex(movie => movie.id == id)
    const data = { ... req.body}
    console.log(data)
    const { error } = schema.validate(data)
    if(!error){
        if (index !== -1) {
            genres[index] = { ...genres[index], ... req.body}
            res.send(genres[index])
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


export const createGenres = function (req, res) {
    const data = { ...req.body, id: Date.now() }
    const { error } = schema.validate(data)
    if (!error) {
        genres.push(data)
        res.send(genres)
        console.log(1)
    } else {
        res.status(400).send({
            message: error.details[0].message
        })
    }
    res.end()
}

export const DeleteGenres = function (req, res) {
    const { id } = req.params
    const index = genres.findIndex(movie => movie.id == id)
    if (index !== -1) {
        genres.splice(index, 1)
        res.send(genres)
        console.log(`Đã xóa sản phẩm  id ${id}`);
      } else {
        console.log(`Không thấy sản phẩm id ${id}`);
      }
    res.end()
}