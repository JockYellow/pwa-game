async function unlockPost() {
    const password = document.getElementById('passwordInput').value.trim();
    const response = await fetch('posts.json');
    const posts = await response.json();
  
    const post = posts.find(p => p.password === password);
    const container = document.getElementById('postContainer');
    container.innerHTML = "";
  
    if (post) {
      saveUnlockedPost(post.id);
      container.innerHTML = renderPost(post);
    } else {
      container.innerHTML = "<p style='color:red;'>找不到對應貼文，請確認密碼是否正確。</p>";
    }
  }
  
  function renderPost(post) {
    return `
      <div class="post ${post.platform.toLowerCase()}">
        <div class="header">
          <img src="${post.avatar}" class="avatar" alt="avatar">
          <span class="author">${post.author}</span>
          <span class="time">${post.timestamp}</span>
        </div>
        <div class="content">${post.content}</div>
      </div>
    `;
  }
  