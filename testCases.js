const { exec } = require('child_process');

function testAlgorithm(code) {
    return new Promise((resolve, reject) => {
        // یک تست ساده برای بررسی درستی الگوریتم
        const testInput = '5'; // ورودی تست
        const expectedOutput = '120'; // خروجی فاکتوریل 5 = 120

        // اضافه کردن کد تست به انتهای کد کاربر
        const fullCode = `
            ${code}
            console.log(factorial(${testInput}));
        `;

        // اجرای کد در محیط ایزوله
        exec(`node -e "${fullCode.replace(/"/g, '\\"')}"`, (err, stdout, stderr) => {
            if (err || stderr) {
                return resolve({ success: false, error: stderr || err.message });
            }

            // مقایسه خروجی کاربر با خروجی مورد انتظار
            if (stdout.trim() === expectedOutput) {
                resolve({ success: true });
            } else {
                resolve({ success: false, error: `خروجی شما: ${stdout.trim()}, خروجی مورد انتظار: ${expectedOutput}` });
            }
        });
    });
}

module.exports = { testAlgorithm };
