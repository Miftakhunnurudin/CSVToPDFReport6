import { CandidateEvaluation } from "@shared/schema";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { FileDown } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { ScrollArea } from "./ui/scroll-area";

interface CandidateTableProps {
  candidates: CandidateEvaluation[];
  onGeneratePDF: (candidate: CandidateEvaluation) => void;
}

function calculateOverallScore(candidate: CandidateEvaluation): { score: number; rating: string } {
  const scores = [
    parseFloat(candidate.experienceScore || '0'),
    parseFloat(candidate.compassionScore || '0'),
    parseFloat(candidate.professionalismScore || '0'),
    parseFloat(candidate.safetyScore || '0'),
  ].filter(s => s > 0);
  
  if (scores.length === 0) {
    return { score: 0, rating: 'N/A' };
  }
  
  const average = scores.reduce((a, b) => a + b, 0) / scores.length;
  const roundedScore = Math.round(average * 10) / 10;
  
  let rating = '';
  
  if (roundedScore >= 4.5) {
    rating = 'Exceptional';
  } else if (roundedScore >= 3.5) {
    rating = 'Good';
  } else if (roundedScore >= 2.5) {
    rating = 'Average';
  } else if (roundedScore >= 1.5) {
    rating = 'Below Average';
  } else {
    rating = 'Poor';
  }
  
  return { score: roundedScore, rating };
}

export default function CandidateTable({
  candidates,
  onGeneratePDF,
}: CandidateTableProps) {
  if (candidates.length === 0) {
    return (
      <Card className="p-12">
        <p className="text-center text-muted-foreground">
          No candidate data available. Upload a CSV file to get started.
        </p>
      </Card>
    );
  }

  return (
    <Card data-testid="card-candidate-table">
      <ScrollArea className="w-full">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px] text-left align-middle">Name</TableHead>
                <TableHead className="w-[150px] text-left align-middle">Status</TableHead>
                <TableHead className="min-w-[130px] text-left align-middle">Phone</TableHead>
                <TableHead className="min-w-[180px] text-left align-middle">Email</TableHead>
                <TableHead className="min-w-[160px] text-left align-middle">Interview Date</TableHead>
                <TableHead className="min-w-[180px] text-left align-middle">Overall Performance</TableHead>
                <TableHead className="min-w-[100px] text-right align-middle">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {candidates.map((candidate, index) => (
                <TableRow key={index} data-testid={`row-candidate-${index}`}>
                  <TableCell className="w-[150px] font-medium text-left align-middle" data-testid="text-name">
                    {candidate.contactName}
                  </TableCell>
                  <TableCell className="w-[150px] text-left align-middle">
                    <Badge
                      variant={candidate.result === "PASS" ? "default" : "destructive"}
                      className="font-medium"
                      data-testid="badge-status"
                    >
                      {candidate.result}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-left align-middle" data-testid="text-phone">
                    {candidate.phoneNumber}
                  </TableCell>
                  <TableCell className="text-sm text-left align-middle" data-testid="text-email">
                    {candidate.emailAddress || "N/A"}
                  </TableCell>
                  <TableCell className="text-sm text-left align-middle">
                    {candidate.dateTime}
                  </TableCell>
                  <TableCell className="text-sm text-left align-middle" data-testid="text-overall-performance">
                    {(() => {
                      const overall = calculateOverallScore(candidate);
                      return overall.score > 0 
                        ? `${overall.score.toFixed(1)} / 5.0 - ${overall.rating}`
                        : 'N/A';
                    })()}
                  </TableCell>
                  <TableCell className="text-right align-middle">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onGeneratePDF(candidate)}
                      data-testid={`button-generate-pdf-${index}`}
                    >
                      <FileDown className="w-4 h-4 mr-2" />
                      PDF
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </ScrollArea>
    </Card>
  );
}
