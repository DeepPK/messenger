<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <xsl:for-each select="testsuites/testsuite">
            <file path="{@name}">
                <xsl:for-each select="testcase">
                    <testCase name="{@name}" duration="{@time * 1000}"/>
                </xsl:for-each>
            </file>
        </xsl:for-each>
    </xsl:template>
</xsl:stylesheet>