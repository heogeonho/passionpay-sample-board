const deleteButtons = document.querySelectorAll('.delete-button');

deleteButtons.forEach((button) => {
    const postId = button.getAttribute('data-post-id');
    button.addEventListener('click', () => deletePost(postId));
});

function deletePost(postId) {
    fetch(`/board/delete-post/${postId}`, {
        method: 'DELETE',
    })
        .then((res) => res.json())
        .then((res) => {
            if (res.success) {
                alert(res.message);
                location.href = 'main';
            } else {
                alert(res.message);
            }
        })
        .catch((error) => {
            console.error(error);
        });
}

const updateButton = document.querySelectorAll('.update-button');

updateButton.forEach((button) => {
    const postId = button.getAttribute('data-post-id');
    button.addEventListener('click', () => updatePostPage(postId));
});

function updatePostPage(postId) {
    window.location.href = `/update/?${postId}`;
}