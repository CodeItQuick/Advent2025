export default function elf() {
    const currentLock = Lock();
    let password = 0;

    function dial(turns) {
        const direction = turns[0];
        const amount = parseInt(turns.slice(1), 10);
        
        let rotation = amount;
        if (direction === 'L') {
            rotation = -amount;
        }

        password += currentLock.rotate(rotation);

        return currentLock.position();
    }

    return {
        dial,
        password: () => password,
        dialPosition: () => currentLock.position()
    };
}

function Lock() {
    let position = 50;

    function rotate(amount) {
        let startPosition = position;
        if (amount < 0) {
            startPosition = (100 - position) % 100;
        }

        const distance = Math.abs(amount);
        const passedZero = Math.floor((startPosition + distance) / 100);

        position = ((position + amount) % 100 + 100) % 100;

        return passedZero;
    }

    return {
        rotate,
        position: () => position
    };
}
