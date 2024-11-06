"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Briefcase,
  DollarSign,
  Star,
  Clock,
  MapPin,
  Calendar,
} from "lucide-react";

type Job = {
  id: number;
  title: string;
  description: string;
  location: string;
  budget: string;
  status: "applied" | "in-progress" | "completed";
  postedDate: string;
};

const jobs: Job[] = [
  {
    id: 1,
    title: "Fix Leaky Faucet",
    description:
      "Need a plumber to fix a leaky faucet in the kitchen. The faucet has been dripping constantly for the past week, wasting water and causing an annoying sound. Please bring necessary tools and replacement parts if needed.",
    location: "New York, NY",
    budget: "$100-$150",
    status: "applied",
    postedDate: "2024-03-15",
  },
  {
    id: 2,
    title: "Paint Living Room",
    description:
      "Looking for a painter to paint my living room (400 sq ft). The walls are currently beige, and I'd like them painted a light gray color. Please provide all necessary materials including paint, brushes, and drop cloths.",
    location: "Los Angeles, CA",
    budget: "$300-$500",
    status: "in-progress",
    postedDate: "2024-03-14",
  },
  {
    id: 3,
    title: "Install Ceiling Fan",
    description:
      "Need an electrician to install a new ceiling fan in the bedroom. The room currently has a light fixture that needs to be replaced with the fan. The ceiling height is standard, and the fan will be provided.",
    location: "Chicago, IL",
    budget: "$150-$200",
    status: "completed",
    postedDate: "2024-03-13",
  },
];

export default function HandymanDashboard() {
  const [activeTab, setActiveTab] = useState("available-jobs");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const handleViewDetails = (job: Job) => {
    setSelectedJob(job);
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Earnings
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$1,234</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Jobs Completed
              </CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Average Rating
              </CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.8</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="available-jobs">Available Jobs</TabsTrigger>
            <TabsTrigger value="my-jobs">My Jobs</TabsTrigger>
          </TabsList>
          <TabsContent value="available-jobs">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {jobs
                .filter((job) => job.status === "applied")
                .map((job) => (
                  <Card key={job.id}>
                    <CardHeader>
                      <CardTitle>{job.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        {job.description.substring(0, 100)}...
                      </p>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{job.location}</span>
                        <span>{job.budget}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Posted on {job.postedDate}
                      </span>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button onClick={() => handleViewDetails(job)}>
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{selectedJob?.title}</DialogTitle>
                            <DialogDescription>Job Details</DialogDescription>
                          </DialogHeader>
                          <div className="mt-4">
                            <p className="text-sm text-muted-foreground mb-4">
                              {selectedJob?.description}
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span>{selectedJob?.location}</span>
                              </div>
                              <div className="flex items-center">
                                <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span>{selectedJob?.budget}</span>
                              </div>
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span>Posted on {selectedJob?.postedDate}</span>
                              </div>
                            </div>
                          </div>
                          <Button className="mt-4 w-full">Apply for Job</Button>
                        </DialogContent>
                      </Dialog>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
          <TabsContent value="my-jobs">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {jobs
                .filter((job) => job.status !== "applied")
                .map((job) => (
                  <Card key={job.id}>
                    <CardHeader>
                      <CardTitle>{job.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        {job.description.substring(0, 100)}...
                      </p>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{job.location}</span>
                        <span>{job.budget}</span>
                      </div>
                      <Badge
                        className="mt-4"
                        variant={
                          job.status === "in-progress" ? "secondary" : "default"
                        }
                      >
                        {job.status}
                      </Badge>
                    </CardContent>
                    <CardFooter>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            className="w-full"
                            onClick={() => handleViewDetails(job)}
                          >
                            {job.status === "in-progress"
                              ? "Update Progress"
                              : "View Details"}
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{selectedJob?.title}</DialogTitle>
                            <DialogDescription>Job Details</DialogDescription>
                          </DialogHeader>
                          <div className="mt-4">
                            <p className="text-sm text-muted-foreground mb-4">
                              {selectedJob?.description}
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span>{selectedJob?.location}</span>
                              </div>
                              <div className="flex items-center">
                                <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span>{selectedJob?.budget}</span>
                              </div>
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span>Posted on {selectedJob?.postedDate}</span>
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span>Status: {selectedJob?.status}</span>
                              </div>
                            </div>
                          </div>
                          {selectedJob?.status === "in-progress" && (
                            <Button className="mt-4 w-full">
                              Update Job Progress
                            </Button>
                          )}
                        </DialogContent>
                      </Dialog>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
