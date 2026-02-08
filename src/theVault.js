
function theSafe() {
    let currentDialPosition = 50;
    let currentPassword = 0;
    function dial(turns) {
        if (turns.startsWith('L')) {
            let rotation = +turns.substring(1)
            if (rotation > 99) {
                currentPassword = currentPassword + Math.floor(rotation / 100);
                rotation = rotation % 100;
            }
            if (rotation > currentDialPosition) {
                if (currentDialPosition !== 0) {
                    currentPassword++;
                }
                currentDialPosition = 100 - Math.abs(currentDialPosition - rotation);
                return currentDialPosition
            } else {
                currentDialPosition = currentDialPosition - rotation
                if (currentDialPosition === 0) {
                    currentPassword++;
                }
                return currentDialPosition;
            }
        } else if (turns.startsWith('R')) {
            let rotation = +turns.substring(1)
            if (rotation > 99) {
                currentPassword = currentPassword + Math.floor(rotation / 100);
                rotation = rotation % 100;
            }
            if (rotation + currentDialPosition >= 100) {
                currentDialPosition = currentDialPosition + rotation - 100;
                currentPassword++;
                if (currentDialPosition === 100) {
                    return currentDialPosition = 0;
                }
                return currentDialPosition
            } else {
                currentDialPosition = currentDialPosition + rotation;
                if (currentDialPosition === 0) {
                    currentPassword++;
                }
                return currentDialPosition;
            }
        }

        return 0;
    }
    return { dial, password: () => currentPassword, dialPosition: () => currentDialPosition };
}

export default theSafe;