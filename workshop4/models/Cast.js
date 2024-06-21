const { ObjectId } = require('mongodb')
const {Schema,SchemaTypes:Types,model} = require('mongoose')
const castSchema = new Schema({
    name : {type:String, required:true},

    age : {type:Number, required:true,min:1,max:100},

    born : {type:String, required:true},

    nameInMovie : {type:String, required:true},

    castImage : {type:String, required:true, regexp: /^https?:\/\/.+/},

    movie : {
        type:Types.ObjectId,
        ref:'Movie'
    }
})
const Cast = model('Cast',castSchema)

module.exports = {Cast}