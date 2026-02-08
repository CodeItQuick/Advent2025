function theSafe() {
    let currentDialPosition = 50;
    let currentPassword = 0;

    function dial(turns) {
        let rotation = +turns.substring(1)
        if (rotation > 99) {
            currentPassword = currentPassword + Math.floor(rotation / 100);
            rotation = rotation % 100;
        }
        if (turns.startsWith('L')) {
            if (rotation > currentDialPosition) {
                if (currentDialPosition !== 0) {
                    currentPassword++;
                }
                currentDialPosition = 100 - Math.abs(currentDialPosition - rotation);
                return currentDialPosition
            } else {
                currentDialPosition = currentDialPosition - rotation
            }
        } else if (rotation + currentDialPosition >= 100) {
            currentDialPosition = rotation + currentDialPosition - 100;
            currentPassword++;
            if (currentDialPosition === 100) {
                return currentDialPosition = 0;
            }
            return currentDialPosition
        } else {
            currentDialPosition = currentDialPosition + rotation;
        }
        if (currentDialPosition === 0) {
            currentPassword++;
        }
        return currentDialPosition;
    }

    return {dial, password: () => currentPassword, dialPosition: () => currentDialPosition};
}

export default theSafe;