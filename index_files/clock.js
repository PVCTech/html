class Clock
{
    constructor(element)
    {
        this.element = element;
        this.seconds = 0;
        this.timer = null;
    }

    startCount()
    {
        // Dừng bộ đếm cũ
        clearInterval(this.timer);

        // Reset
        this.seconds = 0;
        this.update();

        // Bắt đầu đếm
        this.timer = setInterval(() =>
        {
            this.seconds++;
            this.update();
        }, 1000);
    }

    update()
    {
        const hours = Math.floor(this.seconds / 3600);
        const minutes = Math.floor((this.seconds % 3600) / 60);
        const seconds = this.seconds % 60;

        this.element.innerText =
            String(hours).padStart(2, '0') + ':' +
            String(minutes).padStart(2, '0') + ':' +
            String(seconds).padStart(2, '0');
    }

    stop()
    {
        clearInterval(this.timer);
        this.timer = null;
    }
}

const clock = new Clock(document.getElementById('clock'));