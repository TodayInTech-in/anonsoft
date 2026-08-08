#!/bin/bash
cd /root/project/todayintechweb
export PATH="/root/.local/bin:$PATH"

/root/.local/bin/agy --dangerously-skip-permissions --print "Execute the todayintech-blog-publisher skill to generate a brand new SEO friendly blog post about a trending B2B tech topic (e.g., AI, Healthcare SaaS, EdTech, FinTech, POS). Generate a relevant hero image, create the markdown file, update blog/index.html with the card, run all build scripts (compile_markdown, sitemaps, clean_html_links, llms), and finally commit and push to origin main. Do not ask for user confirmation, execute the entire pipeline autonomously."
