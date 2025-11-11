import { useCandidates } from "@/context/CandidateContext";
import Analytics from "./Analytics";

export default function AnalyticsPage() {
  const { candidates } = useCandidates();
  return <Analytics candidates={candidates} />;
}
