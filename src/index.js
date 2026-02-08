import sequence from "./sequence.js";
import theSafe from "./theVault.js";

const safe = theSafe();
let entryNum = 0;
for (const entry of sequence.split('\n')) {
    entryNum++;
    safe.dial(entry);
    console.log(`line ${entryNum}`)
    console.log(safe.password(), safe.dialPosition())
}

console.log(safe.password())