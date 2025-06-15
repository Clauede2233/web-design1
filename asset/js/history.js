document.addEventListener('DOMContentLoaded', () => {
    const historyList = document.getElementById('historyList');
    const backButton = document.getElementById('backButton');

    // 加载历史记录
    loadHistory();

    // 返回主页
    backButton.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    function loadHistory() {
        const notes = JSON.parse(localStorage.getItem('notes') || '[]');
        historyList.innerHTML = '';

        notes.reverse().forEach((note, index) => {
            const noteElement = createNoteElement(note, index);
            historyList.appendChild(noteElement);
        });
    }

    function createNoteElement(note, index) {
        const div = document.createElement('div');
        div.className = 'history-item';
        div.innerHTML = `
            <div class="date">保存时间: ${note.date}</div>
            <textarea class="note-content" readonly>${note.text}</textarea>
            <div class="button-group">
                <button class="edit-btn">编辑</button>
                <button class="delete-btn">删除</button>
            </div>
        `;

        const textarea = div.querySelector('.note-content');
        const editBtn = div.querySelector('.edit-btn');
        const deleteBtn = div.querySelector('.delete-btn');

        // 编辑功能
        editBtn.addEventListener('click', () => {
            if (editBtn.textContent === '编辑') {
                textarea.removeAttribute('readonly');
                editBtn.textContent = '保存';
            } else {
                textarea.setAttribute('readonly', true);
                editBtn.textContent = '编辑';
                updateNote(index, textarea.value);
            }
        });

        // 删除功能
        deleteBtn.addEventListener('click', () => {
            if (confirm('确定要删除这条笔记吗？')) {
                deleteNote(index);
                div.remove();
            }
        });

        return div;
    }

    function updateNote(index, newText) {
        const notes = JSON.parse(localStorage.getItem('notes') || '[]');
        const actualIndex = notes.length - 1 - index; // 因为显示时是倒序的
        notes[actualIndex].text = newText;
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    function deleteNote(index) {
        const notes = JSON.parse(localStorage.getItem('notes') || '[]');
        const actualIndex = notes.length - 1 - index; // 因为显示时是倒序的
        notes.splice(actualIndex, 1);
        localStorage.setItem('notes', JSON.stringify(notes));
    }
}); 