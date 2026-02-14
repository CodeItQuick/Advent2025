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
        if (rotateAmount + position >= 0 && rotateAmount + position < 100) {
            position = position + rotateAmount;
            if (position === 0) {
                return 1;
            }

            return 0;

        } else {
            let passedZero = 0;
            if (rotateAmount + position >= 100 || rotateAmount + position < 0 && position !== 0) {
                passedZero++;
            }
            const overRotation = rotateAmount > 0 ? -100 : 100;
            position = position + rotateAmount + overRotation;
            return passedZero;
        }
    }

    return { rotate, position: () => position}

}


export default elf;