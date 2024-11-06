"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart,
  Briefcase,
  DollarSign,
  Users,
} from "lucide-react";
import { useState } from "react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    {
      title: "Total Users",
      value: "5,231",
      icon: Users,
      change: 12,
      increase: true,
    },
    {
      title: "Active Jobs",
      value: "1,423",
      icon: Briefcase,
      change: 8,
      increase: true,
    },
    {
      title: "Total Revenue",
      value: "$42,500",
      icon: DollarSign,
      change: 5,
      increase: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="jobs">Jobs</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {stats.map((stat) => (
                <Card key={stat.title}>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      {stat.title}
                    </CardTitle>
                    <stat.icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">
                      {stat.increase ? (
                        <ArrowUpRight className="h-4 w-4 text-green-500 inline mr-1" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-red-500 inline mr-1" />
                      )}
                      {stat.change}% from last month
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                  <BarChart className="h-16 w-16" />
                  <span className="ml-4">Chart placeholder</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="users">
            <h2 className="text-2xl font-bold mb-4">User Management</h2>
            <p>User management interface would go here.</p>
          </TabsContent>
          <TabsContent value="jobs">
            <h2 className="text-2xl font-bold mb-4">Job Management</h2>
            <p>Job management interface would go here.</p>
          </TabsContent>
          <TabsContent value="reports">
            <h2 className="text-2xl font-bold mb-4">Reports</h2>
            <p>Reporting interface would go here.</p>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
