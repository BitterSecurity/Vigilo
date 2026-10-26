# Vigilo

Web3 Smart Contract Security Auditing Orchestrator - OpenCode Plugin

An autonomous security legion for smart contract auditing, built as an OpenCode plugin. From Latin *vigilo* — "I watch, I guard." Inspired by the command structure of the Roman army, Vigilo deploys specialized agents to find vulnerabilities before attackers do.

## Features

- **Automated Audit Workflow**: Scope resolution → Recon → Deep Analysis → PoC → Report
- **Specialized Auditors**: Protocol-specific vulnerability detection
- **Multi-Language Support**: Solidity, Vyper, Cairo, Rust, Go
- **LSP Integration**: Language server support for smart contract languages
- **Foundry Integration**: Built-in tools for forge build/test/coverage
- **Parallel Analysis**: Spawn multiple auditors (max 3) for comprehensive coverage
- **PoC Validation**: Generate and validate Foundry tests

## Supported Languages

| Language | Extensions | LSP Server | Use Case |
|----------|------------|------------|----------|
| Solidity | `.sol` | `@nomicfoundation/solidity-language-server` | EVM chains |
| Vyper | `.vy` | `vyper-lsp` | Python-like EVM contracts |
| Cairo | `.cairo` | `cairo-language-server` (Scarb) | Starknet/StarkEx |
| Rust | `.rs` | `rust-analyzer` | Solana, NEAR, Substrate |
| Go | `.go` | `gopls` | Cosmos SDK |

## Installation

### Prerequisites

- [OpenCode](https://github.com/anomalyco/opencode) installed
- [Foundry](https://book.getfoundry.sh/getting-started/installation) installed
- Node.js 18+ or Bun

### Install Plugin

```bash
bunx vigilo install
```

Or manually:

```bash
git clone https://github.com/BitterSecurity/Vigilo.git vigilo
cd vigilo
bun install
bun run build
```

### Install LSP Servers (Optional)

```bash
# Solidity (recommended)
npm install -g @nomicfoundation/solidity-language-server

# Vyper
pipx install vyper-lsp

# Cairo (via Scarb)
curl https://get.swmansion.com | bash && starkup

# Rust (already included in rustup)
rustup component add rust-analyzer

# Go
go install golang.org/x/tools/gopls@latest
```

## Usage

### Commands

| Command | Description |
|---------|-------------|
| `/audit` | Start full security audit workflow |
| `/poc <finding.md>` | Generate and validate PoC for a finding |

### Example

```bash
# Start OpenCode in your project
cd my-solidity-project
opencode

# Run full audit
/audit

# Generate PoC for a finding
/poc .vigilo/findings/high/H-01-reentrancy.md
```

## Audit Workflow

```
Phase 0        Phase 1           Phase 2          Phase 3    Phase 4
(scope)        (recon)           (audit)          (PoC)      (report)
   │              │                  │               │           │
   ▼              ▼                  ▼               ▼           ▼
 scope.txt ─→ explorator ─────┐
              speculator ─────┼─→ recon/*.md ─→ centuriones ──→ findings/ ─→ PoC ─→ report
                              │                (max 3 parallel)
                              └─ protocol type detected
```

## Available Tools

### Foundry Tools

| Tool | Description |
|------|-------------|
| `forge_build` | Compile Solidity contracts |
| `forge_test` | Run tests with configurable verbosity |
| `forge_coverage` | Generate code coverage |
| `cast_call` | Query contract state |

### Agent Tools

| Tool | Description |
|------|-------------|
| `delegate_task` | Spawn specialized auditors |
| `background_output` | Get background audit results |
| `background_cancel` | Cancel running audits |
| `background_list` | List all audit tasks |
| `skill` | Load specialized audit skills |

## Reconnaissance Agents (Exploratores & Speculatores)

| Agent | Latin Role | Focus |
|-------|-----------|-------|
| `explorator` | Scout (*Exploratores*) | Code structure, execution flows, asset locations, protocol type |
| `speculator` | Intelligence (*Speculatores*) | Protocol design, invariants, trust assumptions from documentation |

## Specialized Auditors (Centuriones)

| Auditor | Focus |
|---------|-------|
| `reentrancy-auditor` | CEI violations, cross-function/contract reentrancy |
| `oracle-auditor` | Oracle manipulation, price feed attacks |
| `access-control-auditor` | Permission vulnerabilities |
| `logic-auditor` | Business logic errors |
| `flashloan-auditor` | Flash loan attack vectors |
| `defi-auditor` | DeFi-specific vulnerabilities |
| `cross-chain-auditor` | Bridge and cross-chain vulnerabilities |
| `token-auditor` | ERC20/721/1155 implementation issues |

## Directory Structure

```
.vigilo/
├── recon/           # Explorator & Speculator outputs
├── findings/        # Vulnerability findings
│   ├── high/
│   └── medium/
├── poc/             # PoC validation logs
└── reports/         # Final reports
```

## Configuration

Create `.vigilo/config.json` in your project:

```json
{
  "disabled_skills": [],
  "disabled_agents": []
}
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `VIGILO_DEBUG` | Enable debug logging |
| `DEBUG` | General debug mode |

## License

[Business Source License 1.1](../../LICENSE)

- **Non-production use**: Free
- **Production use**: Requires commercial license
- **Change Date**: 2029-01-21 (converts to Apache-2.0)
