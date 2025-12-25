import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Send, User, Bot, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { generateMockResponse } from "@/lib/mockAI"
import { motion, AnimatePresence } from "framer-motion"

export default function Chat() {
    const [query, setQuery] = useState("")
    const [messages, setMessages] = useState([
        { id: 1, role: "ai", content: "Hello! I'm your Exam Prep AI. Select the marks weightage and ask any question from your syllabus.", marks: null }
    ])
    const [marks, setMarks] = useState(5)
    const [isTyping, setIsTyping] = useState(false)
    const scrollRef = useRef(null)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [messages, isTyping])

    const handleSend = async () => {
        if (!query.trim()) return

        const userMsg = { id: Date.now(), role: "user", content: query, marks: null }
        setMessages(prev => [...prev, userMsg])
        setQuery("")
        setIsTyping(true)

        // Simulate AI delay
        setTimeout(() => {
            const response = generateMockResponse(userMsg.content, marks)
            const aiMsg = { id: Date.now() + 1, role: "ai", content: response, marks: marks }
            setMessages(prev => [...prev, aiMsg])
            setIsTyping(false)
        }, 1500)
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    return (
        <div className="flex h-[calc(100vh-3.5rem)] bg-muted/20">
            {/* Sidebar (Hidden on small screens for simplicity or implemented as drawer, simplifying for now) */}

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full bg-background shadow-sm border-x">
                {/* Header */}
                <div className="p-4 border-b flex justify-between items-center bg-background/95 backdrop-blur z-10 sticky top-0">
                    <div>
                        <h2 className="font-semibold text-lg">Exam Mode</h2>
                        <p className="text-xs text-muted-foreground">Strict syllabus adherence</p>
                    </div>
                    <div className="flex gap-2 bg-muted p-1 rounded-lg">
                        {[2, 5, 10].map((val) => (
                            <button
                                key={val}
                                onClick={() => setMarks(val)}
                                className={cn(
                                    "px-3 py-1 text-sm font-medium rounded-md transition-all",
                                    marks === val
                                        ? "bg-white text-primary shadow-sm"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                {val} Marks
                            </button>
                        ))}
                    </div>
                </div>

                {/* Message List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                    <AnimatePresence initial={false}>
                        {messages.map((msg) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={cn(
                                    "flex gap-3",
                                    msg.role === "user" ? "flex-row-reverse" : "flex-row"
                                )}
                            >
                                <div className={cn(
                                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                                    msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-emerald-100 text-emerald-700"
                                )}>
                                    {msg.role === "user" ? <User size={16} /> : <Bot size={16} />}
                                </div>
                                <div className={cn(
                                    "rounded-lg p-4 max-w-[80%] whitespace-pre-wrap leading-relaxed shadow-sm",
                                    msg.role === "user"
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-white border text-foreground"
                                )}>
                                    {msg.role === "ai" && msg.marks && (
                                        <div className="mb-2 inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                                            <Sparkles size={10} /> {msg.marks} Marks Answer
                                        </div>
                                    )}
                                    {msg.content}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {isTyping && (
                        <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                                <Bot size={16} />
                            </div>
                            <div className="bg-white border rounded-lg p-4 flex gap-1 items-center">
                                <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" />
                                <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce delay-75" />
                                <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce delay-150" />
                            </div>
                        </div>
                    )}
                    <div ref={scrollRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 border-t bg-background">
                    <div className="relative">
                        <textarea
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder={`Ask a question for a ${marks}-mark answer...`}
                            className="w-full resize-none rounded-xl border border-input bg-background px-4 py-3 pr-12 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            rows={1}
                        />
                        <Button
                            size="icon"
                            className="absolute right-2 top-1.5 h-8 w-8"
                            onClick={handleSend}
                            disabled={!query.trim() || isTyping}
                        >
                            <Send className="h-4 w-4" />
                        </Button>
                    </div>
                    <p className="text-center text-xs text-muted-foreground mt-2">
                        Student.ai generates answers based on exam formats. Check with your syllabus.
                    </p>
                </div>
            </div>
        </div>
    )
}
