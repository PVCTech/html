function showTab(id)
{
    const htmlInput = document.getElementById('htmlInput_screen');
    const cssInput = document.getElementById('cssInput_screen');
    const jsInput = document.getElementById('jsInput_screen');

    const htmlButton = document.getElementById('htmlButton');
    const cssButton = document.getElementById('cssButton');
    const jsButton = document.getElementById('jsButton');


    switch (id)
    {
        case 'html':

            htmlInput.classList.remove('hidden');
            cssInput.classList.add('hidden');
            jsInput.classList.add('hidden');

            htmlButton.classList.add('tab__button-active');
            cssButton.classList.remove('tab__button-active');
            jsButton.classList.remove('tab__button-active');

            break;


        case 'css':

            htmlInput.classList.add('hidden');
            cssInput.classList.remove('hidden');
            jsInput.classList.add('hidden');

            htmlButton.classList.remove('tab__button-active');
            cssButton.classList.add('tab__button-active');
            jsButton.classList.remove('tab__button-active');

            break;


        case 'js':

            htmlInput.classList.add('hidden');
            cssInput.classList.add('hidden');
            jsInput.classList.remove('hidden');

            htmlButton.classList.remove('tab__button-active');
            cssButton.classList.remove('tab__button-active');
            jsButton.classList.add('tab__button-active');

            break;
    }
}

async function reviewTab(id)
{
    await sleep(APP.code.speed.reviewTab);
    showTab(id);
}

function renderAllCodeScreens()
{
    ['html', 'css', 'js'].forEach(function(language)
    {
        const input = document.getElementById(language + 'Input');
        renderCodeScreen(language, input.value, false);
    });
}

function renderCodeScreen(language, code, showCursor, resetHorizontalScroll)
{
    const screen = document.getElementById(language + 'Input_screen');
    if (!screen) return;

    const tokens =
    {
        html: /<!--[\s\S]*?-->|<!doctype\b[^>]*>|<\/?[a-z][\w:-]*|\/?\s*>|[a-z_:][\w:.-]*(?=\s*=)|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|&(?:#\d+|#x[\da-f]+|[\w]+);/gi,
        css: /\/\*[\s\S]*?\*\/|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|#[\w-]+|\b\d+(?:\.\d+)?(?:%|px|em|rem|vh|vw|s|ms)?\b|[\w-]+|[{}:;,]/gi,
        js: /\/\*[\s\S]*?\*\/|\/\/[^\n]*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|\b(?:async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|export|extends|false|finally|for|from|function|if|import|in|instanceof|let|new|null|of|return|static|super|switch|this|throw|true|try|typeof|undefined|var|void|while|yield)\b|\b\d+(?:\.\d+)?\b|[A-Za-z_$][\w$]*(?=\s*\()|[{}()[\].,;:+*/%=<>!?&|~-]/g
    }[language];
    let output = '';
    let lastIndex = 0;
    let match;

    while ((match = tokens.exec(code)) !== null)
    {
        output += escapeCodeHTML(code.slice(lastIndex, match.index));
        const token = match[0];
        let tokenClass = '';

        if (language === 'html')
        {
            if (token.startsWith('<!--')) tokenClass = 'code-comment';
            else if (token.startsWith('<!')) tokenClass = 'code-keyword';
            else if (token.startsWith('<')) tokenClass = 'code-tag';
            else if (token[0] === '"' || token[0] === "'") tokenClass = 'code-string';
            else if (token[0] === '&') tokenClass = 'code-number';
            else if (/^[a-z_:]/i.test(token)) tokenClass = 'code-attribute';
        }
        else if (language === 'css')
        {
            if (token.startsWith('/*')) tokenClass = 'code-comment';
            else if (token[0] === '"' || token[0] === "'") tokenClass = 'code-string';
            else if (token[0] === '#') tokenClass = 'code-number';
            else if (/^\d/.test(token)) tokenClass = 'code-number';
            else if (/^[{}:;,]$/.test(token)) tokenClass = 'code-punctuation';
            else tokenClass = 'code-attribute';
        }
        else
        {
            if (token.startsWith('/*') || token.startsWith('//')) tokenClass = 'code-comment';
            else if (/^["'`]/.test(token)) tokenClass = 'code-string';
            else if (/^(?:async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|export|extends|false|finally|for|from|function|if|import|in|instanceof|let|new|null|of|return|static|super|switch|this|throw|true|try|typeof|undefined|var|void|while|yield)$/.test(token)) tokenClass = 'code-keyword';
            else if (/^\d/.test(token)) tokenClass = 'code-number';
            else if (/^[A-Za-z_$]/.test(token)) tokenClass = 'code-function';
            else tokenClass = 'code-punctuation';
        }

        output += tokenClass
            ? '<span class="' + tokenClass + '">' + escapeCodeHTML(token) + '</span>'
            : escapeCodeHTML(token);
        lastIndex = tokens.lastIndex;
    }

    output += escapeCodeHTML(code.slice(lastIndex));
    if (showCursor) output += '<span class="typing-cursor" aria-hidden="true"></span>';
    screen.innerHTML = output || (showCursor ? '<span class="typing-cursor" aria-hidden="true"></span>' : '');
    screen.scrollTop = screen.scrollHeight;
    if (resetHorizontalScroll) screen.scrollLeft = 0;
}

function escapeCodeHTML(text)
{
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function load()
{
    const html = document.getElementById('htmlInput').value;
    const css = document.getElementById('cssInput').value;
    const js = document.getElementById('jsInput').value;

    const code = `
    <!DOCTYPE html>
    <html>
        <head>
            <style>
                ${css}
            </style>

            <script src="index_files/alert.js"></script>
        </head>
        <body>
            ${html}
            <script>
                ${js.replace(/<\/script/gi, '<\\/script')}
            <\/script>
        </body>
    </html>
    `;

    document.getElementById('view').srcdoc = code;
}



function saveInput(input)
{
    localStorage.setItem(
        input.id,
        input.value
    );
}



function loadSavedInputs()
{
    const inputs = document.querySelectorAll('textarea');
    inputs.forEach(function(input)
    {
        const saved = localStorage.getItem(input.id);
        if (saved !== null)
        {
            input.value = saved;
        }
        input.addEventListener(
            'keyup',
            function()
            {
                saveInput(input);
            }
        );
        input.addEventListener(
            'input',
            function()
            {
                saveInput(input);
            }
        );
    });
}