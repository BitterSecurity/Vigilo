// Offline, deterministic sanity check for packages/bench/data (no LLM, no network).
// Verifies every stored baseline parses, has findings, and maps to a dataset entry with ground truth.
import { readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"

const dataDir = join(import.meta.dir, "../../packages/bench/data")
const dataset = JSON.parse(readFileSync(join(dataDir, "dataset.json"), "utf-8")) as Array<{
  project_id: string
  codebases: Array<{ repo_url: string; commit: string }>
  vulnerabilities: Array<{ finding_id: string; title: string; severity: string }>
}>
const ids = new Set(dataset.map((p) => p.project_id))
const errors: string[] = []
const warnings: string[] = []

for (const p of dataset) {
  if (!p.codebases?.[0]?.repo_url) errors.push(`${p.project_id}: missing codebase repo_url`)
  // checkout.ts uses codebases[0].commit; an empty commit means the clone is not pinned (warn only).
  else if (!p.codebases[0].commit) warnings.push(`${p.project_id}: codebases[0].commit is empty (checkout not pinned)`)
  if (!p.vulnerabilities?.length) errors.push(`${p.project_id}: no ground-truth vulnerabilities`)
}

const baselines = readdirSync(join(dataDir, "baselines")).filter((f) => f.endsWith(".json"))
for (const f of baselines) {
  const id = f.replace(/^baseline_/, "").replace(/\.json$/, "")
  const b = JSON.parse(readFileSync(join(dataDir, "baselines", f), "utf-8"))
  if (!ids.has(id)) errors.push(`${f}: no matching dataset entry "${id}"`)
  if (!Array.isArray(b.findings) || b.findings.length === 0) errors.push(`${f}: no findings`)
  for (const [i, x] of (b.findings ?? []).entries()) {
    if (!x.title || !x.severity) errors.push(`${f}: finding[${i}] missing title/severity`)
  }
}

for (const w of warnings) console.warn(`warning: ${w}`)
console.log(`dataset entries: ${dataset.length}, baselines: ${baselines.length}`)
if (errors.length) {
  console.error(errors.join("\n"))
  process.exit(1)
}
console.log("bench data OK")
