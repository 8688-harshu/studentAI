import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { GraduationCap } from "lucide-react"

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-14 items-center justify-between px-4">
                <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary">
                    <GraduationCap className="h-6 w-6" />
                    <span>Student.ai</span>
                </Link>
                <nav className="flex items-center gap-4">
                    <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
                        Home
                    </Link>
                    <Link to="/chat" className="text-sm font-medium transition-colors hover:text-primary">
                        Chat
                    </Link>
                    <Button size="sm" asChild>
                        <Link to="/chat">Get Started</Link>
                    </Button>
                </nav>
            </div>
        </header>
    )
}
