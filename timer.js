class Timer {
    constructor(durationInput, startButton, pauseButton, callbacks) {
        this.durationInput = durationInput;
        this.startButton = startButton;
        this.pauseButton = pauseButton;
        if (callbacks) {
            this.onStart = callbacks.onStart;
            this.onTick = callbacks.onTick;
            this.onComplete = callbacks.onComplete;
        }

        this.startButton.addEventListener('click', this.start.bind(this));

        this.pauseButton.addEventListener('click', this.pause.bind(this));
    }

    start = () => {
        if (this.onStart) {
            this.onStart(this.timeRemaining);
        }
        this.tick();
        this.countdown = setInterval(this.tick, 10);
    };

    tick = () => {
        if (this.timeRemaining <= 0) {
            this.pause();
            if (this.onComplete) {
                this.onComplete();
            }
        } else {
            this.timeRemaining = this.timeRemaining - 0.01;
            if (this.onTick) {
                this.onTick(this.timeRemaining);
            }
        }
    };

    pause() {
        clearInterval(this.countdown);
    }

    get timeRemaining() {
        return this.durationInput.value;
    }

    set timeRemaining(time) {
        this.durationInput.value = time.toFixed(2);
    }
}
