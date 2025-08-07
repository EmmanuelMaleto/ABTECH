import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

const demoUsers = [
  { username: "demo1", password: "password1" },
  { username: "demo2", password: "password2" },
  { username: "admin", password: "admin123" },
];

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = demoUsers.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      toast({
        title: "Login Successful",
        description: `Welcome, ${username}!`,
      });
      // Optionally, redirect or set auth state here
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid username or password.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="font-semibold mb-1">Demo Accounts:</div>
            <ul className="text-sm text-muted-foreground mb-2">
              {demoUsers.map((user) => (
                <li key={user.username}>
                  <span className="font-mono">{user.username}</span> / <span className="font-mono">{user.password}</span>
                  <Button
                    size="sm"
                    variant="outline"
                    className="ml-2 px-2 py-0 text-xs"
                    onClick={() => {
                      setUsername(user.username);
                      setPassword(user.password);
                    }}
                  >
                    Autofill
                  </Button>
                </li>
              ))}
            </ul>
          </div>
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
            <Button type="submit" className="w-full">Log In</Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Don't have an account? <a href="/signup" className="text-primary underline">Sign up</a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login; 