// DOM 元素
const keywordInput = document.getElementById('keywordInput');
const generateButton = document.getElementById('generateButton');
const resultSection = document.querySelector('.result-section');
const resultTitle = document.getElementById('resultTitle');
const resultContent = document.getElementById('resultContent');
const copyButton = document.getElementById('copyButton');

// 生成文章的函数
async function generateArticle(keyword) {
    try {
        const requestBody = {
            "workflow_id": "7449957957074288681",
            "parameters": {
                "input": keyword
            }
        };

        console.log('Request Body:', requestBody);

        const response = await fetch('https://api.coze.cn/v1/workflow/run', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer pat_bJgYIY5pa3IvFZuK7abAKhHspoSkNys4dnJf7fhSBbfDCWLOZym7gVcexnAVuhEW',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log('API Response:', responseData);

        if (responseData.code === 0) {
            const content = responseData.data;
            
            const lines = content.split('\n');
            const title = lines[0] || '生成的文章';
            const body = lines.slice(1).join('\n').trim();
            
            return {
                title: title,
                content: body
            };
        } else {
            throw new Error(responseData.msg || '生成失败');
        }
    } catch (error) {
        console.error('生成文章时出错：', error);
        throw error;
    }
}

// 复制文本功能
function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
        .then(() => {
            copyButton.textContent = '已复制！';
            setTimeout(() => {
                copyButton.textContent = '复制结果';
            }, 2000);
        })
        .catch(err => {
            console.error('复制失败：', err);
            alert('复制失败，请手动复制');
        });
}

// 事件监听器
generateButton.addEventListener('click', async () => {
    const keyword = keywordInput.value.trim();
    if (!keyword) {
        alert('请输入关键词');
        return;
    }

    generateButton.disabled = true;
    generateButton.textContent = '生成中...';

    try {
        const article = await generateArticle(keyword);
        resultTitle.textContent = article.title;
        resultContent.textContent = article.content;
        resultSection.style.display = 'block';
    } catch (error) {
        alert('生成文章失败，请重试');
    } finally {
        generateButton.disabled = false;
        generateButton.textContent = '一键生成文章';
    }
});

copyButton.addEventListener('click', () => {
    const textToCopy = `${resultTitle.textContent}\n\n${resultContent.textContent}`;
    copyToClipboard(textToCopy);
});

// 按回车键触发生成
keywordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        generateButton.click();
    }
}); 