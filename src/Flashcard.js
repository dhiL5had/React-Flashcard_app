import React, { useState, useEffect, useRef } from 'react'

export default function Flashcard({ flashcard }) {

    const [flip, setFlip] = useState(false)
    const [height, setHeight] = useState('initial')

    const frontEl = useRef()
    const backEl = useRef()

    function setMaxHeght() {
        const frontHeight = frontEl.current.getBoundingClientRect().height
        const backHeight = backEl.current.getBoundingClientRect().height
        setHeight(Math.max(frontHeight, backHeight, 100))
    }

    useEffect(setMaxHeght, [flashcard.question, flashcard.answer, flashcard.options])

    useEffect(() => {
        window.addEventListener('resize', setMaxHeght)
        return () => window.removeEventListener('resize', setMaxHeght)
    }, [])

  return (
    <div 
        className={`card ${flip ? 'flip': ''}`}
        style={{height: height}}
        onClick={() => setFlip(!flip)}
    >
        <div className="front" ref={frontEl}>
            {flashcard.question}
            <div className="flashcard-options">
                {flashcard.options.map(option =>{
                    return <div className='flashcard-option' key={option}>{option}</div>
                })}
            </div>
        </div>
        <div className="back" ref={backEl}>{flashcard.answer}</div>
    </div>
  )
}
