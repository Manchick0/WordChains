import Overlay from "./Overlay"

import '../stylesheets/InfoOverlay.css'

function InfoOverlay({ visible, handleClose }: { visible: boolean, handleClose: () => void }) {

    return (
        <>
            <Overlay visible={visible}>
                <div id="infoOverlay">
                    <h2>What are Word Chains?</h2>
                    <hr />
                    <p>
                        <b>Word Chains</b> is a game where your main objective is to get from an initial word to the target one. Those words get
                        chosen from a list of predefined pairs, which means you'll never face any hard or impossible challenges.
                    </p>
                    <br />
                    <h2>How to play?</h2>
                    <hr />
                    <p>
                        Start by typing words on your keyboard. If the typed word exists and differs from the current one by exactly
                        one letter, the word will be accepted. Otherwise, you'll see it being rejected. It'll glow yellow in case the
                        word is far too off, and red in case it doesn't exist.
                    </p>
                    <button onClick={handleClose}>Got it!</button>
                </div>
            </Overlay>
        </>
    )
}

export default InfoOverlay