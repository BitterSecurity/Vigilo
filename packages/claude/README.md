<p align="center">
  <img src="../../.github/assets/logo.png" alt="Vigilo">
</p>

# Vigilo

Web3 Smart Contract Security Auditing Agent — Claude Code Plugin

From Latin *vigilo* — "I watch, I guard." An autonomous security legion inspired by the command structure of the Roman army, deploying specialized agents to find vulnerabilities before attackers do.

## Installation

### Prerequisites

- **Node.js** (v18+)
- **LSP Binaries** (Solidity, Rust - see LSP Support section below)
- **Foundry** (for PoC testing, optional)

### Claude Code (via Plugin Marketplace)

Register the marketplace:

```bash
/plugin marketplace add BitterSecurity/Vigilo
```

Install the plugin:

```bash
/plugin install vigilo@Vigilo
```

## Update

```bash
/plugin update vigilo
```

## Usage

| Command | Description |
|---------|-------------|
| `/audit` | Full security audit (Phase 1 recon + Phase 2 deep analysis) |
| `/poc <scenario.md>` | Generate and validate Foundry PoC from attack scenario |

### Example

```bash
# Run full security audit
/audit

# Generate PoC from attack scenario
/poc .vigilo/abc12345/findings/high/H-01.md
```

## Framework Support

| Framework | Detection |
|-----------|-----------|
| Foundry | `foundry.toml` |
| Hardhat | `hardhat.config.js/ts` |
| Anchor (Solana) | `Anchor.toml` |
| Scarb (Cairo) | `Scarb.toml` |

## LSP Support

| Language | Server | Install |
|----------|--------|---------|
| Solidity | `nomicfoundation-solidity-language-server` | `npm install -g @nomicfoundation/solidity-language-server` |
| Rust | `rust-analyzer` | `rustup component add rust-analyzer` |
| Cairo | `scarb` | [Scarb Installation](https://docs.swmansion.com/scarb/) |

### Quick Install

**Windows:**
```powershell
.\lsp_install.ps1
```

**Linux/macOS:**
```bash
./lsp_install.sh
```

## License

This project is licensed under the [Business Source License 1.1](../../LICENSE).

- **Non-production use**: Free (personal, educational, research, non-commercial security auditing)
- **Production use**: Requires commercial license
- **Change Date**: 2029-01-21 (converts to Apache-2.0)

Commercial licensing: catower917@gmail.com
