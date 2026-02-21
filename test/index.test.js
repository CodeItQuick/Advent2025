import assert from 'node:assert';
import elf from "../src/theVault.js";

describe('the dial', () => {
    [
    // { rotate: 'L68', answer: 82, password: 1 },
    // { rotate: 'L75', answer: 75, password: 1 },
    // { rotate: 'L175', answer: 75, password: 2 },
    // { rotate: 'L275', answer: 75, password: 3 },
    // { rotate: 'L125', answer: 25, password: 1 },
    // { rotate: 'R175', answer: 25, password: 2 },
    // { rotate: 'R501', answer: 51, password: 5 },
    // { rotate: 'L150', answer: 0, password: 2 },
    { rotate: 'R150', answer: 0, password: 2 },
    { rotate: 'R125', answer: 75, password: 1 },
    { rotate: 'R50', answer: 0, password: 1 },
    { rotate: 'R51', answer: 1, password: 1 },
    { rotate: 'L50', answer: 0, password: 1 },
    { rotate: 'L51', answer: 99, password: 1 },
    { rotate: 'L10', answer: 40, password: 0 },
    { rotate: 'R10', answer: 60, password: 0 },
    ].forEach(({ rotate, answer, password}) => {
        it(`when starting at 50 when ${rotate} should return ${answer}`, () => {
            const { dial, password: currentPassword, dialPosition } = elf();
            assert.equal(dial(rotate), answer);
            assert.equal(currentPassword(), password)
            assert.equal(dialPosition(), answer)
        });
    })
    it('when starting at 50 when L68 and then L30 should return 52', () => {
        const { dial } = elf();
        assert.equal(dial("L68"), 82);
        assert.equal(dial("L30"), 52)
    });
    it('when starting at 1 when L1 should return 0', () => {
        const { dial } = elf();
        assert.equal(dial("L49"), 1);
        assert.equal(dial("L1"), 0)
    });
    it('when starting at 99 when R1 should return 0', () => {
        const { dial } = elf();
        assert.equal(dial("R49"), 99);
        assert.equal(dial("R1"), 0)
    });
    it('when starting at 50 when L68 and then L30 then R48 should return 52', () => {
        const { dial } = elf();        assert.equal(dial("L68"), 82);
        assert.equal(dial("L30"), 52)
        assert.equal(dial("R48"), 0)
    });
    it('when starting at 50 when L68 and then L30 then R48 then L5 should return 95', () => {
        const { dial } = elf();        assert.equal(dial("L68"), 82);
        assert.equal(dial("L30"), 52)
        assert.equal(dial("R48"), 0)
        assert.equal(dial("L5"), 95)
    });
    it('when starting at 50 when L68 and then L30 then R48 then L5 then R60 should return 95', () => {
        const { dial } = elf();        assert.equal(dial("L68"), 82);
        assert.equal(dial("L30"), 52)
        assert.equal(dial("R48"), 0)
        assert.equal(dial("L5"), 95)
        assert.equal(dial("R60"), 55)
    });
    it('when starting at 50 when L68 and then L30 then R48 then L5 then R60 then L55 should return 95', () => {
        const { dial } = elf();        assert.equal(dial("L68"), 82);
        assert.equal(dial("L30"), 52)
        assert.equal(dial("R48"), 0)
        assert.equal(dial("L5"), 95)
        assert.equal(dial("R60"), 55)
        assert.equal(dial("L55"), 0)
    });
    it('when starting at 50 when executing the full sequence then L1 should return 32 with a password of 6', () => {
        const { dial, password } = elf();
        assert.equal(dial("L68"), 82);
        assert.equal(password(), 1);
        assert.equal(dial("L30"), 52);
        assert.equal(dial("R48"), 0);
        assert.equal(password(), 2);
        assert.equal(dial("L5"), 95);
        assert.equal(password(), 2);
        assert.equal(dial("R60"), 55);
        assert.equal(password(), 3);
        assert.equal(dial("L55"), 0);
        assert.equal(password(), 4);
        assert.equal(dial("L1"), 99);
        assert.equal(dial("L99"), 0);
        assert.equal(password(), 5);
        assert.equal(dial("R14"), 14);
        assert.equal(dial("L82"), 32);
        assert.equal(password(), 6);

    });
})
