/* =========================================================
       COMPONENT BUILDER
       ========================================================= */

    function appendCode(id, code)
    {
        const input = document.getElementById(id);


        if (!input)
            return;


        /*
         * Nếu đang có nội dung thì thêm xuống dòng
         * trước component mới.
         */

        if (input.value.length > 0)
        {
            input.value += '\n\n';
        }


        input.value += code;


        /*
         * Lưu ngay vào localStorage.
         */

        saveInput(input);


        /*
         * Đưa cursor về cuối.
         */

        input.focus();

        input.selectionStart = input.value.length;

        input.selectionEnd = input.value.length;


        /*
         * Cuộn xuống cuối.
         */

        input.scrollTop = input.scrollHeight;
    }



    function addComponent(type)
    {
        switch(type)
        {

            /* =============================================
               BUTTON
               ============================================= */

            case 'button':

                appendCode(
                    'htmlInput2',

`<button class="myButton">
    Button
</button>`
                );


                appendCode(
                    'cssInput2',

`.myButton
{
    padding: 10px 18px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}`
                );


                break;



            /* =============================================
               IMAGE
               ============================================= */

            case 'image':

                appendCode(
                    'htmlInput2',

`<img
    class="myImage"
    src="https://picsum.photos/400/250"
    alt="Image"
>`
                );


                appendCode(
                    'cssInput2',

`.myImage
{
    max-width: 100%;
    height: auto;
    display: block;
}`
                );


                break;



            /* =============================================
               SELECT
               ============================================= */

            case 'select':

                appendCode(
                    'htmlInput2',

`<select class="mySelect">
    <option value="1">Lựa chọn 1</option>
    <option value="2">Lựa chọn 2</option>
    <option value="3">Lựa chọn 3</option>
</select>`
                );


                appendCode(
                    'cssInput2',

`.mySelect
{
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}`
                );


                break;



            /* =============================================
               INPUT
               ============================================= */

            case 'input':

                appendCode(
                    'htmlInput2',

`<input
    class="myInput"
    type="text"
    placeholder="Nhập nội dung..."
>`
                );


                appendCode(
                    'cssInput2',

`.myInput
{
    padding: 9px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}`
                );


                break;



            /* =============================================
               TEXTAREA
               ============================================= */

            case 'textarea':

                appendCode(
                    'htmlInput2',

`<textarea
    class="myTextarea"
    placeholder="Nhập nội dung..."
></textarea>`
                );


                appendCode(
                    'cssInput2',

`.myTextarea
{
    width: 100%;
    min-height: 100px;
    padding: 10px;
    box-sizing: border-box;
    resize: vertical;
}`
                );


                break;



            /* =============================================
               CHECKBOX
               ============================================= */

            case 'checkbox':

                appendCode(
                    'htmlInput2',

`<label class="myCheckbox">
    <input type="checkbox">
    Checkbox
</label>`
                );


                break;



            /* =============================================
               RADIO
               ============================================= */

            case 'radio':

                appendCode(
                    'htmlInput2',

`<label>
    <input
        type="radio"
        name="option"
        value="1"
    >
    Lựa chọn 1
</label>

<label>
    <input
        type="radio"
        name="option"
        value="2"
    >
    Lựa chọn 2
</label>`
                );


                break;



            /* =============================================
               TABLE
               ============================================= */

            case 'table':

                appendCode(
                    'htmlInput2',

`<table class="myTable">

    <thead>

        <tr>
            <th>Cột 1</th>
            <th>Cột 2</th>
            <th>Cột 3</th>
        </tr>

    </thead>


    <tbody>

        <tr>
            <td>Dữ liệu</td>
            <td>Dữ liệu</td>
            <td>Dữ liệu</td>
        </tr>

    </tbody>

</table>`
                );


                appendCode(
                    'cssInput2',

`.myTable
{
    width: 100%;
    border-collapse: collapse;
}


.myTable th,
.myTable td
{
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
}`
                );


                break;



            /* =============================================
               CARD
               ============================================= */

            case 'card':

                appendCode(
                    'htmlInput2',

`<div class="card">

    <h3>Tiêu đề</h3>

    <p>
        Nội dung card.
    </p>

</div>`
                );


                appendCode(
                    'cssInput2',

`.card
{
    padding: 16px;
    background: white;
    border-radius: 8px;
    box-shadow: 0px 2px 8px rgba(0,0,0,0.12);
}`
                );


                break;



            /* =============================================
               CONTAINER
               ============================================= */

            case 'container':

                appendCode(
                    'htmlInput2',

`<div class="container">

    Nội dung

</div>`
                );


                appendCode(
                    'cssInput2',

`.container
{
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    padding: 16px;
    box-sizing: border-box;
}`
                );


                break;



            /* =============================================
               FORM
               ============================================= */

            case 'form':

                appendCode(
                    'htmlInput2',

`<form
    class="myForm"
    onsubmit="return false;"
>

    <input
        type="text"
        placeholder="Họ và tên"
    >

    <input
        type="email"
        placeholder="Email"
    >

    <button type="submit">
        Gửi
    </button>

</form>`
                );


                appendCode(
                    'cssInput2',

`.myForm
{
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 400px;
}`
                );


                break;



            /* =============================================
               LINK
               ============================================= */

            case 'link':

                appendCode(
                    'htmlInput2',

`<a
    class="myLink"
    href="#"
>
    Link
</a>`
                );


                appendCode(
                    'cssInput2',

`.myLink
{
    text-decoration: none;
}`
                );


                break;



            /* =============================================
               ICON
               ============================================= */

            case 'icon':

                appendCode(
                    'htmlInput2',

`<span class="myIcon">
    ★
</span>`
                );


                appendCode(
                    'cssInput2',

`.myIcon
{
    display: inline-block;
    font-size: 24px;
}`
                );


                break;

        }
    }



    /* =========================================================
       RUN
       ========================================================= */

    let typingRunId = 0;

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


        /*
         * Lấy code từ 3 ô Input2
         */

        const htmlCode =
            document
                .getElementById('htmlInput2')
                .value;


        const cssCode =
            document
                .getElementById('cssInput2')
                .value;


        const jsCode =
            document
                .getElementById('jsInput2')
                .value;



        /*
         * Xóa code cũ ở các ô chính
         */

        document
            .getElementById('htmlInput')
            .value = '';


        document
            .getElementById('cssInput')
            .value = '';


        document
            .getElementById('jsInput')
            .value = '';



        /*
         * Sau 3 giây mới bắt đầu gõ
         */

        setTimeout(
            async function()
            {
                if (runId !== typingRunId)
                    return;


                await typeCode(
                    'htmlInput',
                    htmlCode,
                    runId
                );


                if (runId !== typingRunId)
                    return;


                await typeCode(
                    'cssInput',
                    cssCode,
                    runId
                );


                if (runId !== typingRunId)
                    return;


                await typeCode(
                    'jsInput',
                    jsCode,
                    runId
                );

                setTimeout(function(){showTab('html');},800);
                clock.stop();                        
            },
            3000
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



    /* =========================================================
       TYPE CODE
       ========================================================= */

    async function typeCode(
        inputId,
        code,
        runId
    )
    {
        if (!code.trim()) return;
        const input =
            document.getElementById(inputId);
        
        let id2 =
            inputId.slice(
                0,
                inputId.length - 5
            );


        await sleep(
            random(1000, 2000)
        );


        showTab(id2);


        await sleep(
            random(1000, 2000)
        );



        for (
            let i = 0;
            i < code.length;
            i++
        )
        {

            /*
             * Run mới => dừng ngay
             */

            if (runId !== typingRunId)
                return;


            const kyTuDung = code[i];


            /*
             * Khoảng nghỉ ngẫu nhiên.
             */

            let delay =
                random(50, 150);


            if (kyTuDung === '\n')
            {
                delay =
                    random(600, 1600);
            }

            else if (kyTuDung === ' ')
            {
                delay =
                    random(60, 180);
            }

            else if (
                '{}[]();=<>:"\'`'.includes(
                    kyTuDung
                )
            )
            {
                delay =
                    random(160, 480);
            }



            /*
             * Thỉnh thoảng dừng lại suy nghĩ.
             */

            if (Math.random() < 0.025)
            {
                await sleep(
                    random(1000, 1900)
                );
            }



            /*
             * Có xác suất gõ sai.
             */

            if (
                Math.random() < 0.035 &&
                isMistakeCandidate(kyTuDung)
            )
            {
                const kyTuSai =
                    randomWrongCharacter(
                        kyTuDung
                    );


                input.value += kyTuSai;

                updateCursor(input);


                await sleep(
                    random(300, 600)
                );


                /*
                 * Nhận ra gõ sai -> Backspace
                 */

                input.value =
                    input.value.slice(0, -1);


                updateCursor(input);


                await sleep(
                    random(200, 480)
                );


                /*
                 * Gõ lại đúng
                 */

                input.value += kyTuDung;

                updateCursor(input);

            }
            else
            {
                input.value += kyTuDung;

                updateCursor(input);
            }



            /*
             * Lưu editor chính vào localStorage
             */

            saveInput(input);


            /*
             * Cập nhật iframe
             */

            load();


            await sleep(delay);
        }
    }



    /* =========================================================
       MISTAKE
       ========================================================= */

    function isMistakeCandidate(char)
    {
        return /[a-zA-Z0-9]/.test(char);
    }



    function randomWrongCharacter(char)
    {
        const lower =
            'abcdefghijklmnopqrstuvwxyz';


        const upper =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZ';


        const number =
            '0123456789';


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
            wrong =
                source[
                    Math.floor(
                        Math.random() *
                        source.length
                    )
                ];

        }
        while (wrong === char);


        return wrong;
    }



    /* =========================================================
       CURSOR
       ========================================================= */

    function updateCursor(input)
    {
        input.selectionStart =
            input.value.length;


        input.selectionEnd =
            input.value.length;


        input.scrollTop =
            input.scrollHeight;
    }



    /* =========================================================
       DELAY
       ========================================================= */

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



    /* =========================================================
       RANDOM
       ========================================================= */

    function random(min, max)
    {
        return Math.floor(
            Math.random() *
            (max - min + 1)
        ) + min;
    }



    /* =========================================================
       KHỞI TẠO LOCAL STORAGE
       ========================================================= */

    loadSavedInputs();


    /*
     * Sau khi khôi phục dữ liệu localStorage,
     * render preview lại.
     */

    load();