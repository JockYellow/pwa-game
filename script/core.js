// 儲存已解鎖的貼文 ID
function saveUnlockedPost(id) {
    const unlocked = JSON.parse(localStorage.getItem('unlockedPosts') || '[]');
    if (!unlocked.includes(id)) {
      unlocked.push(id);
      localStorage.setItem('unlockedPosts', JSON.stringify(unlocked));
    }
  }
  
  // 取得所有已解鎖的 ID 陣列
  function getUnlockedPosts() {
    return JSON.parse(localStorage.getItem('unlockedPosts') || '[]');
  }
  
  // 清除所有已解鎖資料
  function clearUnlocked() {
    if (confirm("確定要清除所有已解鎖紀錄嗎？")) {
      localStorage.removeItem('unlockedPosts');
      alert("已清除！");
      location.reload();
    }
  }
  