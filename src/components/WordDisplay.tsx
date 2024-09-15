import { useMemo } from "react"

import '../stylesheets/WordDisplay.css'

function WordDisplay({ content, target, chain }: { content: string, target?: string, chain: string[] }) {

    const display = useMemo(() => {
        const result = []
        for (let i = 0; i < content.length; i++) {
            const char = content.charAt(i)
            const highlight = shouldFormat() && target?.charAt(i) === char;
            let shake = false;
            if (chain.length > 1) {
                shake = shouldFormat() && chain[chain.length - 2].charAt(i) !== char;
            }
            result[i] = <CharacterDisplay content={char} highlight={highlight} shake={shake} key={i} />
        }
        return result
    }, [content, target, chain])

    function shouldFormat(): boolean {
        if (target) {
            return target.length > 0 && target.length === content.length;
        }
        return false;
    }

    return (
        <>
            <div id="wordDisplay">
                {display}
            </div>
        </>
    )
}

function CharacterDisplay({ content, highlight, shake }: { content: string, shake?: boolean, highlight?: boolean }) {

    return (
        <>
            <div id='characterDisplay' className={`${highlight ? 'highlight' : ''} ${shake ? 'shake' : ''}`.trim()}>
                <p>{content}</p>
            </div>
        </>
    )
}

export default WordDisplay