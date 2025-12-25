import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle2 } from "lucide-react"

export default function Home() {
    return (
        <div className="flex flex-col min-h-[calc(100vh-3.5rem)]">
            {/* Hero Section */}
            <section className="flex-1 flex flex-col justify-center items-center py-20 md:py-32 px-4 bg-gradient-to-b from-background to-secondary/20">
                <div className="container mx-auto text-center space-y-8 max-w-4xl">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-5xl md:text-7xl font-extrabold tracking-tight text-primary"
                    >
                        Ace Your Exams with
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600"> AI Precision</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-xl text-muted-foreground max-w-2xl mx-auto"
                    >
                        Stop guessing length and format. Get answers perfectly structured for
                        <span className="font-semibold text-foreground"> 2, 5, or 10 marks </span>
                        instantly. Strictly from your syllabus.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
                    >
                        <Button size="lg" className="text-lg px-8" asChild>
                            <Link to="/chat">
                                Start Learning Now <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" className="text-lg px-8">
                            View Features
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard
                            title="2 Marks - Concise"
                            desc="Perfect definitions and short layouts. No fluff, just facts."
                            delay={0.1}
                        />
                        <FeatureCard
                            title="5 Marks - Structured"
                            desc="Definition, key bullet points, and examples formatted for quick scanning."
                            delay={0.2}
                        />
                        <FeatureCard
                            title="10 Marks - Detailed"
                            desc="Comprehensive explanations, multiple sections, and deep dives for full credit."
                            delay={0.3}
                        />
                    </div>
                </div>
            </section>
        </div>
    )
}

function FeatureCard({ title, desc, delay }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow"
        >
            <CheckCircle2 className="h-10 w-10 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-muted-foreground">{desc}</p>
        </motion.div>
    )
}
