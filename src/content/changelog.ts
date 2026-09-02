export type ChangelogEntry = {
  version: string;
  date: string;
  layer: "DoneState" | "OpsTruth" | "AgentProof" | "Proof & State";
  title: string;
  notes: string[];
};

export const CHANGELOG: ChangelogEntry[] = [
  {
    version: "v1.0.0",
    date: "2026-08-30",
    layer: "OpsTruth",
    title: "Public GitHub Marketplace Action",
    notes: [
      "Published the opstruth-evidence GitHub Action.",
      "Published a stable v1 reference for compatible v1 updates.",
      "The Action inspects and reports on repository evidence without mutating the target repository.",
    ],
  },
];

export const CHANGELOG_POLICY = [
  "Entries are added only after a release can be verified against a public release record.",
  "This page highlights verified releases relevant to the current Proof & State product story; it is not a complete history of every package version.",
  "Current product maturity and external review state live on the status page, not in future-dated release notes.",
] as const;
