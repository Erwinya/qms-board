export type InspectionStatus = "PLANNED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
export type InspectionResult = "PASS" | "FAIL" | "CONDITIONAL" | null;
export type NcrStatus = "OPEN" | "UNDER_REVIEW" | "CONTAINED" | "CLOSED" | "CANCELLED";
export type NcrSeverity = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export type Inspection = {
  id: string;
  title: string;
  lotNumber: string;
  partNumber: string;
  inspector: string;
  status: InspectionStatus;
  result: InspectionResult;
  relatedNcrNumber: string | null;
  updatedAt: string;
};

export type Ncr = {
  id: string;
  ncrNumber: string;
  title: string;
  lotNumber: string;
  severity: NcrSeverity;
  status: NcrStatus;
  containmentAction: string | null;
  updatedAt: string;
};
