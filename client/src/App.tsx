import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CandidateProvider } from "@/context/CandidateContext";
import { CustomerProvider } from "@/context/CustomerContext";
import Home from "@/pages/Home";
import InboundCustomers from "@/pages/InboundCustomers";
import OutboundCustomers from "@/pages/OutboundCustomers";
import OutboundStaffs from "@/pages/OutboundStaffs";
import AnalyticsPage from "@/pages/AnalyticsPage";
import CustomerAnalyticsPage from "@/pages/CustomerAnalyticsPage";
import Login from "@/pages/Login";
import NotFound from "@/pages/not-found";

interface SessionResponse {
  authenticated: boolean;
  user?: {
    id: string;
    username: string;
  };
}

function AuthenticatedRouter() {
  const { data: session, isLoading } = useQuery<SessionResponse>({
    queryKey: ["/api/auth/session"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!session?.authenticated) {
    return <Login />;
  }

  return (
    <Switch>
      <Route path="/">
        {() => <Redirect to="/inbound/staffs" />}
      </Route>
      <Route path="/inbound/staffs" component={Home} />
      <Route path="/inbound/customers" component={InboundCustomers} />
      <Route path="/outbound/customers" component={OutboundCustomers} />
      <Route path="/outbound/staffs" component={OutboundStaffs} />
      <Route path="/analytics" component={AnalyticsPage} />
      <Route path="/customer-analytics" component={CustomerAnalyticsPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CandidateProvider>
          <CustomerProvider>
            <Toaster />
            <AuthenticatedRouter />
          </CustomerProvider>
        </CandidateProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
