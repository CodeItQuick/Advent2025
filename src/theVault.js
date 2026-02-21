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
        if (rotateAmount + position >= 100 || rotateAmount + position < 0) {
            if (position !== 0) {
                passedZero++;
            }
            overRotation = rotateAmount > 0 ? -100 : 100;
        } else if (rotateAmount + position === 0) {
            passedZero++;
        }
        position = position + rotateAmount + overRotation;

        return passedZero;
    }

    return {rotate, position: () => position}

}


export default elf;