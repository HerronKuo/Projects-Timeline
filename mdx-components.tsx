import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import Link from "next/link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        // Override the default components with our own
        h1: ({ children }) => (
            <h1 className="text-3xl font-bold mt-6 mb-4">{children}</h1>
        ),
        h2: ({ children }) => (
            <h2 className="text-2xl font-bold mt-5 mb-3">{children}</h2>
        ),
        h3: ({ children }) => (
            <h3 className="text-xl font-bold mt-4 mb-2">{children}</h3>
        ),
        p: ({ children }) => <p className="mb-4">{children}</p>,
        a: ({ href, children }) =>
            href?.startsWith("/") ? (
                <Link href={href} className="text-primary hover:underline">
                    {children}
                </Link>
            ) : (
                <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                >
                    {children}
                </a>
            ),
        img: ({ src, alt, ...props }) =>
            src ? (
                <Image
                    src={src || "/placeholder.svg"}
                    alt={alt || ""}
                    width={800}
                    height={450}
                    className="rounded-md my-6"
                    {...props}
                />
            ) : null,
        ...components,
    };
}
