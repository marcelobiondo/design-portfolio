#!/usr/bin/env bash
set -Eeuo pipefail

NODE_MAJOR="24"

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
RESET='\033[0m'

info()    { printf "${CYAN}→${RESET} %s\n" "$1"; }
success() { printf "${GREEN}✓${RESET} %s\n" "$1"; }
warn()    { printf "${YELLOW}!${RESET} %s\n" "$1"; }
fail()    { printf "${RED}✗${RESET} %s\n" "$1"; exit 1; }

has() {
  command -v "$1" >/dev/null 2>&1
}

detect_os() {
  case "$(uname -s)" in
    Darwin)
      OS="macos"
      ;;
    Linux)
      if grep -qi microsoft /proc/version 2>/dev/null; then
        OS="wsl"
      else
        OS="linux"
      fi
      ;;
    MINGW*|MSYS*|CYGWIN*)
      OS="windows"
      ;;
    *)
      fail "Unsupported system. Use macOS, Linux, WSL2 or Git Bash on Windows."
      ;;
  esac

  success "Detected system: $OS"
}

validate_repo() {
  [[ -f package.json ]] || fail "package.json not found. Run this script from the repository root."
  [[ -f vite.config.js ]] || warn "vite.config.js was not found."

  success "Design Portfolio repository detected"
}

install_base_linux() {
  if ! has apt-get; then
    warn "apt-get is unavailable. Install Git and Curl manually if needed."
    return
  fi

  local packages=()
  has git  || packages+=("git")
  has curl || packages+=("curl")

  if (( ${#packages[@]} > 0 )); then
    info "Installing basic tools..."

    if has sudo; then
      sudo apt-get update
      sudo apt-get install -y "${packages[@]}" ca-certificates
    else
      apt-get update
      apt-get install -y "${packages[@]}" ca-certificates
    fi
  fi
}

install_base_macos() {
  if ! xcode-select -p >/dev/null 2>&1; then
    warn "Apple Command Line Tools must be installed."
    xcode-select --install || true
    printf "\n"
    warn "Complete the installation and run ./install.sh again."
    exit 0
  fi
}

install_base_windows() {
  has git || fail "Git not found. Run this script from Git Bash or WSL2."
  has curl || fail "Curl not found."
}

install_base_tools() {
  info "Checking base tools..."

  case "$OS" in
    linux|wsl) install_base_linux ;;
    macos) install_base_macos ;;
    windows) install_base_windows ;;
  esac

  has git || fail "Git not found."
  has curl || fail "Curl not found."

  success "$(git --version)"
}

node_major() {
  node -p 'process.versions.node.split(".")[0]' 2>/dev/null || echo 0
}

install_node_unix() {
  export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"

  if [[ -s "$NVM_DIR/nvm.sh" ]]; then
    # shellcheck disable=SC1090
    source "$NVM_DIR/nvm.sh"
  else
    info "Installing NVM..."
    curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
    # shellcheck disable=SC1090
    source "$NVM_DIR/nvm.sh"
  fi

  info "Installing Node.js ${NODE_MAJOR}..."
  nvm install "$NODE_MAJOR"
  nvm use "$NODE_MAJOR"
  nvm alias default "$NODE_MAJOR" >/dev/null

  success "Node $(node --version)"
  success "npm $(npm --version)"
}

install_node_windows() {
  if has node && [[ "$(node_major)" -ge "$NODE_MAJOR" ]]; then
    success "Node $(node --version)"
    success "npm $(npm --version)"
    return
  fi

  if has winget; then
    info "Installing Node.js LTS with winget..."
    winget install --id OpenJS.NodeJS.LTS --accept-package-agreements --accept-source-agreements
    warn "Node.js was installed. Restart Git Bash and run ./install.sh again."
    exit 0
  fi

  fail "Node.js ${NODE_MAJOR}+ not found and winget is unavailable. Install Node.js LTS manually."
}

ensure_node() {
  if [[ "$OS" == "windows" ]]; then
    install_node_windows
    return
  fi

  if has node && [[ "$(node_major)" -ge "$NODE_MAJOR" ]]; then
    success "Node $(node --version)"
    success "npm $(npm --version)"
    return
  fi

  install_node_unix
}

install_dependencies() {
  info "Installing project dependencies..."

  if [[ -f package-lock.json ]]; then
    npm ci
  else
    warn "package-lock.json not found; using npm install."
    npm install
  fi

  success "Dependencies installed"
}

validate_tools() {
  info "Validating project tooling..."
  npx vite --version
  npx wrangler --version
  success "Vite OK"
  success "Wrangler OK"
}

run_build() {
  info "Running validation build..."
  npm run build
  [[ -d dist ]] || fail "Build finished but dist/ was not generated."
  success "Build OK"
}

check_cloudflare() {
  printf "\n"
  info "Checking Cloudflare authentication..."

  if npx wrangler whoami >/dev/null 2>&1; then
    success "Wrangler authenticated"
  else
    warn "Wrangler is not authenticated yet."
    printf "\nTo use manual Cloudflare commands later:\n\n  npx wrangler login\n"
  fi
}

finish() {
  printf "\n${GREEN}============================================================${RESET}\n"
  printf "${GREEN} Design Portfolio ready for development.${RESET}\n"
  printf "${GREEN}============================================================${RESET}\n\n"

  printf "Frontend:\n  npm run dev\n\n"
  printf "Production build:\n  npm run build\n\n"
  printf "Preview build:\n  npm run preview\n\n"
  printf "Cloudflare local preview:\n  npm run build\n  npx wrangler dev\n\n"
  printf "Start new work from develop, not main.\n"
}

main() {
  printf "\nDesign Portfolio — development environment setup\n"
  printf "===============================================\n\n"

  detect_os
  validate_repo
  install_base_tools
  ensure_node
  install_dependencies
  validate_tools
  run_build
  check_cloudflare
  finish
}

main "$@"
