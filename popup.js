// メモを保存
function saveMemo() {
  const memoInput = document.getElementById('memoInput');
  const text = memoInput.value.trim();
  if (!text) return;
  chrome.storage.local.get({ memos: [] }, (result) => {
    const memos = result.memos;
    memos.push({ text, date: new Date().toLocaleString() });
    chrome.storage.local.set({ memos }, () => {
      memoInput.value = '';
      renderMemos();
    });
  });
}

// メモを削除
function deleteMemo(index) {
  chrome.storage.local.get({ memos: [] }, (result) => {
    const memos = result.memos;
    memos.splice(index, 1);
    chrome.storage.local.set({ memos }, renderMemos);
  });
}

// メモ一覧を表示
function renderMemos() {
  chrome.storage.local.get({ memos: [] }, (result) => {
    const memoList = document.getElementById('memoList');
    memoList.innerHTML = '';
    result.memos.forEach((memo, idx) => {
      const li = document.createElement('li');
      li.textContent = memo.text + ' (' + memo.date + ')';
      const delBtn = document.createElement('button');
      delBtn.textContent = '削除';
      delBtn.className = 'deleteBtn';
      delBtn.onclick = () => deleteMemo(idx);
      li.appendChild(delBtn);
      memoList.appendChild(li);
    });
  });
}

document.getElementById('saveBtn').addEventListener('click', saveMemo);
document.addEventListener('DOMContentLoaded', renderMemos); 