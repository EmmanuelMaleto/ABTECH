import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

// This will be shared in-memory for demo purposes only
const demoUsers: { username: string; password: string }[] = (window as any).demoUsers || [
  { username: "demo1", password: "password1" },
  { username: "demo2", password: "password2" },
  { username: "admin", password: "admin123" },
];
(window as any).demoUsers = demoUsers;

const Signup: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (demoUsers.find((u) => u.username === username)) {
      toast({
        title: "Signup Failed",
        description: "Username already exists.",
        variant: "destructive",
      });
      return;
    }
    demoUsers.push({ username, password });
    toast({
      title: "Signup Successful",
      description: `Account created for ${username}. You can now log in!`,
    });
    setUsername("");
    setPassword("");
    // Optionally, redirect to login page here
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block mb-1 font-medium">Username</label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                autoFocus
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-1 font-medium">Password</label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">Sign Up</Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account? <a href="/login" className="text-primary underline">Log in</a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
