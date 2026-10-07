let typingRunId = 0;

async function runNow()
{
    clock.startCount();
    document.getElementById('control').style.display='none';
    document.getElementById('view').srcdoc = '';
    window.scrollTo({top: 0, behavior: 'smooth'});

    const runId = ++typingRunId;

    const htmlCode = document.getElementById('htmlInput2').value.replace(/ {4}/g, '\t');
    const cssCode = document.getElementById('cssInput2').value.replace(/ {4}/g, '\t');
    const jsCode = document.getElementById('jsInput2').value.replace(/ {4}/g, '\t');

    document.getElementById('htmlInput').value = '';
    document.getElementById('cssInput').value = '';
    document.getElementById('jsInput').value = '';
    renderAllCodeScreens();
    await thinking();
    setTimeout(
        async function()
        {
            if (runId !== typingRunId) return;
            await typeCode('htmlInput', htmlCode, runId);

            if (runId !== typingRunId) return;
            await typeCode('cssInput', cssCode, runId);

            if (runId !== typingRunId) return;
            await typeCode('jsInput', jsCode, runId);

            setTimeout(function(){showTab('html');},1200);

            let css = document.getElementById('cssInput').value;
            let js = document.getElementById('jsInput').value;
            for (let i=0; i<10; i++)
            {
                if (css.length > 0 && js.length == 0)
                {
                    if (i%2 == 0)
                    {
                        await reviewTab('css');                        
                    }
                    else
                    {
                        await reviewTab('html');
                    }
                }
                else if (css.length == 0 && js.length > 0)
                {
                    if (i%2 == 1)
                    {
                        await reviewTab('js');
                    }
                    else
                    {
                        await reviewTab('html');
                    }
                }
                else if (css.length > 0 && js.length > 0)
                {
                    if (i%3 == 0)
                    {
                        await reviewTab('css');                        
                    }
                    else if (i%3 == 1)
                    {
                        await reviewTab('js');
                    }
                    else
                    {
                        await reviewTab('html');
                    }
                }            
            }
            clock.stop();                        
        },
        APP.code.speed.delayStartup
    );
}


document.getElementById('runTest').addEventListener('click',function()
{
    document.getElementById('clock').style.display = 'block';
    runNow();
});

document.getElementById('run').addEventListener('click',function()
{
    document.getElementById('clock').style.display = 'none';
    runNow();
});


async function typeCode(inputId, code, runId)
{
    if (!code.trim()) return;
    const input = document.getElementById(inputId);    
    let id2 = inputId.slice(0, inputId.length - 5);

    await thinking();
    showTab(id2);
    
    await thinking();
    for (let i = 0; i < code.length; i++)
    {
        if (runId !== typingRunId) return;
        const kyTuDung = code[i];
        let delay = random(APP.code.speed.keypress.min, APP.code.speed.keypress.max);

        if (kyTuDung === '\n')
        {
            delay = random(APP.code.speed.newLine.min, APP.code.speed.newLine.max);
        }
        else if (kyTuDung === ' ')
        {
            delay = random(APP.code.speed.space.min, APP.code.speed.space.max);
        }
        else if (kyTuDung === '\t')
        {
            delay = random(APP.code.speed.tab.min, APP.code.speed.tab.max);
        }
        else if ('{}[]();=<>:"\'`'.includes(kyTuDung))
        {
            delay = random(APP.code.speed.specialChar.min, APP.code.speed.specialChar.max);
        }

        if (Math.random() < 0.025)
        {
            await thinking();
        }


        if (Math.random() < 0.035 && isMistakeCandidate(kyTuDung))
        {
            const kyTuSai = randomWrongCharacter(kyTuDung);
            input.value += kyTuSai;
            updateCursor(input);
            await sleep(random(APP.code.speed.errorFix.min, APP.code.speed.errorFix.max));

            input.value = input.value.slice(0, -1);
            updateCursor(input);

            await sleep(random(APP.code.speed.keypress.min * 3, APP.code.speed.keypress.max * 3));
            input.value += kyTuDung;
            updateCursor(input);
        }
        else
        {
            input.value += kyTuDung;
            updateCursor(input);
        }

        saveInput(input);
        load();
        await sleep(delay);
    }
}

async function thinking()
{
    await sleep(random(APP.code.speed.thinking.min, APP.code.speed.thinking.max));
}

function isMistakeCandidate(char)
{
    return /[a-zA-Z0-9]/.test(char);
}



function randomWrongCharacter(char)
{
    const rows = [
        { keys: '1234567890', offset: 0 },
        { keys: 'qwertyuiop', offset: 0 },
        { keys: 'asdfghjkl', offset: 0.25 },
        { keys: 'zxcvbnm', offset: 0.75 }
    ];
    const normalizedChar = char.toLowerCase();
    let position;

    for (let row = 0; row < rows.length; row++)
    {
        const col = rows[row].keys.indexOf(normalizedChar);
        if (col !== -1)
        {
            position = { row, col: col + rows[row].offset };
            break;
        }
    }

    if (!position) return char;

    const nearbyKeys = [];
    for (let row = 0; row < rows.length; row++)
    {
        for (let col = 0; col < rows[row].keys.length; col++)
        {
            const dx = col + rows[row].offset - position.col;
            const dy = row - position.row;
            if (dx * dx + dy * dy <= 4 && (dx !== 0 || dy !== 0))
            {
                nearbyKeys.push(rows[row].keys[col]);
            }
        }
    }

    const wrong = nearbyKeys[Math.floor(Math.random() * nearbyKeys.length)];
    return char === normalizedChar ? wrong : wrong.toUpperCase();
}

function updateCursor(input)
{
    input.selectionStart = input.value.length;
    input.selectionEnd = input.value.length;
    input.scrollTop = input.scrollHeight;
    renderCodeScreen(input.id.replace('Input', ''), input.value, true, input.value.endsWith('\n'));
}

function sleep(ms)
{
    return new Promise(
        function(resolve)
        {
            setTimeout(
                resolve,
                ms
            );
        }
    );
}

function random(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

loadSavedInputs();
load();
renderAllCodeScreens();