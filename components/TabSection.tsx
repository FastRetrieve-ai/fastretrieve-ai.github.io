"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const tabData = [
  {
    title: "For all needs",
    items: ["Build, Assembly, and Test", "Intake-to-Pay", "Business process orchestration"],
  },
  {
    title: "For all teams",
    items: ["Finance", "IT and Security", "Legal", "HR", "Audit"],
  },
  {
    title: "For all sizes",
    items: ["Startups", "Mid-market", "Enterprise"],
  },
  {
    title: "For all industries",
    items: ["Multimedia", "Financial services", "Technology"],
  },
]

export function TabSection() {
  const [activeTab, setActiveTab] = useState<string | null>(null)

  return (
    <TooltipProvider>
      <div className="w-full">
        <div className="flex justify-center space-x-4">
          {tabData.map((tab) => (
            <div key={tab.title} className="relative">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    onClick={() => setActiveTab(activeTab === tab.title ? null : tab.title)}
                    className={`px-3 h-9 relative ${
                      activeTab === tab.title
                        ? "text-primary font-medium after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:rounded-full"
                        : "text-muted-foreground"
                    }`}
                  >
                    {tab.title}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" align="start" className="w-[300px]">
                  <Card>
                    <CardHeader>
                      <CardTitle>{tab.title}</CardTitle>
                      <CardDescription>
                        Explore how FastRetrieve.AI caters to various aspects of your business.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-5 space-y-1">
                        {tab.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TooltipContent>
              </Tooltip>
              {activeTab === tab.title && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[300px] z-10">
                  <Card>
                    <CardHeader>
                      <CardTitle>{tab.title}</CardTitle>
                      <CardDescription>
                        Explore how FastRetrieve.AI caters to various aspects of your business.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-5 space-y-1">
                        {tab.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </TooltipProvider>
  )
}

