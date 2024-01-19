import chalk from "chalk";

export function stringify(value) {
    return value ? JSON.stringify(value) : value
}

export function parse(value) {
    return value ? JSON.parse(value) : value
}

export function errorLog({title, error}) {
    console.group(chalk.red(chalk.bold('ERROR: ')) + chalk.hex('#d38383').italic(title))
    console.log(chalk.red.italic('-------------------------------------------------------------------------------------'))
    console.log(chalk.bold(chalk.hex('#d38383')('Event: ')) + chalk.hex('#ffa530')(error))
    console.log(chalk.red.italic('-------------------------------------------------------------------------------------'))
    console.groupEnd()
}

export function successLog({title, message}) {
    console.group(chalk.green(chalk.bold('SUCCESS: ')) + chalk.hex('#76b97b').italic(title))
    console.log(chalk.green.italic('-------------------------------------------------------------------------------------'))
    console.log(message)
    console.log(chalk.green.italic('-------------------------------------------------------------------------------------'))
    console.groupEnd()
}