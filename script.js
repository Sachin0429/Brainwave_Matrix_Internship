let currentUser = null;
let posts = [];
let editIndex = null;

document.getElementById('login-btn').addEventListener('click', login);
document.getElementById('signup-btn').addEventListener('click', signup);
document.getElementById('submit-post').addEventListener('click', submitPost);

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        currentUser = username;
        document.getElementById('auth').style.display = 'none';
        document.getElementById('post-form').style.display = 'block';
        displayMessage(`Welcome, ${currentUser}!`);
        renderPosts();
    } else {
        displayMessage('Please enter both username and password.');
    }
}

function signup() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        // Simple sign up logic (just a placeholder, not stored)
        displayMessage(`User ${username} created! You can now log in.`);
    } else {
        displayMessage('Please enter both username and password.');
    }
}

function submitPost() {
    const title = document.getElementById('post-title').value;
    const content = document.getElementById('post-content').value;

    if (title && content) {
        if (editIndex !== null) {
            posts[editIndex] = { title, content, author: currentUser, comments: [] };
            editIndex = null;
        } else {
            posts.push({ title, content, author: currentUser, comments: [] });
        }
        document.getElementById('post-title').value = '';
        document.getElementById('post-content').value = '';
        renderPosts();
    } else {
        displayMessage('Please enter both title and content.');
    }
}

function renderPosts() {
    const postsContainer = document.getElementById('posts');
    postsContainer.innerHTML = '';

    posts.forEach((post, index) => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <p><strong>Author: ${post.author}</strong></p>
            <button onclick="editPost(${index})">Edit Post</button>
            <button onclick="deletePost(${index})">Delete Post</button>
            <div>
                <input type="text" placeholder="Comment..." id="comment-input-${index}">
                <button onclick="addComment(${index})">Add Comment</button>
            </div>
            <div id="comments-${index}" class="comments"></div>
        `;
        postsContainer.appendChild(postElement);
    });
}

function editPost(postIndex) {
    const post = posts[postIndex];
    document.getElementById('post-title').value = post.title;
    document.getElementById('post-content').value = post.content;
    editIndex = postIndex;
}

function addComment(postIndex) {
    const commentInput = document.getElementById(`comment-input-${postIndex}`);
    const commentText = commentInput.value;

    if (commentText) {
        posts[postIndex].comments.push({ user: currentUser, content: commentText });
        commentInput.value = '';
        renderPosts();
    } else {
        displayMessage('Please enter a comment.');
    }
}

function deletePost(postIndex) {
    posts.splice(postIndex, 1);
    renderPosts();
}

function displayMessage(message) {
    document.getElementById('auth-message').textContent = message;
    setTimeout(() => {
        document.getElementById('auth-message').textContent = '';
    }, 3000);
}
