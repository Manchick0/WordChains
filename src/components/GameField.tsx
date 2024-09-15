import { useCallback, useEffect, useState } from "react"
import chains from '../assets/chains.json'

import WordDisplay from "./WordDisplay"
import WordSpace from "./WordSpace"
import ResultOverlay from "./ResultOverlay"

import '../stylesheets/GameField.css'
import arrow from '../assets/arrow.svg'

function GameField() {

    const [entry, setEntry] = useState(selectRandomEntry())
    const [initialWord, setInitialWord] = useState(entry.initial);
    const [targetWord, setTargetWord] = useState(entry.target);

    const [resultScreenVisible, showResultScreen] = useState(false)
    const [chain, setChain] = useState([initialWord])
    const [currentWord, setCurrentWord] = useState(initialWord)
    const [turn, setTurn] = useState(0)

    function selectRandomEntry() {
        const entries: Entry[] = chains.entries.filter(obj => obj.initial && obj.target);
        return entries[Math.floor(Math.random() * entries.length)]
    }

    useEffect(() => {
        setInitialWord(entry.initial)
        setTargetWord(entry.target)
    }, [entry])

    const handleSubmit = useCallback((word: string) => {
        if (singleLetterDiffers(currentWord, word)) {
            setCurrentWord(word)
            setTurn(t => t + 1)
            setChain(chain => chain.concat(word))
            if (targetWord === word) {
                showResultScreen(true)
            }
            return true;
        }
        return false;
    }, [currentWord, targetWord, turn, chain])

    const reset = useCallback(() => {
        const entry = selectRandomEntry()
        setEntry(entry)
        setCurrentWord(entry.initial)
        showResultScreen(false)
        setChain([''])
        setTurn(0)
    }, [setEntry, setCurrentWord, setChain, setTurn])

    const singleLetterDiffers = useCallback((first: string, second: string): boolean => {
        if (first.length != second.length) return false;
        let diff = 0;
        for (let i = 0; i < first.length; i++) {
            if (first.charAt(i) != second.charAt(i)) diff++;
        }
        return diff === 1;
    }, [])

    return (
        <>
            <div id="gameField">
                <WordFlow currentWord={currentWord} targetWord={targetWord} chain={chain} />
                <WordSpace maxLength={4} onSubmit={handleSubmit} />
                <ResultOverlay visible={resultScreenVisible} turn={turn} chain={chain} onPlayAgain={reset} />
            </div>
        </>
    )
}

function WordFlow({ currentWord, targetWord, chain }: { currentWord: string, targetWord: string, chain: string[] }) {

    return (
        <>
            <div id="wordFlow">
                <WordDisplay content={currentWord} target={targetWord} chain={chain} />
                <img src={arrow} width='64' />
                <WordDisplay content={targetWord} chain={chain} />
            </div>
        </>
    )
}

interface Entry {
    initial: string,
    target: string
}

export default GameField