"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  Users,
  Clock,
  MapPin,
  DollarSign,
  Calendar,
} from "lucide-react";

type Applicant = {
  id: number;
  name: string;
  email: string;
  experience: string;
  appliedDate: string;
};

type Job = {
  id: number;
  title: string;
  description: string;
  location: string;
  budget: string;
  status: "open" | "in-progress" | "completed";
  postedDate: string;
  applicants: Applicant[];
};

const initialJobs: Job[] = [
  {
    id: 1,
    title: "Fix Leaky Faucet",
    description: "Need a plumber to fix a leaky faucet in the kitchen.",
    location: "New York, NY",
    budget: "$100-$150",
    status: "open",
    postedDate: "2024-03-15",
    applicants: [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        experience: "5 years",
        appliedDate: "2024-03-16",
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        experience: "3 years",
        appliedDate: "2024-03-17",
      },
    ],
  },
  {
    id: 2,
    title: "Paint Living Room",
    description: "Looking for a painter to paint my living room (400 sq ft).",
    location: "Los Angeles, CA",
    budget: "$300-$500",
    status: "in-progress",
    postedDate: "2024-03-14",
    applicants: [
      {
        id: 3,
        name: "Bob Johnson",
        email: "bob@example.com",
        experience: "7 years",
        appliedDate: "2024-03-15",
      },
    ],
  },
  {
    id: 3,
    title: "Install Ceiling Fan",
    description:
      "Need an electrician to install a new ceiling fan in the bedroom.",
    location: "Chicago, IL",
    budget: "$150-$200",
    status: "completed",
    postedDate: "2024-03-13",
    applicants: [],
  },
];

export default function JobPosterDashboard() {
  const [activeTab, setActiveTab] = useState("my-jobs");
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [newJob, setNewJob] = useState({
    title: "",
    description: "",
    location: "",
    budget: "",
  });
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setNewJob((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const job: Job = {
      id: jobs.length + 1,
      ...newJob,
      status: "open",
      postedDate: new Date().toISOString().split("T")[0],
      applicants: [],
    };
    setJobs([...jobs, job]);
    setNewJob({ title: "", description: "", location: "", budget: "" });
    setActiveTab("my-jobs");
  };

  const handleStatusChange = (jobId: number, newStatus: Job["status"]) => {
    setJobs(
      jobs.map((job) =>
        job.id === jobId ? { ...job, status: newStatus } : job,
      ),
    );
  };

  const handleViewDetails = (job: Job) => {
    setSelectedJob(job);
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="my-jobs">My Jobs</TabsTrigger>
            <TabsTrigger value="post-job">Post a New Job</TabsTrigger>
          </TabsList>
          <TabsContent value="my-jobs">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {jobs.map((job) => (
                <Card key={job.id}>
                  <CardHeader>
                    <CardTitle>{job.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {job.description}
                    </p>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{job.location}</span>
                      <span>{job.budget}</span>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        <span className="text-sm">
                          {job.applicants.length} applicants
                        </span>
                      </div>
                      <Badge
                        variant={
                          job.status === "open"
                            ? "default"
                            : job.status === "in-progress"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {job.status}
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          className="w-full"
                          onClick={() => handleViewDetails(job)}
                        >
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>{selectedJob?.title}</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="job-status" className="text-right">
                              Status
                            </Label>
                            <Select
                              value={selectedJob?.status}
                              onValueChange={(value: Job["status"]) =>
                                handleStatusChange(selectedJob?.id!, value)
                              }
                            >
                              <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="open">Open</SelectItem>
                                <SelectItem value="in-progress">
                                  In Progress
                                </SelectItem>
                                <SelectItem value="completed">
                                  Completed
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">Description</Label>
                            <p className="col-span-3 text-sm">
                              {selectedJob?.description}
                            </p>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">Location</Label>
                            <p className="col-span-3 text-sm">
                              {selectedJob?.location}
                            </p>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">Budget</Label>
                            <p className="col-span-3 text-sm">
                              {selectedJob?.budget}
                            </p>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">Posted Date</Label>
                            <p className="col-span-3 text-sm">
                              {selectedJob?.postedDate}
                            </p>
                          </div>
                        </div>
                        <div>
                          <h3 className="mb-4 font-semibold">Applicants</h3>
                          {selectedJob?.applicants.length === 0 ? (
                            <p className="text-sm text-muted-foreground">
                              No applicants yet.
                            </p>
                          ) : (
                            <div className="space-y-4">
                              {selectedJob?.applicants.map((applicant) => (
                                <Card key={applicant.id}>
                                  <CardHeader>
                                    <CardTitle className="text-sm">
                                      {applicant.name}
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <p className="text-sm">{applicant.email}</p>
                                    <p className="text-sm">
                                      Experience: {applicant.experience}
                                    </p>
                                    <p className="text-sm">
                                      Applied: {applicant.appliedDate}
                                    </p>
                                  </CardContent>
                                  <CardFooter>
                                    <Button size="sm">Contact</Button>
                                  </CardFooter>
                                </Card>
                              ))}
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="post-job">
            <Card>
              <CardHeader>
                <CardTitle>Post a New Job</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Job Title</Label>
                      <Input
                        id="title"
                        name="title"
                        value={newJob.title}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Job Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={newJob.description}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        name="location"
                        value={newJob.location}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="budget">Budget</Label>
                      <Input
                        id="budget"
                        name="budget"
                        value={newJob.budget}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Post Job
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
