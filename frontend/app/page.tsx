"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CheckCircle, Hammer, Menu, PaintBucket, Wrench } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-primary to-primary/50 text-primary-foreground py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find Skilled Handymen for Your Projects
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
              Connect with local professionals for all your home improvement and
              repair needs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
              {/* <Button size="lg" className="w-full sm:w-auto">
                Post a Job
              </Button> */}
              <Button size="lg" className="w-full sm:w-auto">
                <Link href="/login">Log In</Link>
              </Button>
              {/* <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Find Work
              </Button> */}
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                <Link href="/signup" className="text-black font-semibold">Sign Up</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="features" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Why Choose HandymanHub?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <Wrench className="h-10 w-10 mb-2 text-primary" />
                  <CardTitle>Skilled Professionals</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Access a network of verified and skilled handymen for all
                    your home improvement needs.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <PaintBucket className="h-10 w-10 mb-2 text-primary" />
                  <CardTitle>Diverse Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    From plumbing to painting, find experts for a wide range of
                    home repair and maintenance tasks.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CheckCircle className="h-10 w-10 mb-2 text-primary" />
                  <CardTitle>Secure Payments</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Enjoy peace of mind with our secure payment system and
                    satisfaction guarantee.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="bg-muted py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-2">Post a Job</h3>
                <p>Describe your project and set your budget.</p>
              </div>
              <div className="text-center">
                <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-2">Receive Offers</h3>
                <p>Get proposals from skilled handymen in your area.</p>
              </div>
              <div className="text-center">
                <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-2">Hire & Pay</h3>
                <p>
                  Choose the best fit and pay securely through our platform.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Simple, Transparent Pricing
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Basic</CardTitle>
                  <CardDescription>For occasional projects</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold mb-4">Free</p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2 text-primary" /> Post
                      up to 3 jobs/month
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2 text-primary" />{" "}
                      Basic support
                    </li>
                  </ul>
                  <Button className="w-full mt-6">Get Started</Button>
                </CardContent>
              </Card>
              <Card className="border-primary">
                <CardHeader>
                  <CardTitle>Pro</CardTitle>
                  <CardDescription>For regular home improvers</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold mb-4">$19.99/mo</p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2 text-primary" />{" "}
                      Unlimited job postings
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2 text-primary" />{" "}
                      Priority support
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2 text-primary" />{" "}
                      Featured listings
                    </li>
                  </ul>
                  <Button className="w-full mt-6">Subscribe Now</Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Business</CardTitle>
                  <CardDescription>For property managers</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold mb-4">$49.99/mo</p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2 text-primary" /> All
                      Pro features
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2 text-primary" /> Team
                      accounts
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2 text-primary" /> API
                      access
                    </li>
                  </ul>
                  <Button className="w-full mt-6">Contact Sales</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="bg-muted py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8">
              Join thousands of homeowners and handymen on HandymanHub today!
            </p>
            <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-grow"
              />
              <Button type="submit" size="lg">
                Sign Up Free
              </Button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
