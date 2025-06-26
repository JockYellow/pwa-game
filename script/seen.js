async function loadSeenPosts() {
    const unlocked = getUnlockedPosts();
    const response = await fetch('posts.json');
    const posts = await response.json();
  
    const seenContainer = document.getElementById('seenPosts');
    seenContainer.innerHTML = "";
  
    if (unlocked.length === 0) {
      seenContainer.innerHTML = "<p>目前尚未解鎖任何貼文。</p>";
      return;
    }
  
    unlocked.forEach(id => {
      const post = posts.find(p => p.id === id);
      if (post) {
        seenContainer.innerHTML += renderPost(post);
      }
    });
  }
  
  // 同一份 renderPost 可共用
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
  
  window.onload = loadSeenPosts;
  