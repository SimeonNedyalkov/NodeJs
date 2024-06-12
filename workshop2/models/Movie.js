const { ObjectId } = require('mongodb')
const {Schema,SchemaTypes:Types,model} = require('mongoose')

const movieSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    genre:{
        type:String,
        required:true,
    },
    director:{
        type:String,
        required:true,
    },
    year:{
        type:Number,
        required:true,
        min:1878,
        max:2025
    } ,
    imageURL:{
        type:String,
        required:true,
        regexp: /^http?:\/\/.+/
    },
    rating:{
        type:Number,
        required:true,
        min:0,
        max:10
    },
    description:{
        type:String,
        required:true,
    },
    cast:{
        type:[Types.ObjectId],
        ref:'Cast',
        default:[]
    }
})

const Movie = model('Movie',movieSchema)


module.exports = {Movie}