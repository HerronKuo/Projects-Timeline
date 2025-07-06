import Link from "next/link";

export default function NotFound() {
    return (
        <div className="container mx-auto px-4 py-24 text-center">
            <h2 className="text-3xl font-bold mb-4">Not Found</h2>
            <p className="text-muted-foreground mb-8">
                Could not find the requested resource
            </p>
            <Link
                href="/"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
                Return to Timeline
            </Link>
        </div>
    );
}
