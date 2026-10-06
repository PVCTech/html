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


            htmlButton.classList.add('button-active');

            cssButton.classList.remove('button-active');

            jsButton.classList.remove('button-active');

            break;


        case 'css':

            htmlInput.classList.add('hidden');

            cssInput.classList.remove('hidden');

            jsInput.classList.add('hidden');


            htmlButton.classList.remove('button-active');

            cssButton.classList.add('button-active');

            jsButton.classList.remove('button-active');

            break;


        case 'js':

            htmlInput.classList.add('hidden');

            cssInput.classList.add('hidden');

            jsInput.classList.remove('hidden');


            htmlButton.classList.remove('button-active');

            cssButton.classList.remove('button-active');

            jsButton.classList.add('button-active');

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
}



document
    .getElementById('clear')
    .addEventListener(
        'click',
        clearInput2
    );

function changeFontSize()
{
    const fontSize = document.getElementById('fontSizeControl').value;

    const inputs = [
        document.getElementById('htmlInput'),
        document.getElementById('cssInput'),
        document.getElementById('jsInput')
    ];

    const sizes =
    {
        small: '12px',
        medium: '16px',
        larger: '20px',
        xl: '24px'
    };

    inputs.forEach(function(input)
    {
        input.style.fontSize = sizes[fontSize];
    });
}



