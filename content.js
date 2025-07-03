(function () {
    'use strict';

    const originalReg = "23mic7189"; // Your registration number
    const password = "5JukPPmr";     // Your password

    const supers = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' };
    const toSuper = str => str.split('').map(c => supers[c] || c).join('');

    function generateFormats(reg) {
        const match = reg.match(/^(\d)(\d)([a-z]+)(\d+)$/i);
        if (!match) return [reg];

        const [_, d1, d2, chars, digits] = match;
        const superD1 = toSuper(d1), superD2 = toSuper(d2), superDigits = toSuper(digits);

        return [
            `${d1}${d2}${chars}${digits}`,
            `${superD1}${d2}${chars}${digits}`,
            `${d1}${superD2}${chars}${digits}`,
            `${superD1}${superD2}${chars}${digits}`,
            `${d1}${d2}${chars}${superDigits}`,
            `${superD1}${superD2}${chars}${superDigits}`,
            `${d1}${superD2}${chars}${superDigits}`,
            `${superD1}${d2}${chars}${superDigits}`,
        ];
    }

    const formats = generateFormats(originalReg);
    const regAttempt = formats[Math.floor(Math.random() * formats.length)];

    function injectCredentials() {
        const usernameInput = document.querySelector("input[name='username']");
        const passwordInput = document.querySelector("input[name='password']");

        if (usernameInput && passwordInput) {
            usernameInput.value = regAttempt;
            passwordInput.value = password;
            console.log(`[Wi-Fi AutoFill] Injected username: ${regAttempt}`);
        } else {
            setTimeout(injectCredentials, 300);
        }
    }

    injectCredentials();
})();
