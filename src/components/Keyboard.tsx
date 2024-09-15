import { useMemo } from 'react'
import '../stylesheets/Keyboard.css'

const layout: string[][] = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['back', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'enter']
]

function Keyboard({ keyDown }: { keyDown: (key: string) => void }) {

    const board = useMemo(() => {
        return layout.map((row, index) => {
            const keys = row.map(str => {
                return <Key letter={str} keyDown={keyDown} key={str}></Key>
            })
            const className = 'keyboardRow' + (index === 1 ? ' middle' : '')
            return <div key={index} className={className}>{keys}</div>
        })
    }, [layout, keyDown])

    return (
        <>
            <div>
                {board}
            </div>
        </>
    )
}

function Key({ letter, keyDown }: { letter: string, keyDown: (key: string) => void }) {

    return (
        <>
            <div id='key'>
                <button onClick={() => keyDown(letter)}>
                    {letter}
                </button>
            </div>
        </>
    )
}

export default Keyboard