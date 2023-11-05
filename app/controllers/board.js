const User = require('../schemas/user');

exports.createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const newPost = {
            title: title,
            content: content,
        };
        if (req.isAuthenticated()) {
            const snsId = req.user.id;
            const user = await User.findById({ _id: snsId }).exec();
            if (user) {
                user.board.push(newPost);
                await user.save();
                res.json({ success: true, message: '게시물이 성공적으로 저장되었습니다!' });
            }
        } else {
            res.json({ success: false, message: '사용자 정보가 잘못되었습니다.' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: '게시물 생성 중 오류가 발생했습니다.' });
    }
};