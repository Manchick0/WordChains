import { useState } from 'react'
import '../stylesheets/TitleBar.css'

import icon from '../../public/icon.svg'
import coffee from '../assets/buymeacoffee.svg'
import info from '../assets/info.svg'
import InfoOverlay from './InfoOverlay'

function TitleBar() {

    const [overlayVisible, showOverlay] = useState(!localStorage.getItem('isFamiliar'))

    function handleInfoClose() {
        const isFamiliar = localStorage.getItem('isFamiliar')
        if (!isFamiliar) {
            localStorage.setItem('isFamiliar', 'true')
        }
        showOverlay(false)
    }

    return (
        <>
            <InfoOverlay visible={overlayVisible} handleClose={handleInfoClose} />
            <div id='titleBar'>
                <InfoSection handleInfoClick={() => showOverlay(v => !v)} />
                <Title />
                <SupportSection />
            </div>
        </>
    )
}

function Title() {
    return (
        <>
            <div id='title'>
                <img src={icon} />
                <h1>Word Chains</h1>
            </div>
        </>
    )
}

function InfoSection({ handleInfoClick }: { handleInfoClick: () => void }) {

    return (
        <>
            <div id='infoSection'>
                <button onClick={handleInfoClick} id='infoButton'>
                    <img src={info} width={24} height={24} />
                </button>
            </div>
        </>
    )
}

function SupportSection() {
    return (
        <>
            <div id='supportSection'>
                <a href='https://buymeacoffee.com/manchick' target='_blank'>
                    <button id='support'>
                        <img src={coffee} alt='Buy me a coffee' />
                    </button>
                </a>
            </div>
        </>
    )
}

export default TitleBar