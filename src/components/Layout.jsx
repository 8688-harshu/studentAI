import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"

export default function Layout() {
    return (
        <div className="flex min-h-screen flex-col font-sans antialiased text-foreground bg-background">
            <Navbar />
            <main className="flex-1">
                <Outlet />
            </main>
            <footer className="border-t py-6">
                <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row mx-auto px-4">
                    <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                        © 2025 Student.ai. Built for academic excellence.
                    </p>
                </div>
            </footer>
        </div>
    )
}
