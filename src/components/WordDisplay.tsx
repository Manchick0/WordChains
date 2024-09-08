import { useEffect, useMemo, useState } from "react"

function WordDisplay({ content, target }: { content: string, target?: string }) {

    const [lastContent, setLastContent] = useState(content)

    useEffect(() => {
        setLastContent(content);
    }, [content]);

    const display = useMemo(() => {
        const result = []
        for (let i = 0; i < content.length; i++) {
            const char = content.charAt(i)
            const highlight = shouldFormat() && target?.charAt(i) === char;
            const shake = shouldFormat() && lastContent.charAt(i) !== char;
            result[i] = <CharacterDisplay content={char} highlight={highlight} shake={shake} />
        }
        return result
    }, [content, target])

    function shouldFormat(): boolean {
        if (target) {
            return target.length > 0 && target.length === content.length;
        }
        return false;
    }

    return (
        <>
            <div className="wordDisplay">
                {display}
            </div>
        </>
    )
}

function CharacterDisplay({ content, highlight, shake }: { content: string, shake?: boolean, highlight?: boolean }) {
    return (
        <>
            <div className={`characterSpace ${highlight ? 'highlight' : ''} ${shake ? 'shake' : ''}`}>
                <p >{content}</p>
            </div>
        </>
    )
}

export default WordDisplay