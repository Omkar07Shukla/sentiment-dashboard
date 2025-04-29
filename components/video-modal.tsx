"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"

interface VideoModalProps {
  video: any
  isOpen: boolean
  onClose: () => void
}

export function VideoModal({ video, isOpen, onClose }: VideoModalProps) {
  // Extract YouTube video ID from URL
  const getYouTubeVideoId = (url: string) => {
    const regex = /(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    const match = url.match(regex)
    return match ? match[1] : null
  }

  const videoId = getYouTubeVideoId(video.link)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{video.title}</span>
            <Badge variant="outline">{video.language}</Badge>
          </DialogTitle>
          <DialogDescription>{video.description}</DialogDescription>
        </DialogHeader>

        <div className="aspect-video w-full bg-muted rounded-md overflow-hidden">
          {videoId && (
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoId}`}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
        </div>

        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-1">Sentiment Score</h4>
                <div className="flex items-center">
                  <span
                    className={`text-xl font-bold ${
                      video.sentimentScore >= 4
                        ? "text-green-500"
                        : video.sentimentScore >= 3
                          ? "text-blue-500"
                          : "text-red-500"
                    }`}
                  >
                    {video.sentimentScore}
                  </span>
                  <span className="text-sm text-muted-foreground ml-1">/5</span>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1">Sentiment Breakdown</h4>
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
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button asChild>
            <a href={video.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4" />
              Open on YouTube
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
