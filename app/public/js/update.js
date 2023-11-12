const updateButton = document.getElementById('update-button');

updateButton.addEventListener('click', updatePost);

function updatePost() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('postId');

    // 제목과 내용을 가져오기
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    // 데이터를 서버로 전달
    const requestData = {
        title: title,
        content: content,
    };

    fetch(`/board/update-post/?postId=${postId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
    })
        .then((res) => res.json())
        .then((res) => {
            if (res.success) {
                alert(res.message);
                location.href = '/main';
            } else {
                alert(res.message);
            }
        })
        .catch((err) => console.error(error));
}
