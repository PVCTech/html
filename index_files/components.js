/* =========================================================
       COMPONENT BUILDER
       ========================================================= */

    function insertTab()
    {
        insertEditorText('    ');
    }

    function insertEditorText(text)
    {
        const input = document.querySelector('#control textarea:not(.hidden)');
        if (!input) return;

        const start = input.selectionStart;
        const end = input.selectionEnd;
        input.setRangeText(text, start, end, 'end');
        input.focus();
        input.dispatchEvent(new Event('input', { bubbles: true }));
    }

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
