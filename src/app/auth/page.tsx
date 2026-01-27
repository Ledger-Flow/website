import Link from "next/link";
import { Card, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Login from "./components/Login";
import Signup from "./components/Signup";

export default function AuthPage() {
  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-center px-4 py-8">
      {/* Main Content */}
      <Card className="w-full max-w-lg">
        <header className="flex items-center justify-center">
          <Link href="/" className="text-primary text-2xl font-bold">
            LedgerFlow
          </Link>
        </header>

        <CardHeader className="space-y-2">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Log In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            {/* Login Tab */}
            <TabsContent value="login" className="mt-2 space-y-4">
              <Login />
            </TabsContent>

            {/* Sign Up Tab */}
            <TabsContent value="signup" className="mt-2 space-y-4">
              <Signup />
            </TabsContent>
          </Tabs>
        </CardHeader>
      </Card>
    </div>
  );
}
