const mongoose = require('mongoose');
const { Schema } = mongoose;
// 데이터베이스 테이블을 만드는 과정을 생각하면 됩니다

// 게시글 스키마
const postSchema = new Schema({
    postId: String,
    title: String,
    content: String,
});

// 유저(user) 스키마
const userSchema = new Schema({
    snsId: {
        type: String,
        required: true,
        unique: true,
    },
    nick: String,
    board: [postSchema], // 중첩된 배열 형태로 postSchema를 포함
});

module.exports = mongoose.model('User', userSchema);
