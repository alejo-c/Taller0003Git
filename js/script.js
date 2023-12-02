document.addEventListener('DOMContentLoaded', () => {
    let buttonsList = []

    let screen = document.getElementById('screen-input')

    let clearButton = document.getElementById('clear-screen-btn')
    let deleteLastButton = document.getElementById('delete-last-btn')
    let calculateButton = document.getElementById('calculate-btn')
    let convertDegreesButton = document.getElementById('convert-degrees-btn')

    for (let i = 0; i < 10; i++)
        buttonsList.push(document.getElementById(`num-${i}-btn`))

    buttonsList.push(...[
        document.getElementById('substract-btn'),
        document.getElementById('add-btn'),
        document.getElementById('multiply-btn'),
        document.getElementById('divide-btn'),
        document.getElementById('dot-btn'),
    ])

    const clear = () => {
        screen.value = ''
        screen.focus()
    }

    const deleteLast = () => {
        if (screen.value.length > 0)
            screen.value = screen.value.substring(0, screen.value.length - 1)
        screen.focus()
    }

    const isOperator = operator => '+-*/'.includes(operator)

    const calculate = () => {
        try {
            let aux = screen.value.charAt(screen.value.length - 1)
            if (isOperator(aux))
                deleteLast()

            let result = eval(screen.value)
            if (result || result == '0')
                screen.value = result
            else
                throw 'error'
        } catch (e) {
            console.error(e)
        }
        screen.focus()
    }

    const convertDegrees = () => {
        screen.value = `(${screen.value})* 9/5 + 32`
        calculate()
    }

    const atButtonClick = event => {
        let n = event.currentTarget.value
        if (!n) return

        if (isOperator(n)) {
            let p = screen.value.charAt(screen.value.length - 1)
            if (isOperator(p) && (p != '*' || (n != '-' && n != '*')) && (p != '/' || n != '-'))
                deleteLast()
        }
        screen.value += n
        screen.focus()
    }

    const atKeyPressed = event => {
        let key = event.key

        if (key.includes('Arrow') || key == 'Backspace' || key == 'Delete')
            return
        if (key == 'Enter')
            return calculate()
        if (key == 'Escape')
            return clear()
        if (!/^\d|\+|-|\*|\/|\.$/.test(key))
            return event.preventDefault()
    }

    buttonsList.forEach(button => button.onclick = atButtonClick)

    screen.onkeydown = atKeyPressed
    screen.focus()

    clearButton.onclick = clear
    deleteLastButton.onclick = deleteLast
    calculateButton.onclick = calculate
    convertDegreesButton.onclick = convertDegrees
})
