document.addEventListener('DOMContentLoaded', function() {
    const userId = '_id'; 
    fetchUserReplies(userId);
});

function fetchUserReplies(userId) {
    fetch(`/user-questions-and-replies/${userId}`)
        .then(response => response.json())
        .then(questions => {
            const messagesList = document.getElementById('messagesList');
            messagesList.innerHTML = '';

            questions.forEach(reply => {
                const li = document.createElement('li');
                li.textContent = reply.reply;
                messagesList.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching replies:', error));
}
