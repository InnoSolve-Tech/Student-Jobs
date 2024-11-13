"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { Loader2 } from 'lucide-react'
import { loginStudent } from "@/core/student_api"
import { loginBusiness } from "@/core/business_api"

interface Student {
  _id: string;
  name: string;
  email: string;
  appliedJobs: string[];
}

interface Business {
  _id: string;
  name: string;
  email: string;
  jobs: string[];
}

export default function LoginPage() {
  const [isStudentLoading, setIsStudentLoading] = useState(false)
  const [isBusinessLoading, setIsBusinessLoading] = useState(false)
  const router = useRouter()

  const handleStudentSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsStudentLoading(true)
    const formData = new FormData(event.currentTarget)
    const email = formData.get('student-email') as string
    const password = formData.get('student-password') as string
    await loginStudent(email, password)
    setIsStudentLoading(false)
    // Handle student login logic here
    // For demonstration, we'll just redirect to home
    router.push('/')
  }

  const handleBusinessSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsBusinessLoading(true)
    const formData = new FormData(event.currentTarget)
    const email = formData.get('business-email') as string
    const password = formData.get('business-password') as string
    await loginBusiness(email, password)
    setIsBusinessLoading(false)
    // Handle business login logic here
    // For demonstration, we'll just redirect to home
    router.push('/')
  }

  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Log In</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="student" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="student">Student</TabsTrigger>
              <TabsTrigger value="business">Business</TabsTrigger>
            </TabsList>
            <TabsContent value="student">
              <form onSubmit={handleStudentSubmit} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="student-email">Email</Label>
                  <Input id="student-email" type="email" placeholder="student@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="student-password">Password</Label>
                  <Input id="student-password" type="password" required />
                </div>
                <Button type="submit" className="w-full" disabled={isStudentLoading}>
                  {isStudentLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Log In as Student
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="business">
              <form onSubmit={handleBusinessSubmit} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="business-email">Business Email</Label>
                  <Input id="business-email" type="email" placeholder="business@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="business-password">Password</Label>
                  <Input id="business-password" type="password" required />
                </div>
                <Button type="submit" className="w-full" disabled={isBusinessLoading}>
                  {isBusinessLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Log In as Business
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}