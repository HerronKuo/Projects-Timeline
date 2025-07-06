import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkGfm from "remark-gfm"
import remarkBreaks from "remark-breaks"
import remarkRehype from "remark-rehype"
import rehypeRaw from "rehype-raw"
import rehypeHighlight from "rehype-highlight"
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeStringify from "rehype-stringify"

export async function processMarkdown(content: string): Promise<string> {
  try {
    const result = await unified()
      // Parse markdown
      .use(remarkParse)
      // Add GitHub Flavored Markdown support (tables, strikethrough, task lists, etc.)
      .use(remarkGfm)
      // Preserve line breaks
      .use(remarkBreaks)
      // Convert markdown to HTML
      .use(remarkRehype, { allowDangerousHtml: true })
      // Allow raw HTML in markdown
      .use(rehypeRaw)
      // Add syntax highlighting to code blocks
      .use(rehypeHighlight, {
        detect: true,
        ignoreMissing: true,
        subset: ["javascript", "typescript", "python", "bash", "json", "css", "html", "sql", "yaml", "markdown"],
      })
      // Add IDs to headings
      .use(rehypeSlug)
      // Add links to headings
      .use(rehypeAutolinkHeadings, {
        behavior: "wrap",
        properties: {
          className: ["heading-link"],
        },
      })
      // Convert to HTML string
      .use(rehypeStringify)
      .process(content)

    return String(result)
  } catch (error) {
    console.error("Error processing markdown:", error)
    // Enhanced fallback processing
    return processMarkdownFallback(content)
  }
}

function processMarkdownFallback(content: string): string {
  // Basic markdown to HTML conversion as fallback
  const html = content
    // Headers
    .replace(/^### (.*$)/gim, "<h3>$1</h3>")
    .replace(/^## (.*$)/gim, "<h2>$1</h2>")
    .replace(/^# (.*$)/gim, "<h1>$1</h1>")
    // Bold
    .replace(/\*\*(.*)\*\*/gim, "<strong>$1</strong>")
    // Italic
    .replace(/\*(.*)\*/gim, "<em>$1</em>")
    // Code blocks
    .replace(/```(\w+)?\n([\s\S]*?)```/gim, (match, lang, code) => {
      const language = lang || "text"
      return `<pre class="hljs language-${language}"><code class="language-${language}">${escapeHtml(code.trim())}</code></pre>`
    })
    // Inline code
    .replace(/`([^`]+)`/gim, "<code>$1</code>")
    // Links
    .replace(/\[([^\]]+)\]$$([^)]+)$$/gim, '<a href="$2">$1</a>')
    // Line breaks
    .replace(/\n/gim, "<br>")

  return html
}

function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}
