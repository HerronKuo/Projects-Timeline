export interface Project {
    slug: string;
    title: string;
    description: string;
    date: string;
    content?: string;
    tags?: string[];
}

export interface Log {
    slug: string;
    title: string;
    date: string;
    content: string;
    projectSlug: string;
}
