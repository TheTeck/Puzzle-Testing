import React, { useState, useEffect } from 'react'
import Piece2 from '../Piece2/Piece2'
import './Puzzle2.css'

export default function Puzzle2 () {

    const puzzleImage = 'images/radagast.png'
    const puzzleDim = [ 584, 469 ]
    const pieceSize = 40

    const [ xCount, setXCount ] = useState(Math.floor(puzzleDim[0] / pieceSize))
    const [ yCount, setYCount ] = useState(Math.floor(puzzleDim[1] / pieceSize))
    const [ currentActive, setCurrentActive ] = useState(null)
    const [ thePuzzle, setThePuzzle ] = useState([])
    const [ force, setForce ] = useState(false)

    function setActive(e) {
        if (currentActive) {
            const temp = thePuzzle
            temp[currentActive].z = 1
            setThePuzzle(temp)
            setCurrentActive(null)
        } else {
            if (e.target.id >= 0 && e.target.id < yCount * xCount)
                setCurrentActive(e.target.id)
        }
    }

    function movePiece(e) {
        if (currentActive) {
            const temp = thePuzzle
            temp[currentActive].xLoc = e.clientX - pieceSize / 2
            temp[currentActive].yLoc = e.clientY - pieceSize / 2
            temp[currentActive].z = 2
            setThePuzzle(temp)
            setForce(!force)
        }
    }

    useEffect(() => {
        const temp = []
        for(let y = 0; y < yCount; y++) {
            for (let x = 0; x < xCount; x++) {
                temp.push(
                    {
                        x: x,
                        y: y,
                        z: 1,
                        xLoc: x * pieceSize,
                        yLoc: y * pieceSize
                    }
                )
            }
        }
        setThePuzzle(temp)
    }, [])

    return (
        <div id="puzzle2-container" onClick={setActive} onMouseMove={movePiece} >
            {
                thePuzzle.map((piece, index) => {
                    return (
                        <Piece2 
                            key={index}
                            image={puzzleImage}
                            xLoc={piece.xLoc}
                            yLoc={piece.yLoc}
                            size={pieceSize}
                            xImg={piece.x}
                            yImg={piece.y}
                            id={index}
                            z={piece.z}
                        />
                    )
                })
            }
        </div>
    )
}