import { useEffect, useState } from "react"

interface TruncateTextProps {
    text: string
    delay?: number
    maxChars: number
}

const TruncateText = ({ text, maxChars, delay }: TruncateTextProps) => {
    const [showFullText, setShowFulltext] = useState(false);
    const [truncateText, setTruncateText] = useState(text)

    useEffect(() => {

        const timer = setTimeout(() => {
            setTruncateText(showFullText ? text : text.slice(0, maxChars))
        }, delay)

        return () => clearTimeout(timer);

    }, [showFullText, text, maxChars, delay])

    return (
        <p style={{ cursor: "pointer" }} title={showFullText ? '' : text} onMouseEnter={() => setShowFulltext(true)} onMouseLeave={() => setShowFulltext(false)}>
            {truncateText}
        </p>
    )
}

export default TruncateText;