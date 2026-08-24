export const EXPERIENCE_LEVELS = [
  { value: "fresher", label: "Fresher / Student" },
  { value: "0-1", label: "0-1 years" },
  { value: "1-3", label: "1-3 years" },
  { value: "3-5", label: "3-5 years" },
  { value: "5+", label: "5+ years" },
] as const;

export const OPEN_POSITIONS = [
  { value: "web-developer", label: "Web Developer" },
  { value: "mobile-developer", label: "Mobile App Developer" },
  { value: "ai-engineer", label: "AI Engineer" },
  { value: "ui-ux-designer", label: "UI/UX Designer" },
  { value: "digital-marketer", label: "Digital Marketer" },
  { value: "content-writer", label: "Content Writer" },
  { value: "intern", label: "Intern" },
  { value: "other", label: "Other" },
] as const;

export const AVAILABILITY_OPTIONS = [
  { value: "immediately", label: "Immediately" },
  { value: "15-days", label: "15 days" },
  { value: "30-days", label: "30 days" },
  { value: "60-days", label: "60 days" },
  { value: "negotiable", label: "Negotiable" },
] as const;
