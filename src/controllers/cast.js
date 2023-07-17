import { error } from 'console'
import fs from 'fs'
import Joi from 'joi'
// Model
const cast = [
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
    name: Joi.string().min(3).required().messages({
        'any.required':"Trường {{#label}} là bắt buộc",
        'string.empty': " Trường {{#label}} không được để trống",
        "string.min": "{{#label}} tối thiểu 3 ký tự"
    }),
    
})

export const getAllcast = function (req, res) {
    if (cast) {
        res.status(200).send(cast)
    } else {
        res.status(500).send({
            message: "Server internal errors"
        })
    }
    res.end()
}

export const getcastById = function (req, res) {
    const { id } = req.params
    const movie = cast.find(m => m.id == id)
    res.send(cast)
    res.end()
}

export const UpdateById = function (req, res) {
    const { id } = req.params
    const index = cast.findIndex(movie => movie.id == id)
    const data = { ... req.body}
    console.log(data)
    const { error } = schema.validate(data)
    if(!error){
        if (index !== -1) {
            cast[index] = { ...cast[index], ... req.body}
            res.send(cast[index])
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


export const createcast = function (req, res) {
    const data = { ...req.body, id: Date.now() }
    const { error } = schema.validate(data)
    if (!error) {
        cast.push(data)
        res.send(cast)
        console.log(1)
    } else {
        res.status(400).send({
            message: error.details[0].message
        })
    }
    res.end()
}

export const Deletecast = function (req, res) {
    const { id } = req.params
    const index = cast.findIndex(movie => movie.id == id)
    if (index !== -1) {
        cast.splice(index, 1)
        res.send(cast)
        console.log(`Đã xóa sản phẩm  id ${id}`);
      } else {
        console.log(`Không thấy sản phẩm id ${id}`);
      }
    res.end()
}