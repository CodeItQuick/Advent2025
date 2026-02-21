function elf() {
    const currentLock = Lock();
    let password = 0;

    function instructions(turns) {
        let rotation = +turns.substring(1) * (turns.substring(0, 1) === 'L' ? -1 : 1);
        if (Math.abs(rotation) > 99) {
            const rotations = Math.floor(Math.abs(rotation) / 100);
            for (let i = 0; i < rotations; i++) {
                password += currentLock.rotate(100);
            }
            rotation = rotation % 100;
        }

        password += currentLock.rotate(rotation)

        return currentLock.position();
    }

    return {dial: instructions, password: () => password, dialPosition: () => currentLock.position()};
}

function Lock() {
    let position = 50;

    function rotate(rotateAmount) {
        let overRotation = 0;
        let passedZero = 0;
        const startAtZero = position === 0;
        const overRotated = rotateAmount + position >= 100 || rotateAmount + position < 0;
        if (overRotated) {
            overRotation = rotateAmount > 0 ? -100 : 100;
        }
        position = position + rotateAmount + overRotation;
        if (!startAtZero && overRotated) {
            passedZero++;
        } else if (position === 0) {
            passedZero++;
        }

        return passedZero;
    }

    return {rotate, position: () => position}

}


export default elf;