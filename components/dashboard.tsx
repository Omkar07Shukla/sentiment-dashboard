"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PieChart, Pie, Cell } from "recharts"
import { SmilePlus, Frown, ThumbsUp, ThumbsDown, Minus, ExternalLink, Info, Play } from "lucide-react"
import { SentimentGauge } from "@/components/sentiment-gauge"
import { SentimentTimeline } from "@/components/sentiment-timeline"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VideoModal } from "@/components/video-modal"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

// YouTube shorts data
const youtubeShorts = [
  {
    title: "Motivational Speech | Hindi",
    link: "https://www.youtube.com/shorts/6KpPLkZX31s",
    language: "Hindi",
    description: "A powerful motivational speech in Hindi to inspire your day and boost your confidence.",
  },
  {
    title: "Morning Motivation",
    link: "https://www.youtube.com/shorts/Zs5FK0Vlm2g",
    language: "English",
    description: "Start your day with this energizing morning motivation to set a positive tone.",
  },
  {
    title: "Life Changing Thoughts | Hindi",
    link: "https://www.youtube.com/shorts/XYKuyYWp5Yw",
    language: "Hindi",
    description: "Transformative ideas that can change your perspective on life and help you grow.",
  },
  {
    title: "Never Give Up!",
    link: "https://www.youtube.com/shorts/d6KyHRxY_Kk",
    language: "English",
    description: "An inspiring message about perseverance and the importance of never giving up.",
  },
  {
    title: "Success Tips Hindi",
    link: "https://www.youtube.com/shorts/WJ1sKkKTppY",
    language: "Hindi",
    description: "Practical success tips in Hindi to help you achieve your goals and dreams.",
  },
  {
    title: "Workout Motivation",
    link: "https://www.youtube.com/shorts/kq0snNYK5D0",
    language: "English",
    description: "Get pumped up for your workout with this high-energy motivational short.",
  },
  {
    title: "Self Confidence Hindi",
    link: "https://www.youtube.com/shorts/EnS5fdb0uHk",
    language: "Hindi",
    description: "Build your self-confidence with these powerful affirmations and tips in Hindi.",
  },
  {
    title: "Stay Positive!",
    link: "https://www.youtube.com/shorts/TyA9TTyUwK8",
    language: "English",
    description: "Learn how to maintain a positive mindset even during challenging times.",
  },
  {
    title: "Hard Work Pays Hindi",
    link: "https://www.youtube.com/shorts/C_Gt-HPxqOc",
    language: "Hindi",
    description: "A reminder that consistent hard work always leads to success in the long run.",
  },
  {
    title: "Positive Energy",
    link: "https://www.youtube.com/shorts/4rV8w1zFXm0",
    language: "English",
    description: "Fill your day with positive energy and vibrations through this uplifting short.",
  },
]

// Sentiment types
type Sentiment = "happy" | "sad" | "positive" | "negative" | "neutral"

// Generate random sentiment data for each video
const generateSentimentData = () => {
  return youtubeShorts.map((video) => {
    // Generate random sentiment values
    const happy = Math.floor(Math.random() * 100)
    const sad = Math.floor(Math.random() * 50)
    const positive = Math.floor(Math.random() * 100)
    const negative = Math.floor(Math.random() * 50)
    const neutral = Math.floor(Math.random() * 70)

    const total = happy + sad + positive + negative + neutral

    // Calculate percentages
    const happyPercent = Math.round((happy / total) * 100)
    const sadPercent = Math.round((sad / total) * 100)
    const positivePercent = Math.round((positive / total) * 100)
    const negativePercent = Math.round((negative / total) * 100)
    const neutralPercent = Math.round((neutral / total) * 100)

    // Calculate overall sentiment score (0-5 scale)
    const sentimentScore = ((happy * 5 + positive * 4 + neutral * 3 + sad * 2 + negative * 1) / total).toFixed(2)

    return {
      ...video,
      sentiments: {
        happy,
        sad,
        positive,
        negative,
        neutral,
        total,
      },
      percentages: {
        happy: happyPercent,
        sad: sadPercent,
        positive: positivePercent,
        negative: negativePercent,
        neutral: neutralPercent,
      },
      sentimentScore: Number.parseFloat(sentimentScore),
    }
  })
}

