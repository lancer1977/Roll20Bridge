# Roll20Bridge

A browser extension for integrating external tools with Roll20 via SignalR.

## ⚠️ Current Status: NON-FUNCTIONAL

**The backend server has been deprovisioned and is offline.**

The extension requires a SignalR hub at `https://polyhydragames.azurewebsites.net/rollhub` which no longer exists (DNS returns NXDOMAIN). The extension will load but cannot connect to the backend.

### Options to Restore Functionality

1. **Retire the extension** (recommended if unused)
2. **Rebuild the SignalR backend** and host it on existing infrastructure

See backlog task `roll20bridge-modernization-deliverable-01-azure-backend` for full investigation details.

## 🚀 Key Features

- **Manifest V3 Compliant** - Updated for modern browsers
- **Service Worker Background** - Non-persistent background script
- **Roll20 Integration** - Injects messages into Roll20 chat

## 🛠 Technology Stack

- JavaScript (browser extension)
- SignalR client for real-time communication
- jQuery for DOM manipulation

## 📖 Documentation

- [Feature Index](./docs/features/README.md)
- [Core Capabilities](./docs/features/core-capabilities.md)

## 🚦 Getting Started

1. Load as unpacked extension in Chrome/Edge
2. Navigate to `https://app.roll20.net/editor/`
3. Note: Backend connection will fail until SignalR hub is restored

## Architecture

```
content.js (Roll20 page context)
    ↓ SignalR connection
[OFFLINE] polyhydragames.azurewebsites.net/rollhub
    ↓ Messages
background.js (service worker)
    ↓ chrome.tabs.sendMessage
Roll20 chat input
```
