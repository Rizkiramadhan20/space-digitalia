<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
	<xsl:template match="/">
		<html xmlns="http://www.w3.org/1999/xhtml">
			<head>
				<title>XML Sitemap</title>
				<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
				<style type="text/css">
					body {
						font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
						color: #333;
						max-width: 75%;
						margin: 0 auto;
					}
					table {
						border-collapse: collapse;
						width: 100%;
						margin: 12px 0;
					}
					tr {
						border-bottom: 1px solid #ddd;
					}
					tr:nth-child(even) {
						background-color: #f6f6f6;
					}
					th, td {
						text-align: left;
						padding: 16px;
					}
					th {
						background-color: #f2f2f2;
					}
					h1 {
						color: #1a73e8;
						margin: 24px 0;
					}
					a {
						color: #1a73e8;
						text-decoration: none;
					}
					a:hover {
						text-decoration: underline;
					}
				</style>
			</head>
			<body>
				<h1>XML Sitemap</h1>
				<table>
					<tr>
						<th>URL</th>
						<th>Last Modified</th>
						<th>Change Frequency</th>
						<th>Priority</th>
					</tr>
					<xsl:for-each select="sitemap:urlset/sitemap:url">
						<tr>
							<td>
								<a href="{sitemap:loc}">
									<xsl:value-of select="sitemap:loc"/>
								</a>
							</td>
							<td><xsl:value-of select="sitemap:lastmod"/></td>
							<td><xsl:value-of select="sitemap:changefreq"/></td>
							<td><xsl:value-of select="sitemap:priority"/></td>
						</tr>
					</xsl:for-each>
				</table>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>