// Generate timeline data for the last 30 days
const generateTimelineData = () => {
  const data = []
  const now = new Date()

  for (let i = 29; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)

    // Generate random sentiment values for each day
    const positive = 20 + Math.floor(Math.random() * 60)
    const neutral = 10 + Math.floor(Math.random() * 30)
    const negative = 5 + Math.floor(Math.random() * 25)

    // Calculate sentiment score (1-5 scale)
    const total = positive + neutral + negative
    const score = ((positive * 5 + neutral * 3 + negative * 1) / total).toFixed(1)

    data.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      positive,
      neutral,
      negative,
      score: Number.parseFloat(score),
    })
  }

  return data
}

export default function Dashboard() {
  const [videos, setVideos] = useState<any[]>([])
  const [timelineData, setTimelineData] = useState<any[]>([])
  const [selectedPeriod, setSelectedPeriod] = useState("30")
  const [overallSentiment, setOverallSentiment] = useState({
    score: 0,
    positive: 0,
    negative: 0,
    neutral: 0,
    total: 0,
    users: 0,
  })
  const [selectedVideo, setSelectedVideo] = useState<any>(null)
  const [showVideoModal, setShowVideoModal] = useState(false)

  useEffect(() => {
    // Generate data when component mounts
    const videoData = generateSentimentData()
    setVideos(videoData)

    const timeline = generateTimelineData()
    setTimelineData(timeline)

    // Calculate overall sentiment
    const totalPositive = videoData.reduce((sum, video) => sum + video.sentiments.happy + video.sentiments.positive, 0)
    const totalNegative = videoData.reduce((sum, video) => sum + video.sentiments.sad + video.sentiments.negative, 0)
    const totalNeutral = videoData.reduce((sum, video) => sum + video.sentiments.neutral, 0)
    const total = totalPositive + totalNegative + totalNeutral

    const avgScore = videoData.reduce((sum, video) => sum + video.sentimentScore, 0) / videoData.length

    setOverallSentiment({
      score: Number.parseFloat(avgScore.toFixed(2)),
      positive: Math.round((totalPositive / total) * 100),
      negative: Math.round((totalNegative / total) * 100),
      neutral: Math.round((totalNeutral / total) * 100),
      total: total,
      users: Math.floor(total * 0.8), // Assuming 80% of interactions are from unique users
    })
  }, [])

  // Filter timeline data based on selected period
  const filteredTimelineData = timelineData.slice(-Number.parseInt(selectedPeriod))

  // Prepare data for sentiment breakdown chart
  const sentimentBreakdownData = [
    { name: "Positive", value: overallSentiment.positive, color: "#4ade80" },
    { name: "Negative", value: overallSentiment.negative, color: "#f43f5e" },
    { name: "Neutral", value: overallSentiment.neutral, color: "#94a3b8" },
  ]

  // Handle video selection
  const handleVideoSelect = (video: any) => {
    setSelectedVideo(video)
    setShowVideoModal(true)
  }

  // Extract YouTube video ID from URL
  const getYouTubeVideoId = (url: string) => {
    const regex = /(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    const match = url.match(regex)
    return match ? match[1] : null
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <h1 className="text-xl font-semibold">Sentiment Analysis Dashboard</h1>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setSelectedPeriod("7")}>
            Past 7 days
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedPeriod("30")}
            className={selectedPeriod === "30" ? "bg-muted" : ""}
          >
            Past 30 days
          </Button>
          <Button variant="outline" size="sm" onClick={() => setSelectedPeriod("90")}>
            Past 3 months
          </Button>
        </div>
      </header>

      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        {/* Top metrics row */}
        <div className="grid gap-4 md:grid-cols-3">
          {/* Overall sentiment level */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>OVERALL SENTIMENT LEVEL</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center">
              <SentimentGauge score={overallSentiment.score} />
              <div className="text-2xl font-bold mt-2">{overallSentiment.score}</div>
              <div className="text-sm text-muted-foreground">out of 5</div>
              <div className="text-green-500 font-medium mt-1">
                {overallSentiment.score >= 4 ? "Positive" : overallSentiment.score >= 3 ? "Neutral" : "Negative"}
              </div>
            </CardContent>
          </Card>

          {/* Comments sentiment */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>COMMENTS SENTIMENT</CardTitle>
            </CardHeader>
            <CardContent className="flex">
              <div className="w-1/2">
                <div className="relative h-32 w-32 mx-auto">
                  <PieChart width={130} height={130}>
                    <Pie
                      data={sentimentBreakdownData}
                      cx="50%"
                      cy="50%"
                      innerRadius={35}
                      outerRadius={60}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {sentimentBreakdownData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                  <div className="absolute inset-0 flex items-center justify-center text-sm">Sentiment breakdown</div>
                </div>
              </div>
              <div className="w-1/2 flex flex-col justify-center gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">👍 {overallSentiment.positive}%</span>
                  <span className="text-xs text-muted-foreground">positive</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">👎 {overallSentiment.negative}%</span>
                  <span className="text-xs text-muted-foreground">negative</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">😐 {overallSentiment.neutral}%</span>
                  <span className="text-xs text-muted-foreground">neutral</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="grid gap-4 grid-rows-2">
            <Card className="bg-cyan-500 text-white">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <div className="text-4xl font-bold">{overallSentiment.total}</div>
                  <div className="text-sm">comments</div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold">
                    +{Math.floor(Math.random() * 10) + 40}.{Math.floor(Math.random() * 10)}%
                  </div>
                  <div className="text-sm flex items-center justify-end">
                    <span>↑</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-cyan-600 text-white">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <div className="text-4xl font-bold">{overallSentiment.users}</div>
                  <div className="text-sm">users</div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold">
                    +{Math.floor(Math.random() * 10) + 30}.{Math.floor(Math.random() * 10)}%
                  </div>
                  <div className="text-sm flex items-center justify-end">
                    <span>↑</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Sentiment timeline */}
        <Card>
          <CardHeader>
            <CardTitle>SENTIMENT TIMELINE</CardTitle>
          </CardHeader>
          <CardContent>
            <SentimentTimeline data={filteredTimelineData} />
          </CardContent>
        </Card>

        {/* Sentiment Analysis Controls */}
        <Card>
          <CardHeader>
            <CardTitle>Sentiment Analysis Controls</CardTitle>
            <CardDescription>Select sentiment for YouTube shorts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
              <Button variant="outline" className="flex flex-col items-center gap-2 h-auto py-4">
                <SmilePlus className="h-6 w-6 text-green-500" />
                <span>Happy</span>
              </Button>
              <Button variant="outline" className="flex flex-col items-center gap-2 h-auto py-4">
                <Frown className="h-6 w-6 text-rose-400" />
                <span>Sad</span>
              </Button>
              <Button variant="outline" className="flex flex-col items-center gap-2 h-auto py-4">
                <ThumbsUp className="h-6 w-6 text-blue-400" />
                <span>Positive</span>
              </Button>
              <Button variant="outline" className="flex flex-col items-center gap-2 h-auto py-4">
                <ThumbsDown className="h-6 w-6 text-red-500" />
                <span>Negative</span>
              </Button>
              <Button variant="outline" className="flex flex-col items-center gap-2 h-auto py-4">
                <Minus className="h-6 w-6 text-slate-400" />
                <span>Neutral</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Video Links and Descriptions */}
        <Card>
          <CardHeader>
            <CardTitle>YouTube Shorts Library</CardTitle>
            <CardDescription>Browse and view your YouTube shorts</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="grid">
              <div className="flex justify-end mb-4">
                <TabsList>
                  <TabsTrigger value="grid">Grid View</TabsTrigger>
                  <TabsTrigger value="list">List View</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="grid">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {videos.map((video, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div className="aspect-video bg-muted relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <img
                            src={`https://i.ytimg.com/vi/${getYouTubeVideoId(video.link)}/hqdefault.jpg`}
                            alt={video.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <Button
                              variant="outline"
                              size="icon"
                              className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40"
                              onClick={() => handleVideoSelect(video)}
                            >
                              <Play className="h-6 w-6" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium truncate">{video.title}</h3>
                          <Badge variant="outline">{video.language}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">{video.description}</p>
                        <div className="mt-3 flex justify-between items-center">
                          <div className="flex items-center gap-1">
                            <span
                              className={`text-sm font-medium ${
                                video.sentimentScore >= 4
                                  ? "text-green-500"
                                  : video.sentimentScore >= 3
                                    ? "text-blue-500"
                                    : "text-red-500"
                              }`}
                            >
                              {video.sentimentScore}/5
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs"
                            onClick={() => handleVideoSelect(video)}
                          >
                            <Info className="h-3 w-3 mr-1" />
                            Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="list">
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 border-b bg-muted/50 p-2 text-sm font-medium">
                    <div className="col-span-4">Title</div>
                    <div className="col-span-1">Language</div>
                    <div className="col-span-4">Description</div>
                    <div className="col-span-2">Sentiment</div>
                    <div className="col-span-1">Actions</div>
                  </div>
                  <ScrollArea className="h-[400px]">
                    <div className="divide-y">
                      {videos.map((video, index) => (
                        <div key={index} className="grid grid-cols-12 p-2 text-sm hover:bg-muted/30">
                          <div className="col-span-4 font-medium truncate">{video.title}</div>
                          <div className="col-span-1">
                            <Badge variant="outline" className="text-xs">
                              {video.language}
                            </Badge>
                          </div>
                          <div className="col-span-4 truncate text-muted-foreground">{video.description}</div>
                          <div className="col-span-2">
                            <div className="flex items-center gap-2">
                              <span
                                className={`font-medium ${
                                  video.sentimentScore >= 4
                                    ? "text-green-500"
                                    : video.sentimentScore >= 3
                                      ? "text-blue-500"
                                      : "text-red-500"
                                }`}
                              >
                                {video.sentimentScore}
                              </span>
                              <span className="text-xs text-muted-foreground">/5</span>
                            </div>
                          </div>
                          <div className="col-span-1 flex gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => handleVideoSelect(video)}
                            >
                              <Info className="h-4 w-4" />
                              <span className="sr-only">View Details</span>
                            </Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7" asChild>
                              <a href={video.link} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4" />
                                <span className="sr-only">Open Link</span>
                              </a>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* YouTube Shorts Sentiment Table */}
        <Card>
          <CardHeader>
            <CardTitle>YouTube Shorts Sentiment Analysis</CardTitle>
            <CardDescription>Sentiment breakdown for each video</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="grid grid-cols-12 border-b bg-muted/50 p-2 text-sm font-medium">
                <div className="col-span-4">Title</div>
                <div className="col-span-2">Language</div>
                <div className="col-span-2">Score</div>
                <div className="col-span-4">Sentiment Breakdown</div>
              </div>
              <div className="divide-y">
                {videos.map((video, index) => (
                  <div key={index} className="grid grid-cols-12 p-2 text-sm">
                    <div className="col-span-4 font-medium truncate">{video.title}</div>
                    <div className="col-span-2">{video.language}</div>
                    <div className="col-span-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-medium ${
                            video.sentimentScore >= 4
                              ? "text-green-500"
                              : video.sentimentScore >= 3
                                ? "text-blue-500"
                                : "text-red-500"
                          }`}
                        >
                          {video.sentimentScore}
                        </span>
                        <span className="text-xs text-muted-foreground">/5</span>
                      </div>
                    </div>
                    <div className="col-span-4">
                      <div className="flex h-2 overflow-hidden rounded-full bg-muted">
                        <div
                          className="bg-green-500"
                          style={{ width: `${video.percentages.positive + video.percentages.happy}%` }}
                        />
                        <div className="bg-slate-400" style={{ width: `${video.percentages.neutral}%` }} />
                        <div
                          className="bg-red-500"
                          style={{ width: `${video.percentages.negative + video.percentages.sad}%` }}
                        />
                      </div>
                      <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                        <span>👍 {video.percentages.positive + video.percentages.happy}%</span>
                        <span>😐 {video.percentages.neutral}%</span>
                        <span>👎 {video.percentages.negative + video.percentages.sad}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Video Modal */}
      {selectedVideo && (
        <VideoModal video={selectedVideo} isOpen={showVideoModal} onClose={() => setShowVideoModal(false)} />
      )}
    </div>
  )
}
