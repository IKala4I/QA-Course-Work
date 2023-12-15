import {ESLint} from 'eslint';

export async function checkCode(code) {
    const eslint = new ESLint();
    let codeLines = code.split('\n');
    let flag = true;
    let countRemovedLines = 0;

    const errors = {
        'critical': 0,
        'semi': 0,
        'eqeqeq': 0,
        'no-var': 0,
        'no-unused-vars': 0
    };


    while (flag) {
        try {
            const results = await eslint.lintText(code);

            if (results[0].messages.length === 1 && results[0].messages[0].fatal) {
                console.log(`Критична помилка: ${results[0].messages[0].message}. Рядок: ${results[0].messages[0].line + countRemovedLines}, стовпець: ${results[0].messages[0].column}`);
                codeLines = codeLines.filter((line, index, array) => index !== (results[0].messages[0].line - 1));
                code = codeLines.join('\n');
                countRemovedLines += 1;
                errors.critical = errors.critical + 1;
            } else if (!results[0].messages.length) {
                flag = false;
            } else {
                results[0].messages.forEach((message) => {
                    console.log(`Помилка: ${message.message}. Рядок: ${message.line + countRemovedLines}, стовпець: ${message.column}`);
                    if (errors[message.ruleId] >= 0)
                        errors[message.ruleId] = errors[message.ruleId] + 1;
                });
                break;
            }
        } catch (error) {
            console.error('Помилка при перевірці коду:', error);
        }
    }
    return errors;
}