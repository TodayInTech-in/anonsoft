<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
	<xsl:template match="/">
		<html xmlns="http://www.w3.org/1999/xhtml">
			<head>
				<title>XML Sitemap — TodayInTech</title>
				<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
				<style type="text/css">
					body {
						font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
						color: #334155;
						background-color: #f8fafc;
						margin: 0;
						padding: 40px 20px;
					}
					.container {
						max-width: 1000px;
						margin: 0 auto;
						background: #ffffff;
						border: 1.5px solid #e2e8f0;
						border-radius: 12px;
						padding: 32px;
						box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
					}
					h1 {
						color: #1e293b;
						font-size: 1.75rem;
						margin-top: 0;
						margin-bottom: 8px;
					}
					p.intro {
						color: #64748b;
						font-size: 0.95rem;
						margin-bottom: 24px;
					}
					.stats {
						display: inline-block;
						background: #e0f2fe;
						color: #0369a1;
						font-size: 0.85rem;
						font-weight: 700;
						padding: 6px 14px;
						border-radius: 50px;
						margin-bottom: 24px;
					}
					table {
						width: 100%;
						border-collapse: collapse;
						margin-top: 16px;
					}
					th {
						background: #1e293b;
						color: #ffffff;
						text-align: left;
						padding: 12px 16px;
						font-size: 0.85rem;
						font-weight: 600;
						text-transform: uppercase;
						letter-spacing: 0.05em;
					}
					th:first-child { border-top-left-radius: 8px; }
					th:last-child { border-top-right-radius: 8px; }
					td {
						padding: 12px 16px;
						border-bottom: 1px solid #e2e8f0;
						font-size: 0.9rem;
						word-break: break-all;
					}
					tr:nth-child(even) { background-color: #f8fafc; }
					tr:hover { background-color: #f1f5f9; }
					a {
						color: #0369a1;
						text-decoration: none;
						font-weight: 500;
					}
					a:hover {
						text-decoration: underline;
					}
				</style>
			</head>
			<body>
				<div class="container">
					<h1>TodayInTech XML Sitemap</h1>
					<p class="intro">This XML sitemap lists all core pages, projects, and blog posts for search engine indexing.</p>
					<div class="stats">
						Total Indexable URLs: <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/>
					</div>
					<table>
						<thead>
							<tr>
								<th width="65%">URL</th>
								<th width="15%">Priority</th>
								<th width="20%">Last Modified</th>
							</tr>
						</thead>
						<tbody>
							<xsl:for-each select="sitemap:urlset/sitemap:url">
								<tr>
									<td>
										<a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a>
									</td>
									<td><xsl:value-of select="sitemap:priority"/></td>
									<td><xsl:value-of select="sitemap:lastmod"/></td>
								</tr>
							</xsl:for-each>
						</tbody>
					</table>
				</div>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>
