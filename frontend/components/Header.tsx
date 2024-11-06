import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Hammer } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  return (
    <header className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Hammer className="h-6 w-6" />
          <span className="text-2xl font-bold">HandymanHub</span>
        </Link>
        <nav className="hidden md:flex space-x-4">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/dashboard" className="hover:underline">
            Find Jobs
          </Link>
          <Link href="/job-board" className="hover:underline">
            Post a Job
          </Link>
          <Link href="/admin-dashboard" className="hover:underline">
            Admin
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Button variant="outline" asChild>
            <Link href="/login">Log In</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
