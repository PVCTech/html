let typingRunId = 0;
const APP = {
    code:
    {
        defaultSpeed:
        {
            delayStartup: 3000,
            keypress:
            {
                min: 50,
                max: 150
            },
            thinking:
            {
                min: 600,
                max: 2000
            },
            errorFix:
            {
                min: 500,
                max: 1100
            },
            newLine:
            {
                min: 300,
                max: 500
            },
            space:
            {
                min: 40,
                max: 120
            },
            specialChar:
            {
                min: 160,
                max: 480
            }

        },
        speed:
        {
            heSo: 1,
            updateHeSo: function(heSoMoi)
            {
                this.heSo = heSoMoi;
                const update = function(defaultObj, speedObj)
                {
                    Object.keys(defaultObj).forEach(function(key)
                    {
                        if (typeof defaultObj[key] === "object" && defaultObj[key] !== null)
                        {
                            update(defaultObj[key], speedObj[key]);
                            return;
                        }

                        if (typeof defaultObj[key] === "number")
                        {
                            speedObj[key] = parseInt(defaultObj[key] * heSoMoi);
                        }
                    });
                };
                update(APP.code.defaultSpeed, APP.code.speed);
            },
            delayStartup: 3000,
            keypress:
            {
                min: 50,
                max: 150
            },
            thinking:
            {
                min: 600,
                max: 2000
            },
            errorFix:
            {
                min: 500,
                max: 1100
            },
            newLine:
            {
                min: 300,
                max: 500
            },
            space:
            {
                min: 40,
                max: 120
            },
            specialChar:
            {
                min: 160,
                max: 480
            }

        }
    }
};



function changeSpeed_select()
{
    let speed = document.getElementById('speedControl').value;
    let heSo = 1;
    switch (speed)
    {
        case 'slow':
            heSo = 1.3;
            break;
        case 'medium':
            heSo = 1;
            break;
        case 'fast':
            heSo = 0.8;
            break;
        case 'veryFast':
            heSo = 0.6;
            break;
        case 'supperFast':
            heSo = 0.4;
            break;
        default:
            heSo = 1;
            break;
    }
    document.getElementById('speed_heSo').value = heSo;
    APP.code.speed.updateHeSo(heSo);
}


function changeSpeed_text()
{
    let heSo = parseFloat(document.getElementById('speed_heSo').value);
    let selectValue = '';
    switch (heSo)
    {
        case 1.3:
            selectValue = 'slow';
            break;
        case 1:
            selectValue = 'medium';
            break;
        case 0.8:
            selectValue = 'fast';
            break;
        case 0.6:
            selectValue = 'veryFast';
            break;
        case 0.4:
            selectValue = 'supperFast';
            break;
        default:
            break;
    }
    if (selectValue !== '') document.getElementById('speedControl').value = selectValue;
    APP.code.speed.updateHeSo(heSo);
}

function runNow()
{
    clock.startCount();
    document.getElementById('control').style.display='none';
    document
        .getElementById('view')
        .srcdoc = '';
    window.scrollTo(
    {
        top: 0,
        behavior: 'smooth'
    });

    const runId = ++typingRunId;

    const htmlCode = document.getElementById('htmlInput2').value;
    const cssCode = document.getElementById('cssInput2').value;
    const jsCode = document.getElementById('jsInput2').value;

    document.getElementById('htmlInput').value = '';
    document.getElementById('cssInput').value = '';
    document.getElementById('jsInput').value = '';

    setTimeout(
        async function()
        {
            if (runId !== typingRunId) return;
            await typeCode('htmlInput', htmlCode, runId);

            if (runId !== typingRunId) return;
            await typeCode('cssInput', cssCode, runId);

            if (runId !== typingRunId) return;
            await typeCode('jsInput', jsCode, runId);

            setTimeout(function(){showTab('html');},800);
            clock.stop();                        
        },
        APP.code.speed.delayStartup
    );
}


document
    .getElementById('runTest')
    .addEventListener(
        'click',
        function()
        {
            document.getElementById('clock').style.display = 'block';
            runNow();
        }
    );

document
    .getElementById('run')
    .addEventListener(
        'click',
        function()
        {
            document.getElementById('clock').style.display = 'none';
            runNow();
        }
    );


async function typeCode(inputId, code, runId)
{
    if (!code.trim()) return;
    const input = document.getElementById(inputId);    
    let id2 = inputId.slice(0, inputId.length - 5);

    thinking();
    showTab(id2);
    
    thinking();
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
        else if ('{}[]();=<>:"\'`'.includes(kyTuDung))
        {
            delay = random(APP.code.speed.specialChar.min, APP.code.speed.specialChar.max);
        }

        if (Math.random() < 0.025)
        {
            thinking();
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
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const number = '0123456789';
    let source;

    if (/[a-z]/.test(char))
    {
        source = lower;
    }
    else if (/[A-Z]/.test(char))
    {
        source = upper;
    }
    else if (/[0-9]/.test(char))
    {
        source = number;
    }
    else
    {
        return char;
    }


    let wrong;
    do
    {
        wrong = source[Math.floor(Math.random() * source.length)];
    }
    while (wrong === char);
    return wrong;
}

function updateCursor(input)
{
    input.selectionStart = input.value.length;
    input.selectionEnd = input.value.length;
    input.scrollTop = input.scrollHeight;
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