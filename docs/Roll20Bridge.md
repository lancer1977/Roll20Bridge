# Roll20Bridge

**Location:** `~/code/Roll20Bridge`

**Purpose:** Browser extension that integrates Roll20 (virtual tabletop) with an external SignalR hub. Sends messages from external source to Roll20 chat.

## Tech Stack

- **Type:** Browser Extension (Chrome/Firefox)
- **Manifest:** v2
- **Dependencies:** jQuery 3.3.1, SignalR

## Project Structure

```
Roll20Bridge/
├── manifest.json     # Extension manifest
├── content.js        # Main content script
├── background.js     # Background script
├── options.html      # Settings page
└── options.js        # Settings logic
```

## Entry Points

| File | Purpose |
|------|---------|
| `manifest.json` | Extension manifest (v2) |
| `content.js` | Injected into Roll20 editor |
| `background.js` | Background script |
| `options.html/js` | Settings page |

## Key Components

### content.js
- Sends messages to Roll20 chat via jQuery
- Connects to SignalR hub
- Registers player identity
- Listens for messages from background

### Configuration
- `enableTransmit` — Enable/disable transmission
- `session` — Session identifier
- `playerName` — Player name

## External Services

- **SignalR Hub:** `https://polyhydragames.azurewebsites.net/rollhub`
- **Roll20:** `https://app.roll20.net/editor/*`

## Installation

1. Go to `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select `Roll20Bridge` folder
5. Configure session ID and player name

## Notes

- Uses manifest v2 (older format)
- Requires external Azure backend
- Could update to manifest v3