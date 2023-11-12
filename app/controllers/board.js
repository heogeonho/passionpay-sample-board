const User = require('../schemas/user');

exports.createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const newPost = {
            title: title,
            content: content,
        };
        if (req.isAuthenticated()) {
            const id = req.user.id;
            const user = await User.findById({ _id: id }).exec();
            if (user) {
                user.board.push({$each: [newPost], $position: 0 });
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

exports.deletePost = async (req, res) => {
    const postId = req.params.postId;

    try {
        const id = req.user.id;
        const user = await User.findById({ _id: id }).exec();
        user.board.remove({_id: postId});
        await user.save();
        res.json({success: true, message:'게시물이 삭제되었습니다.'});
    } catch (err) {
        res.json({success: false, message:'실패!'});
        console.error(err);
    }
};

exports.updatePost = async (req, res) => {
    try {
        const postId = req.query.postId;
        const newData = req.body

        const user = await User.findById({ _id: req.user.id }).exec();
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
    
        const postToUpdate = user.board.id(postId);
        if (!postToUpdate) {
            return res.status(404).json({ message: 'Post not found' });
        }
    
        postToUpdate.title = newData.title;
        postToUpdate.content = newData.content;
    
        await user.save();
        res.json({success: true, message:'수정이 완료되었습니다.'});
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: '게시물 수정 중 오류가 발생했습니다.' });
    }   
}