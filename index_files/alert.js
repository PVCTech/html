const style = document.createElement('style');

style.textContent = `
    #customAlert
    {
        display:none;
        position:fixed;
        inset:0;
        background:#0008;
        align-items:center;
        justify-content:center;
        z-index:9999;
    }

    .alert-content
    {
        background:white;
        padding:20px;
        border-radius:0px;
        min-width:220px;
        text-align:center;
    }
`;

document.head.appendChild(style);



function showAlert(message)
{
    let alertBox = document.getElementById('customAlert');

    if (!alertBox)
    {
        alertBox = document.createElement('div');

        alertBox.id = 'customAlert';

        alertBox.innerHTML = `
            <div class="alert-content">
                <div id="alertMessage"></div>
                <button onclick="closeAlert()" style="margin-top:12px;width:70px;">OK</button>
            </div>
        `;

        document.body.appendChild(alertBox);
    }

    alertBox.querySelector('#alertMessage').textContent = message;

    alertBox.style.display = 'flex';
}

function closeAlert()
{
    document.getElementById('customAlert').style.display = 'none';
}

window.alert = showAlert;