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
import { register } from "module"
import { registerStudent } from "@/core/student_api"
import { registerBusiness } from "@/core/business_api"

interface Student {
  _id?: string;
  name: string;
  email: string;
  password: string;
  appliedJobs?: string[];
}

interface Business {
  _id?: string;
  name: string;
  email: string;
  password: string
  jobs?: string[];
}

export default function SignupPage() {
  const [isStudentLoading, setIsStudentLoading] = useState(false)
  const [isBusinessLoading, setIsBusinessLoading] = useState(false)
  const router = useRouter()

  const handleStudentSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsStudentLoading(true)
    const formData = new FormData(event.currentTarget)
    const name = formData.get('student-name') as string
    const email = formData.get('student-email') as string
    const password = formData.get('student-password') as string
    const student: Student = {email, password, name} 

    await registerStudent(student);
    setIsStudentLoading(false)
    router.push('/')
  }

  const handleBusinessSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsBusinessLoading(true)
    const formData = new FormData(event.currentTarget)
    const name = formData.get('business-name') as string
    const email = formData.get('business-email') as string
    const password = formData.get('business-password') as string
    const buisness: Business = {email, password, name}
    await registerBusiness(buisness)
    setIsBusinessLoading(false)
    router.push('/')
  }

  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Create an account to get started</CardDescription>
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
                  <Label htmlFor="student-name">Full Name</Label>
                  <Input id="student-name" placeholder="John Doe" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="student-email">Email</Label>
                  <Input id="student-email" type="email" placeholder="student@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="student-password">Password</Label>
                  <Input id="student-password" type="password" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="student-confirm-password">Confirm Password</Label>
                  <Input id="student-confirm-password" type="password" required />
                </div>
                <Button type="submit" className="w-full" disabled={isStudentLoading}>
                  {isStudentLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Sign Up as Student
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="business">
              <form onSubmit={handleBusinessSubmit} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="business-name">Business Name</Label>
                  <Input id="business-name" placeholder="Acme Inc." required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="business-email">Business Email</Label>
                  <Input id="business-email" type="email" placeholder="contact@business.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="business-password">Password</Label>
                  <Input id="business-password" type="password" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="business-confirm-password">Confirm Password</Label>
                  <Input id="business-confirm-password" type="password" required />
                </div>
                <Button type="submit" className="w-full" disabled={isBusinessLoading}>
                  {isBusinessLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Sign Up as Business
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Log in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}