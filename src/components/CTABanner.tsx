export default function CTABanner() {
  return (
    <section className="my-12 rounded-lg border bg-muted/30 p-8 text-center">
      <h3 className="mb-2 text-2xl font-semibold">Ready to share your story?</h3>
      <p className="mb-4 text-muted-foreground">
        Join thousands of writers and creators building their audience on PublishHub.
      </p>
      <a
        href="/editor"
        className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm transition-colors hover:bg-black/5 dark:hover:bg-white/10"
      >
        Create Your First Post
      </a>
    </section>
  );
}
