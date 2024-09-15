import { ReactNode, useEffect, useRef } from "react";
import '../stylesheets/Overlay.css'

function Overlay({ children, visible = false }: { children: ReactNode, visible: boolean }) {
    const overlay = useRef<HTMLDivElement>(null)
    const content = useRef<HTMLDivElement>(null)
    const background = useRef<HTMLDivElement>(null)

    const blurIn: PropertyIndexedKeyframes = {
        opacity: [0, 1]
    }
    const blurOut: PropertyIndexedKeyframes = {
        opacity: [1, 0]
    }
    const slideIn: Keyframe[] = [
        {
            transform: "translateY(1000px)"
        },
        {
            transform: "translateY(0px)"
        }
    ]
    const slideOut: Keyframe[] = [
        {
            transform: "translateY(0px)"
        },
        {
            transform: "translateY(1000px)"
        }
    ]
    const animationOptions: KeyframeAnimationOptions = {
        easing: "ease-in-out",
        duration: 300
    }

    useEffect(() => {
        const currentOverlay = overlay.current;
        const currentBackground = background.current;
        const currentContent = content.current;
        if (!currentOverlay || !currentBackground || !currentContent) return

        if (visible) {
            currentOverlay.style.display = 'flex';
            currentContent.animate(slideIn, animationOptions)
            currentBackground.animate(blurIn, animationOptions)
        } else {
            const contentAnimation = currentContent.animate(slideOut, animationOptions);
            const backgroundAnimation = currentBackground.animate(blurOut, animationOptions);

            Promise.all([contentAnimation.finished, backgroundAnimation.finished]).then(() => {
                currentOverlay.style.display = 'none';
            });
        }
    }, [visible])

    return (
        <>
            <div ref={overlay} id="overlay">
                <div id="background" ref={background} />
                <div id="content" ref={content}>
                    {children}
                </div>
            </div>
        </>
    )
}

export default Overlay