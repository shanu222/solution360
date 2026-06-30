
# RESILIENCE TECHNOLOGIES LABS Website

Professional startup portfolio website for presenting RESILIENCE TECHNOLOGIES LABS' climate, infrastructure, and resilience technology vision to investors, partners, and early customers.

## Project Overview

This repository contains a clean, production-ready static frontend for the RESILIENCE TECHNOLOGIES LABS website.
It is intentionally framework-light (HTML, CSS, JavaScript) so it can be quickly demoed, hosted, and iterated.

## Purpose

- Showcase startup positioning for funding conversations
- Present key products and value proposition in investor demos
- Provide a reliable base for future frontend upgrades

## Features

- Single-page startup website with clear navigation
- Product and feature sections for portfolio presentation
- Contact form with client-side interaction
- Clean folder structure optimized for GitHub and deployment
- Fully local assets and path-safe linking

## Folder Structure

- `index.html`
- `css/style.css`
- `js/main.js`
- `images/`
- `assets/`

## Run Locally

1. Clone the repository.
2. Open the project folder.
3. Open `index.html` directly in your browser.

No build step is required for this version.

## Railway Deployment

- Railway uses `package.json` and runs `npm start`.
- App serves on port `8080` using `serve`.
- `railway.json` includes start command, healthcheck path, and restart policy.
  