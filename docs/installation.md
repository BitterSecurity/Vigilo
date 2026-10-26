# Installation Guide

## Prerequisites

- **Node.js** v18+ (for OpenCode plugin)
- **Foundry** (for PoC testing) - [Installation](https://book.getfoundry.sh/getting-started/installation)

## Claude Code

### Via Plugin Marketplace (Recommended)

```bash
# Register the marketplace
/plugin marketplace add BitterSecurity/Vigilo

# Install the plugin
/plugin install vigilo
```

### Manual Installation

1. Clone this repository
2. Navigate to `packages/claude`
3. Follow Claude Code plugin installation instructions

## OpenCode

### From Source

```bash
# Clone repository
git clone https://github.com/BitterSecurity/Vigilo.git
cd vigilo/packages/opencode

# Install dependencies
npm install

# Build
npm run build
```

### Configure OpenCode

Add to your OpenCode config (`~/.config/opencode/opencode.json` or project's `opencode.json`):

```json
{
  "plugin": ["file:///absolute/path/to/vigilo/packages/opencode/dist/index.js"]
}
```

### Per-Project Configuration

Create `.opencode/vigilo.json` in your project:

```json
{
  "auditors": {
    "vigilo": { "model": "anthropic/claude-opus-4-5" },
    "explorator": { "model": "anthropic/claude-sonnet-4-5" },
    "speculator": { "model": "anthropic/claude-sonnet-4-5" },
    "reentrancy-auditor": { "model": "anthropic/claude-sonnet-4-5" }
  }
}
```

## Development Mode

For contributors developing Vigilo locally.

### Setup

```bash
git clone https://github.com/BitterSecurity/Vigilo.git
cd vigilo/packages/opencode
bun install
bun link
```

### Configure Local Plugin

Edit `~/.config/opencode/opencode.json`:

```json
{
  "plugin": [
    "D:/path/to/vigilo/packages/opencode"
  ]
}
```

Replace with your actual path.

### Development Workflow

**Terminal 1** - Watch mode (auto-rebuild on changes):
```bash
cd vigilo/packages/opencode
bun run dev
```

**Terminal 2** - Run OpenCode:
```bash
opencode
```

After modifying source files, restart OpenCode to load the updated plugin.

### Quick Commands

| Task | Command |
|------|---------|
| Build once | `bun run build` |
| Watch mode | `bun run dev` |
| Test CLI directly | `bun src/cli/index.ts install` |
| Run diagnostics | `bun src/cli/index.ts doctor --verbose` |

### Restore Production Mode

Run the installer again to switch back to the published package:

```bash
bunx vigilo install
```

This updates `opencode.json` to use `vigilo@latest`.

---

## LSP Servers (Optional)

For enhanced code analysis:

| Language | Server | Install |
|----------|--------|---------|
| Solidity | `nomicfoundation-solidity-language-server` | `npm i -g @nomicfoundation/solidity-language-server` |
| Rust | `rust-analyzer` | `rustup component add rust-analyzer` |
| Cairo | `scarb` | [Scarb Installation](https://docs.swmansion.com/scarb/) |

### Quick Install Scripts

**Windows:**
```powershell
cd packages/claude
.\lsp_install.ps1
```

**Linux/macOS:**
```bash
cd packages/claude
./lsp_install.sh
```
