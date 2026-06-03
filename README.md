⚡ Content Factory

Telugu Narrative Intelligence & Real-Time Content Synthesis Engine

Content Factory is a high-fidelity, real-time widescreen news aggregation and narrative tracking application built for content creators, media analysts, and digital publishers.

The application reverse-engineers modern media radar streams into a zero-latency, dual-column editorial desk. It dynamically aggregates raw, regional breaking news (Politics, Tollywood Entertainment, Business, Tech, Weather, and Regional) and utilizes deep-link URL integrations to instantly pipe structured, multilingual context directly into custom Google Gemini Gems for immediate content generation.

🌟 Key Features

📅 Strict "Today-Only" Dynamic Scheduling Engine

No Outdated News: Say goodbye to stale, hardcoded articles. The application features a dynamic time-offset scheduler that evaluates your system's clock on load or refresh.

Relative Timestamps: Automatically shifts calendar days to match your active local date and spreads news items backwards from your current hour in organic 14-minute intervals (e.g., Today, Just Now, 42 mins ago).

🖥️ Widescreen Adaptable 50/50 Dual Column Grid

Perfect Symmetry: Redesigned utilizing a native CSS Grid system (grid-cols-1 md:grid-cols-2) to guarantee an absolute 50/50 widescreen viewport split on 1080p, 2K, and 4K displays.

Independent Scrolling Panes: Navigation and search stay locked to the viewport header while the feed cards and editing workspace scroll independently, avoiding ugly double scrollbars on the browser window.

Flexible Link Truncation: Bypasses absolute sizing bugs by utilizing container-relative min-w-0 truncation, keeping long links visually clean at any browser zoom level.

📈 High-Impact Audience Spotlighting

Social Engagement Heatmap: Stories are parsed with a live engagement score (audienceRate out of 100%).

Visual Glow Treatment: High-impact stories (scoring $\ge$ 90% audience rate) are dynamically highlighted with soft glowing warm borders, a vibrant pulsing TOP XX% badge on listing cards, and a striking high-engagement header in the focus console.

✍️ Dual-Core Custom Gemini Gem Integrations

Includes a dedicated AI Generation Engine in the Synthesis Workspace. Rather than copying and pasting context manually, you can launch straight into your optimized workflows with one click:

📝 "Content write up": Bundles all verified summaries, Telugu briefs, and active source URLs into a custom-instructed prompt, opening directly inside your dedicated long-form Gem: https://gemini.google.com/gem/1Bad-9bFYlSJ95MToqLeSuZZXtgp1DoHg?usp=sharing

📹 "Shorts write up": Re-packages the same real-time event guidelines into a fast-paced video/social copy prompt and routes straight into your short-form Gem: https://gemini.google.com/gem/1WTODyaX834kRDfZ0E-fKqPcWqYnBMnue?usp=sharing

📋 Pervasive Source Visibility & Sandbox-Proof Copying

Always Visible: To maintain transparency, the exact, full URL path of every single publisher is displayed directly beneath the article title—both inside the sidebar preview cards and the main details console.

Enterprise Copy Fallback: Uses a robust clipboard copy logic designed to seamlessly bypass restrictive browser and iframe sandboxes, providing instantaneous visual feedback indicators (Copied!) next to every URL.

🛠️ Tech Stack & Architecture

Framework: React 19 (TypeScript Template)

Build System: Vite 6+ (Fast Hot Module Replacement)

Styling Engine: Tailwind CSS v4.0 (Native Vite compile-time integration)

Vector Icons: Lucide React

Hosting Platform: Vercel (Edge CDN Network)

🚀 Local Installation & Setup

Set up your local workstation and see the widescreen dashboard running in under a minute.

1. Clone & Navigate

git clone https://github.com/jnanadevishere/content-factory-app.git
cd content-factory-app


2. Install Packages

This project leverages Tailwind CSS v4, which uses a CSS-first, zero-config compiler. You do not need to install postcss or generate a tailwind.config.js file:

npm install


3. Start the Development Server

npm run dev


Open your browser and navigate to http://localhost:5173 to see the live, widescreen dashboard!

📦 How the Prompt Engine Works Natively

When a user clicks on either of the "Write Now" action buttons, the application serializes the active story context using URL-encoding. Below is the structured prompt template injected into your custom Gem on the fly:

System Guidance: Content Creator Agent
Context: Strictly Dated [Current System Date]
Breaking Title: [English Headline]
Telugu Headline: [Telugu Translation]
Synthesized Summary (English): [3-Sentence Narrative Brief]
Synthesized Summary (Telugu): [Telugu Brief Summary]

Source Reference Links:
- [Source Name 1]: [Source URL 1] (Published: [Relative Time Offset])
- [Source Name 2]: [Source URL 2] (Published: [Relative Time Offset])

Actionable Request:
Using the custom Gem parameters, generate high-impact media copy, localized Telugu summaries, and engaging social posts. Align all statements strictly with the provided source reference links.


🛡️ License

Distributed under the MIT License. See LICENSE for more information.

👥 Author

GitHub: @jnanadevishere

Email: jnanadevishere@gmail.com
