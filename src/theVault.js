function elf() {
    const currentLock = Lock()

    function instructions(turns) {
        let rotation = +turns.substring(1)
        if (rotation > 99) {
            const rotations = Math.floor(rotation / 100);
            for (let i = 0; i < rotations; i++) {
                currentLock.fullTurn();
            }
            rotation = rotation % 100;
        }
        if (turns.startsWith('L')) {
            currentLock.rotateLeft(rotation)
        } else  {
            currentLock.rotateRight(rotation)
        }

        return currentLock.position();
    }

    return {dial: instructions, password: () => currentLock.password(), dialPosition: () => currentLock.position()};
}

function Lock() {
    let position = 50;
    let currentPassword = 0;
    function fullTurn() {
        currentPassword++;
    }
    function rotateLeft(rotateAmount) {
        if (rotateAmount > position) {
            if (position !== 0) {
                currentPassword++;
            }
            position = 100 - Math.abs(position - rotateAmount);
            return position
        } else {
            position = position - rotateAmount
            if (position === 0) {
                currentPassword++;
            }
        }
    }
    function rotateRight(rotateAmount) {
        if (rotateAmount + position >= 100) {
            position = rotateAmount + position - 100;
            currentPassword++;
            if (position === 100) {
                return position = 0;
            }
            return position
        } else {
            position = position + rotateAmount;
        }
    }

    return { fullTurn, rotateLeft, rotateRight, password: () => currentPassword, position: () => position}

}


export default elf;