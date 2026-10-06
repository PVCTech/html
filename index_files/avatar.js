function dichChuyenAvatar()
{
    const avatar = document.getElementById('avatar');

    if (!avatar)
        return;


    const w = window.innerWidth;
    const h = window.innerHeight;

    const aw = avatar.offsetWidth;
    const ah = avatar.offsetHeight;


    const random = (min, max) =>
        Math.random() * (max - min) + min;


    const canhPhai = Math.random() < 0.5;


    if (canhPhai)
    {
        const right = random(-5, 5);

        const top = random(0, h - ah);

        avatar.style.right = `${right}px`;
        avatar.style.top = `${top}px`;

        avatar.style.left = 'auto';
        avatar.style.bottom = 'auto';
    }
    else
    {
        const top = random(-5, 5);

        const right = random(0, w/2 - aw);

        avatar.style.top = `${top}px`;
        avatar.style.right = `${right}px`;

        avatar.style.left = 'auto';
        avatar.style.bottom = 'auto';
    }
}


dichChuyenAvatar();

setInterval(dichChuyenAvatar, 30000);