import { useState } from "react";
import Image from "next/image";

const boardSize = 10;
const snakes = { 16: 6, 47: 26, 49: 11, 56: 53, 62: 19, 64: 60, 87: 24, 93: 73, 95: 75, 98: 78 };
const ladders = { 1: 38, 4: 14, 9: 31, 21: 42, 28: 84, 36: 44, 51: 67, 71: 91, 80: 100 };

export default function Home() {
  const [position, setPosition] = useState(1);
  const [dice, setDice] = useState(1);
  const [moves, setMoves] = useState(0);

  const rollDice = () => {
    const newDice = Math.floor(Math.random() * 6) + 1;
    setDice(newDice);
    let newPosition = position + newDice;
    if (newPosition > 100) newPosition = position;
    if (snakes[newPosition]) newPosition = snakes[newPosition];
    if (ladders[newPosition]) newPosition = ladders[newPosition];
    setPosition(newPosition);
    setMoves(moves + 1);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-[#201E43] text-[#EEE]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="grid grid-cols-10 gap-1">
          {[...Array(boardSize * boardSize)].map((_, index) => {
            const cellNumber = boardSize * boardSize - index;
            return (
              <div
                key={index}
                className={`w-10 h-10 flex items-center justify-center border ${cellNumber === position ? "bg-[#508C9B]" : "bg-[#134B70]"}`}
              >
                {cellNumber}
                {snakes[cellNumber] && <Image src="/images/snake.png" alt="Snake" width={20} height={20} />}
                {ladders[cellNumber] && <Image src="/images/ladder.png" alt="Ladder" width={20} height={20} />}
              </div>
            );
          })}
        </div>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <button
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            onClick={rollDice}
          >
            Roll Dice
          </button>
          <div className="text-sm sm:text-base">Dice: {dice}</div>
          <div className="text-sm sm:text-base">Moves: {moves}</div>
        </div>
      </main>
    </div>
  );
}