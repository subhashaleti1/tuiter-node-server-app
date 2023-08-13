import mongoose from 'mongoose';
const schema = mongoose.Schema({
    tuit: String,
    likes: Number,
    liked: Boolean,
    dislikes:Number,
    handle:String,
    image:String,
    replies:Number,
    retuits:Number,
    time:String,
    title:String,
    topic:String,
    username:String
}, {collection: 'tuits'});
export default schema;