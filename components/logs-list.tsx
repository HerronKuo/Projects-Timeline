"use client";

import { useState, useRef, useEffect } from "react";
import type { Log } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, FileTextIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";

export function LogsList({ logs }: { logs: Log[] }) {
    const [expandedLog, setExpandedLog] = useState<string | null>(null);
    const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    // Sort logs by date (newest first)
    const sortedLogs = [...logs].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (expandedLog) {
                const expandedCard = cardRefs.current[expandedLog];
                if (expandedCard && !expandedCard.contains(event.target as Node)) {
                    setExpandedLog(null);
                }
            }
        };

        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && expandedLog) {
                setExpandedLog(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscapeKey);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, [expandedLog]);

    const toggleLog = (logSlug: string) => {
        setExpandedLog(expandedLog === logSlug ? null : logSlug);
    };

    if (sortedLogs.length === 0) {
        return (
            <div className="text-center py-16">
                <div className="glass-effect rounded-2xl p-12 max-w-md mx-auto">
                    <FileTextIcon className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
                    <p className="text-muted-foreground text-lg">No development logs found for this project yet.</p>
                    <p className="text-sm text-muted-foreground/70 mt-2">Check back later for updates!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {sortedLogs.map((log) => {
                const isExpanded = expandedLog === log.slug;
                return (
                    <Card
                        key={log.slug}
                        ref={(el) => (cardRefs.current[log.slug] = el)}
                        className="log-card hover:shadow-xl transition-all duration-300 cursor-pointer"
                        onClick={() => toggleLog(log.slug)}
                    >
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {new Date(log.date).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </div>
                                    <CardTitle className="text-xl">{log.title}</CardTitle>
                                </div>
                                <div className="flex-shrink-0 ml-4">
                                    {isExpanded ? (
                                        <ChevronUpIcon className="h-5 w-5 text-muted-foreground" />
                                    ) : (
                                        <ChevronDownIcon className="h-5 w-5 text-muted-foreground" />
                                    )}
                                </div>
                            </div>
                        </CardHeader>
                        {isExpanded && (
                            <CardContent>
                                <div
                                    className="prose dark:prose-invert max-w-none animate-in slide-in-from-top-2 duration-300"
                                    dangerouslySetInnerHTML={{ __html: log.content }}
                                />
                            </CardContent>
                        )}
                    </Card>
                );
            })}
        </div>
    );
}