import { useCallback, useState } from "react";
import "./App.css";
import WordSpace from "./components/WordSpace";
import WordDisplay from "./components/WordDisplay";

function App() {
    const initialWord = "cod";
    const targetWord = "pit";
    const [currentWord, setCurrentWord] = useState(initialWord);

    function handleSubmit(word: string): boolean {
        if (singleLetterDiffers(currentWord, word)) {
            if (targetWord === word) {
                console.log('You won, yey! (I really gotta change it to something more rewarding, huh?)')
            }
            setCurrentWord(word)
            return true;
        }
        return false;
    }

    const singleLetterDiffers = useCallback((first: string, second: string) => {
        if (first.length != second.length) return false;
        let diff = 0;
        for (let i = 0; i < first.length; i++) {
            if (first.charAt(i) != second.charAt(i)) diff++;
        }
        return diff === 1;
    }, [])

    return (
        <>
            <div>
                <WordDisplay content={targetWord} />
                <WordDisplay content={currentWord} target={targetWord} />
                <WordSpace maxLength={3} onSubmit={handleSubmit}></WordSpace>
            </div>
        </>
    );
}

export default App;
