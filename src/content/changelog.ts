/**
 * Release history.
 *
 * This collection is intentionally empty: no release data has been supplied by the
 * project owner, and inventing versions, dates or release notes would be a
 * fabricated maturity claim. Add entries here as real releases are cut — the
 * /changelog page, its structured data and the sitemap read from this array.
 */

export type ChangelogEntry = {
  version: string;
  /** ISO date of the release. Used verbatim; never derive it from build time. */
  date: string;
  layer: "DoneState" | "OpsTruth" | "AgentProof" | "Proof & State";
  title: string;
  notes: string[];
};

export const CHANGELOG: ChangelogEntry[] = [];

export const CHANGELOG_POLICY = [
  "Entries are added when a release is actually cut. Nothing is listed here in advance of a real release.",
  "Each entry names the layer it affects, the version, the release date and what changed.",
  "Until an entry appears here, the repositories are the authoritative record of what exists.",
] as const;
