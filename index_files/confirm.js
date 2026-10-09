(function()
{
    const style = document.createElement('style');

    style.textContent = `
        #customConfirm
        {
            display:none;
            position:fixed;
            inset:0;
            background:rgba(0,0,0,.5);
            align-items:center;
            justify-content:center;
            z-index:9999;
        }

        #customConfirm .confirm-content
        {
            background:white;
            padding:20px;
            border-radius:8px;
            min-width:260px;
            max-width:80%;
            text-align:center;
            box-shadow:0 5px 20px rgba(0,0,0,.3);
        }

        #customConfirm .confirm-message
        {
            margin-bottom:20px;
        }

        #customConfirm button
        {
            padding:8px 20px;
            margin:0 5px;
            cursor:pointer;
        }
    `;

    document.head.appendChild(style);


    const confirmBox = document.createElement('div');

    confirmBox.id = 'customConfirm';

    confirmBox.innerHTML = `
        <div class="confirm-content">

            <div class="confirm-message"></div>

            <button class="confirm-ok">
                OK
            </button>

            <button class="confirm-cancel">
                Cancel
            </button>

        </div>
    `;

    document.body.appendChild(confirmBox);


    let confirmResolve = null;


    function closeConfirm(result)
    {
        confirmBox.style.display = 'none';

        if (confirmResolve)
        {
            confirmResolve(result);
            confirmResolve = null;
        }
    }


    function showConfirm(message)
    {
        confirmBox
            .querySelector('.confirm-message')
            .textContent = message;

        confirmBox.style.display = 'flex';

        return new Promise(function(resolve)
        {
            confirmResolve = resolve;
        });
    }


    confirmBox
        .querySelector('.confirm-ok')
        .onclick = function()
        {
            closeConfirm(true);
        };


    confirmBox
        .querySelector('.confirm-cancel')
        .onclick = function()
        {
            closeConfirm(false);
        };


    window.showConfirm = showConfirm;

})();