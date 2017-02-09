var e = module.exports = {};


e.init = () => {
    e.category = bu.CommandType.GENERAL;
};
e.requireCtx = require;

e.isCommand = true;
e.hidden = false;
e.usage = 'brainfuck <code>';
e.info = 'Executes brainfuck code.';
e.longinfo = `<p>Executes brainfuck code.</p>`;
e.alias = ['rainfuck', 'bf'];
e.flags = [{
    flag: 'p',
    word: 'pointers',
    desc: 'Shows a list of pointers after the execution.'
}];
e.execute = async function(msg, words) {
    if (words[1] && /^-[-+<>\.,\[\]]/.test(words[1]))
        words[1] = '\\' + words[1];
    let input = bu.parseInput(e.flags, words);
    if (input.undefined.length == 0) {
        bu.send(msg, 'Not enough parameters! Do `b!help brainfuck` for more details.');
        return;
    }
    try {
        let output = await bu.brainfuck(input.undefined.join(' '));
        bu.send(msg, output.output.length == 0 ? 'No output...' : `Output:\n${output.output}${input.p ? '\n\n[' + output.array.join(', ') + ']' : ''}`);
    } catch (err) {
        logger.error(err);
        bu.send(msg, `Something went wrong!
Error: \`${err.message}\``);
    }

};