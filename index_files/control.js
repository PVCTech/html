const APP = 
{
    code:
    {
        textSizes:
        {
            xxs: '10px',
            xs: '12px',
            small: '14px',
            medium: '16px',
            larger: '18px',
            xl: '20px',
            xxl: '22px'
        },
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
                min: 800,
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
            },
            tab:
            {
                min: 160,
                max: 480
            },
            reviewTab: 3000
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
            },
            tab:
            {
                min: 160,
                max: 480
            },
            reviewTab: 3000
        }
    },
    control:
    {
        shortKey:
        {
            show: false
        },
        toggleShortKeyPannel: function()
        {
            if (APP.control.shortKey.show)
            {
                APP.control.shortKey.show = false;
                document.getElementById('control_shortKey').classList.add('hidden');
            }
            else
            {
                document.getElementById('control_shortKey').classList.remove('hidden');
                APP.control.shortKey.show = true;
            }
        },
        backSpace: function()
        {
            const input = document.querySelector('#control textarea:not(.hidden)');
            if (!input) return;

            const start = input.selectionStart;
            const end = input.selectionEnd;
            if (start === 0 && end === 0) return;

            let deleteStart = start;
            if (start === end)
            {
                deleteStart = start - 1;
                const currentCodeUnit = input.value.charCodeAt(deleteStart);
                const previousCodeUnit = input.value.charCodeAt(deleteStart - 1);
                if (currentCodeUnit >= 0xDC00 && currentCodeUnit <= 0xDFFF
                    && previousCodeUnit >= 0xD800 && previousCodeUnit <= 0xDBFF)
                {
                    deleteStart--;
                }
            }

            input.setRangeText('', deleteStart, end, 'start');
            input.dispatchEvent(new Event('input', { bubbles: true }));
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
        case 'ssFast':
            heSo = 0.1;
            break;
        default:
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
        case 0.1:
            selectValue = 'ssFast';
            break;
        default:
            selectValue = '-';
            break;
    }
    if (selectValue !== '') document.getElementById('speedControl').value = selectValue;
    APP.code.speed.updateHeSo(heSo);
}

function showTab2(id)
{
    const htmlInput = document.getElementById('htmlInput2');
    const cssInput = document.getElementById('cssInput2');
    const jsInput = document.getElementById('jsInput2');

    const htmlButton = document.getElementById('htmlButton2');
    const cssButton = document.getElementById('cssButton2');
    const jsButton = document.getElementById('jsButton2');

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



function clearInput2()
{
    const ids =
    [
        'htmlInput2',
        'cssInput2',
        'jsInput2'
    ];

    ids.forEach(function(id)
    {
        const input = document.getElementById(id);
        if (input)
        {
            input.value = '';
            localStorage.removeItem(id);
        }
    });
    showTab2('html');
    document.getElementById("input_caption").value = `<span style="font-weight: bold;">HTML code</span>`;
}

document.getElementById('clear').addEventListener('click', clearInput2);

function changeFontSize()
{
    const fontSize = document.getElementById('fontSizeControl').value;
    const screens = [
        document.getElementById('htmlInput_screen'),
        document.getElementById('cssInput_screen'),
        document.getElementById('jsInput_screen')
    ];

    screens.forEach(function(screen)
    {
        screen.style.fontSize = APP.code.textSizes[fontSize];
    });
}



