import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import sucess from '../assets/success.mp3'
import Keyboard from './Keyboard'

import '../stylesheets/WordSpace.css'

function WordSpace({ maxLength, onSubmit }: { maxLength: number, onSubmit: (word: string) => boolean }) {

    const [content, setContent] = useState('')
    const [focused, setFocused] = useState(false)

    const space = useRef<HTMLDivElement>(null);
    const audio = useRef<HTMLAudioElement>(null);

    const handleKey = useCallback(async (key: string, onKeyBoard: boolean) => {
        if (onKeyBoard && focused) return
        if (isLetter(key) && canType()) {
            setContent(c => c.concat(key))
            return
        }
        if ((key === 'backspace' || key === 'back') && canErase()) {
            setContent(c => c.substring(0, c.length - 1))
            return
        }
        if (key === 'enter' && isWordComplete()) {
            const isKnown = await isWordKnown(content);
            if (isKnown) {
                if (onSubmit(content)) {
                    shakeRight()
                    setContent('')
                    playSuccessSound()
                } else shakeWrong()
            } else shakeUnknown()
        }
    }, [content, maxLength, focused])

    const handleKeyDown = useCallback(async (event: KeyboardEvent) => {
        await handleKey(event.key.toLowerCase(), true)
    }, [handleKey])

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown])

    useEffect(() => {
        const handleIn = () => setFocused(true);
        const handleOut = () => setFocused(false);

        document.addEventListener('focusin', handleIn)
        document.addEventListener('focusout', handleOut)
        return () => {
            document.removeEventListener('focusin', handleIn)
            document.removeEventListener('focusout', handleOut)
        }
    }, [focused])


    /**
     * Utility functions
     */

    const playSuccessSound = useCallback(() => {
        const current = audio.current;
        if (current) {
            current.currentTime = 0
            current.play()
        }
    }, [])

    const isWordKnown = useCallback(async (word: string): Promise<boolean> => {
        return await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
            .then((response) => {
                if (response.ok) {
                    return true
                }
                if (response.status === 404) {
                    console.log(`This isn't necessarily an issue. The word '${word}' might not exist.`)
                    return false
                } else throw new Error()
            }).catch(err => {
                console.error('Oopsie! Something has gone wrong: ' + err)
                return false
            })
    }, [])

    const isWordComplete = useCallback((): boolean => {
        return content.length === maxLength
    }, [content, maxLength])

    const canType = useCallback(() => {
        return content.length < maxLength;
    }, [content, maxLength])

    const canErase = useCallback(() => {
        return content.length > 0;
    }, [content])

    const isLetter = useCallback((c: string) => {
        return /^[a-z]$/.test(c)
    }, [])

    const display = useMemo(() => {
        const result = []
        for (let i = 0; i < maxLength; i++) {
            result[i] = <CharacterSpace key={i} content={content.charAt(i)} />
        }
        return result;
    }, [content, maxLength]);


    /**
     * Animation-related functions
     */

    const shakeRight = useCallback(() => {
        const current = space.current;
        if (current) {
            current.classList.add('shakeRight')
        }
    }, [])

    const shakeWrong = useCallback(() => {
        const current = space.current;
        if (current) {
            current.classList.add('shakeWrong')
        }
    }, [])

    const shakeUnknown = useCallback(() => {
        const current = space.current;
        if (current) {
            current.classList.add('shakeUnknown')
        }
    }, [])

    const handleAnimationEnd = (event: React.AnimationEvent<HTMLDivElement>) => {
        const current = event.currentTarget
        if (current) {
            current.classList.remove(event.animationName)
        }
    }

    return (
        <>
            <audio src={sucess} ref={audio} />
            <div id="wordSpace" ref={space} onAnimationEnd={handleAnimationEnd}>
                {display}
            </div>
            <Keyboard keyDown={c => handleKey(c, false)}></Keyboard>
        </>
    )
}

function CharacterSpace({ content }: { content: string }) {
    return (
        <>
            <div id="characterSpace">
                <p>{content}</p>
            </div>
        </>
    )
}

export default WordSpace