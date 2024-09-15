import { useMemo } from "react"
import Overlay from "./Overlay"

function ResultOverlay({ visible, turn, chain, onPlayAgain }: { visible: boolean, turn: number, chain: string[], onPlayAgain: () => void }) {

    const getMessage = useMemo(() => {
        const messages = [
            'Great!',
            'Good job!',
            'Nice!',
            'Keep it up!',
            "You're nailing it!",
            'Well done!',
            'Brilliant!'
        ]
        return messages[Math.floor(Math.random() * messages.length)]
    }, [])

    const formatChain = useMemo(() => {
        return chain.reduce((left, right) => `${left} » ${right}`)
    }, [chain])

    return (
        <>
            <Overlay visible={visible}>
                <div id="resultOverlay">
                    <h1>{getMessage}</h1>
                    <hr />
                    <p>
                        Took you {turn} {turn > 1 ? 'turns' : 'turn'}:
                        <br />
                        {formatChain}
                    </p>
                    <button onClick={() => onPlayAgain()}>Play Again</button>
                </div>
            </Overlay>
        </>
    )
}

export default ResultOverlay