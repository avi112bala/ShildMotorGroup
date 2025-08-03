import React, { useEffect, useState } from "react";
import { Tringle } from "../../Media/Media";


const WelcomeText = ({ text }) => {
  const [animatedText, setAnimatedText] = useState(""); // Holds the animated text
  const [isTypingComplete, setIsTypingComplete] = useState(false); // Tracks if typing is complete

  useEffect(() => {
    // Guard clause for invalid or empty text
    if (typeof text !== "string" || text.trim() === "") {
      console.error("ERROR: 'text' prop is undefined, null, or invalid.");
      setAnimatedText(""); // Reset animatedText
      setIsTypingComplete(true); // Mark typing as complete
      return;
    }

    // Reset the animation states whenever the `text` prop changes
    setAnimatedText("");
    setIsTypingComplete(false);

    let currentIndex = 0;

    const typeCharacter = () => {
      if (currentIndex < text.length) {
        // Add one character at a time
        const nextChar = text[currentIndex];
        if (nextChar !== undefined) {
          setAnimatedText((prev) => prev + nextChar);
          currentIndex++;
          setTimeout(typeCharacter, 25); // Schedule the next character
        }
      } else {
        setIsTypingComplete(true); // Mark typing as complete
      }
    };

    typeCharacter(); // Start typing animation

    // Cleanup function to stop animation if `text` changes
    return () => {
      currentIndex = text.length; // Prevent further updates
    };
  }, [text]); // Restart animation when `text` prop changes

  return (
    <div className="bg-white border rounded-lg px-4 py-3 text-center w-full max-w-[400px] relative" style={{borderColor:`var(--welcome_border)`}}>
      <p className="text-black whitespace-pre-wrap text-sm font-common">
        {animatedText}
        {/* Show cursor while typing */}
        {!isTypingComplete && <span className="blinking-cursor">|</span>}
      </p>
      <span className="absolute bottom-[-14px] start-[3px] w-[20px]">
        <img src={Tringle}></img>
        {/* // style={{ clipPath: "polygon(0% 100%, 0% 0%, 100% 100%)", transform: "rotate(-29deg)" }} */}
      </span>
    </div>
    // clipPAth: polygon(0% 100%, 0% 0%, 100% 100%)
  );
};

export default WelcomeText;
