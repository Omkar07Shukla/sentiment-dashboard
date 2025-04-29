"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SmilePlus, Frown, ThumbsUp, ThumbsDown, Minus } from "lucide-react"

// Sentiment types
type Sentiment = "happy" | "sad" | "positive" | "negative" | "neutral"

interface SentimentAnalysisProps {
  onSentimentSelect: (sentiment: Sentiment) => void
  selectedSentiment: Sentiment | null
}

export function SentimentAnalysis({ onSentimentSelect, selectedSentiment }: SentimentAnalysisProps) {
  const [text, setText] = useState("")

  return (
    <Card>
      <CardHeader>
        <CardTitle>Analyze Text Sentiment</CardTitle>
        <CardDescription>Enter text and select the sentiment that best matches it</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Enter text to analyze..."
          className="min-h-[100px]"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="grid grid-cols-2 gap-2 md:grid-cols-5">
          <Button
            onClick={() => onSentimentSelect("happy")}
            variant={selectedSentiment === "happy" ? "default" : "outline"}
            className="flex items-center gap-2"
          >
            <SmilePlus className="h-4 w-4" />
            <span>Happy</span>
          </Button>
          <Button
            onClick={() => onSentimentSelect("sad")}
            variant={selectedSentiment === "sad" ? "default" : "outline"}
            className="flex items-center gap-2"
          >
            <Frown className="h-4 w-4" />
            <span>Sad</span>
          </Button>
          <Button
            onClick={() => onSentimentSelect("positive")}
            variant={selectedSentiment === "positive" ? "default" : "outline"}
            className="flex items-center gap-2"
          >
            <ThumbsUp className="h-4 w-4" />
            <span>Positive</span>
          </Button>
          <Button
            onClick={() => onSentimentSelect("negative")}
            variant={selectedSentiment === "negative" ? "default" : "outline"}
            className="flex items-center gap-2"
          >
            <ThumbsDown className="h-4 w-4" />
            <span>Negative</span>
          </Button>
          <Button
            onClick={() => onSentimentSelect("neutral")}
            variant={selectedSentiment === "neutral" ? "default" : "outline"}
            className="flex items-center gap-2"
          >
            <Minus className="h-4 w-4" />
            <span>Neutral</span>
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={() => setText("")} variant="outline" className="ml-auto">
          Clear
        </Button>
      </CardFooter>
    </Card>
  )
}
