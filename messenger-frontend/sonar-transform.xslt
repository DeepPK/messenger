<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <testExecutions version="1">
            <xsl:apply-templates select="//testsuite"/>
        </testExecutions>
    </xsl:template>

    <xsl:template match="testsuite">
        <file path="{@name}">
            <xsl:apply-templates select="testcase"/>
        </file>
    </xsl:template>

    <xsl:template match="testcase">
        <testCase name="{@name}" duration="{@time * 1000}"/>
    </xsl:template>
</xsl:stylesheet>