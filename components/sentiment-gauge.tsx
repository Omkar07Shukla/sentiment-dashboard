"use client"

import { useState, useEffect } from "react"

interface SentimentGaugeProps {
  score: number // 0-5 scale
}

export function SentimentGauge({ score }: SentimentGaugeProps) {
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    // Convert score to rotation angle (0-180 degrees)
    // 0 score = -90 degrees (left), 5 score = 90 degrees (right)
    const angle = -90 + (score / 5) * 180
    setRotation(angle)
  }, [score])

  return (
    <div className="relative w-32 h-20">
      {/* Gauge background */}
      <div className="absolute w-full h-16 bottom-0 overflow-hidden">
        <div
          className="absolute w-32 h-32 bottom-0 rounded-full border-8 border-transparent border-t-red-500 border-l-red-500 border-r-green-500"
          style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
        />
      </div>

      {/* Gauge numbers */}
      <div className="absolute bottom-0 left-0 text-xs">3</div>
      <div className="absolute bottom-0 right-0 text-xs">5</div>

      {/* Gauge needle */}
      <div
        className="absolute bottom-0 left-1/2 w-1 h-14 bg-black rounded-t-full origin-bottom transform -translate-x-1/2"
        style={{ transform: `translateX(-50%) rotate(${rotation}deg)` }}
      />

      {/* Gauge center */}
      <div className="absolute bottom-0 left-1/2 w-4 h-4 bg-black rounded-full transform -translate-x-1/2 translate-y-1/2" />

      {/* Emoji indicator */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-2xl">
        {score >= 4 ? "😀" : score >= 3 ? "😐" : "😞"}
      </div>
    </div>
  )
}
