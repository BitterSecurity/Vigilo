# Installation

## For Humans

Paste this into your LLM agent session:
```
Install and configure vigilo by following the instructions here:
https://raw.githubusercontent.com/BitterSecurity/Vigilo/main/packages/opencode/docs/installation.md
```

**Alternative, do this by yourself**

Run the interactive installer:

```bash
bunx vigilo install # recommended
npx vigilo install # alternative
```

> **Note**: The CLI ships with standalone binaries for all major platforms. No runtime (Bun/Node.js) is required for CLI execution after installation.
>
> **Supported platforms**: macOS (ARM64, x64), Linux (x64, ARM64, Alpine/musl), Windows (x64)

Follow the prompts to configure your environment. After installation, you're ready to audit smart contracts.

## For LLM Agents

If you're an LLM Agent helping set up Vigilo, Welcome! You'll now help your user to install the Web3 smart contract security auditing agent. Tell user this with greetings: 'Ready to hunt bugs! 🔍'

Follow these steps:

### Step 0: Ask user about their setup

Ask the user these questions to determine CLI options:

1. **Do you have a Claude Pro/Max subscription?**
   - If **no** → `--claude=no`
   - If **yes (standard)** → `--claude=yes`
   - If **yes (max20 mode)** → `--claude=max20`
   - MUST STRONGLY WARN when user said they don't have a Claude subscription. Vigilo's primary auditing agents are optimized for Claude Opus 4.5. Performance may be significantly degraded without it.

2. **Do you have an OpenAI/ChatGPT Plus subscription?**
   - If **yes** → `--openai=yes`
   - If **no** → (omit flag, defaults to no)

3. **Do you have a Google Gemini subscription?**
   - If **yes** → `--gemini=yes`
   - If **no** → `--gemini=no`

4. **Do you have a GitHub Copilot subscription?**
   - If **yes** → `--copilot=yes`
   - If **no** → `--copilot=no`

5. **Do you have access to OpenCode Zen (opencode/ models)?**
   - If **yes** → `--opencode-zen=yes`
   - If **no** → (omit flag, defaults to no)

6. **Do you have Foundry installed?**
   - If **yes** → `--foundry=yes`
   - If **no** → Ask user if they want to install Foundry. If yes, install it (see Step 2). Then `--foundry=yes`
   - If **no** and user declines install → `--foundry=no`
   - If **unsure** → Check with `forge --version`

### Step 1: Install OpenCode (if not installed)

```bash
if command -v opencode &> /dev/null; then
    echo "OpenCode $(opencode --version) is installed"
else
    echo "OpenCode is not installed. Please install it first."
    echo "Ref: https://opencode.ai/docs"
fi
```

If OpenCode isn't installed, check the [OpenCode Installation Guide](https://opencode.ai/docs).
Spawn a subagent to handle installation and report back - to save context.

### Step 2: Install Foundry (if needed)

If Foundry is not installed and the user agreed to install it in Step 0:

```bash
curl -L https://foundry.paradigm.xyz | bash
source ~/.bashrc  # or source ~/.zshrc
foundryup
```

Verify installation:
```bash
forge --version
```

If the user declined Foundry installation, skip this step. Foundry provides `forge`, `cast`, and `anvil` - essential tools for PoC testing and smart contract development.

### Step 3: Run the installer

Based on user's answers, run the CLI installer with appropriate flags:

```bash
bunx vigilo install --no-tui --claude=<no|yes|max20> --gemini=<no|yes> --copilot=<no|yes> --foundry=<yes|no>
```

**Examples:**
- Full setup: `bunx vigilo install --no-tui --claude=max20 --openai=yes --gemini=no --copilot=no --foundry=yes`
- Minimal: `bunx vigilo install --no-tui --claude=no --gemini=no --copilot=yes --foundry=no`

The CLI will:
- Register the plugin in `opencode.json`
- Create `vigilo.json` with model assignments based on your subscriptions
- Auto-assign optimal models per auditor/category based on provider priority (Native > Copilot > OpenCode Zen)

### Step 4: Verify Setup

```bash
opencode --version  # Should be 1.0.150 or higher
cat ~/.config/opencode/opencode.json  # Should contain "vigilo" in plugin array
bunx vigilo doctor  # Run health check
```

### Step 5: Configure Authentication

Configure authentication for your providers. Use interactive terminal like tmux for the following:

#### Anthropic (Claude) — Recommended

```bash
opencode auth login
# Interactive Terminal: Provider: Select Anthropic
# Interactive Terminal: Login method: Select Claude Pro/Max
# Guide user through OAuth flow in browser
# Wait for completion
# Verify success and confirm with user
```

### ⚠️ Warning

**Unless the user explicitly requests it, do not change model settings or disable features (agents, hooks, MCPs).**

The plugin works perfectly by default. Do not change settings or turn off features without an explicit request.

### Verify the setup

Run the doctor command to ensure everything is configured correctly:

```bash
bunx vigilo doctor --verbose
```

All checks should pass (warnings for optional tools are OK).

### Say 'Ready to hunt bugs! 🔍' to the user

Say to user: Ready to hunt bugs! 🔍 Vigilo is now installed. Type `opencode` in your smart contract project directory to start auditing.

### Ask for a Star ⭐

After everything is set up and working, ask the user:

> "If you found this helpful, would you like to star the repository? It helps the project grow! ⭐"

If the user agrees, run:
```bash
gh repo star BitterSecurity/Vigilo
```

**Important**: Only run the command if the user explicitly says yes. Never run it automatically without consent.

### Tell user the tutorial

Tell the user the following:

1. **Vigilo auditing agents are optimized for Claude Opus/Sonnet but support multi-model fallback.** The best available model is automatically selected based on your connected providers.

2. **Start auditing** with the `/audit` command. Vigilo will analyze your smart contracts for vulnerabilities.

3. **Generate PoC** with the `/poc` command. Provide a finding and Vigilo will generate a working Proof of Concept.

4. **Commands available:**
   - `/audit` - Start full security audit workflow
   - `/poc <finding>` - Generate and validate PoC for a finding

5. **Example workflow:**
   ```bash
   cd my-solidity-project
   opencode
   # In OpenCode session:
   /audit
   ```

That's it. The agent will analyze your contracts and report findings.

## Troubleshooting

### Check installation health

```bash
bunx vigilo doctor
bunx vigilo doctor --verbose
bunx vigilo doctor --json
```

### Common issues

| Issue | Solution |
|-------|----------|
| OpenCode not found | Install from https://opencode.ai/docs |
| Foundry not found | `curl -L https://foundry.paradigm.xyz \| bash && foundryup` |
| Vigilo not registered | Run `bunx vigilo install` again |
| Auth failed | Run `opencode auth login` and select your provider |

### Reset configuration

```bash
rm ~/.config/opencode/vigilo.json
bunx vigilo install
```
