function showTab(id)
{
    const htmlInput = document.getElementById('htmlInput');
    const cssInput = document.getElementById('cssInput');
    const jsInput = document.getElementById('jsInput');

    const htmlButton = document.getElementById('htmlButton');
    const cssButton = document.getElementById('cssButton');
    const jsButton = document.getElementById('jsButton');


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



/* =========================================================
LOAD LIVE PREVIEW
========================================================= */

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


        /*
        * Lưu khi người dùng gõ.
        */
        input.addEventListener(
            'keyup',
            function()
            {
                saveInput(input);
            }
        );


        /*
        * Lưu luôn khi paste / input bằng cách khác.
        * Không ảnh hưởng yêu cầu onkeyup.
        */
        input.addEventListener(
            'input',
            function()
            {
                saveInput(input);
            }
        );
    });
}