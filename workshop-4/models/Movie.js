const { ObjectId } = require('mongodb')
const {Schema,SchemaTypes:Types,model} = require('mongoose')


const movieSchema = new Schema({
    title:{
        type:String,
        required:true,
        minLength:[5,'Must be atleast 5 characters long'],
        match:[/^[a-z0-9 ]+$/gi,'Must contain English letters, numbers and whitespaces']
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
        min:1900,
        max:2024
    } ,
    imageURL:{
        type:String,
        required:true,
        match: /^http?:\/\/.+/
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
        minLength:20,
        maxLength:1000,
    },
    cast:{
        type:[Types.ObjectId],
        ref:'Cast',
        default:[]
    },
    author:{
        type: Types.ObjectId,
        ref: 'User'
    }
})

const Movie = model('Movie',movieSchema)


module.exports = {Movie}