// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const noteInput = document.getElementById('noteInput');
    const saveButton = document.getElementById('saveButton');
    const historyButton = document.getElementById('historyButton');

    // 创建弹窗元素
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>保存成功！</h2>
        </div>
    `;
    document.body.appendChild(modal);

    // 保存按钮点击事件
    saveButton.addEventListener('click', function() {
        const noteText = noteInput.value.trim();
        if (noteText) {
            // 保存笔记
            let notes = JSON.parse(localStorage.getItem('notes') || '[]');
            notes.push({
                text: noteText,
                date: new Date().toLocaleString()
            });
            localStorage.setItem('notes', JSON.stringify(notes));

            // 清空输入框
            noteInput.value = '';
            
            // 显示成功提示
            showModal();
        }
    });

    // 历史记录按钮点击事件
    historyButton.addEventListener('click', function() {
        window.location.href = './history.html';
    });

    // 显示弹窗函数
    function showModal() {
        modal.style.display = 'flex';
        setTimeout(function() {
            modal.style.display = 'none';
        }, 1500);
    }
}); 