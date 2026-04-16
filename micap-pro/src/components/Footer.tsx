export default function Footer() {
  return (
    <footer className="bg-[var(--background)] border-t border-[var(--border)] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-xl font-bold tracking-tighter text-[var(--foreground)]">
              MICAP<span className="text-[var(--primary)]">.PRO</span>
            </span>
            <p className="text-sm text-[var(--muted)] mt-2">
              Micap LLC. A subsidiary of Micap AI LLC.
            </p>
          </div>

          <div className="flex space-x-6">
            <a href="/documents/az-contract-template.md" className="text-sm text-[var(--muted)] hover:text-[var(--primary)] transition-colors">
              AZ Contracts
            </a>
            <a href="/documents/ca-contract-template.md" className="text-sm text-[var(--muted)] hover:text-[var(--primary)] transition-colors">
              CA Contracts
            </a>
            <a href="#" className="text-sm text-[var(--muted)] hover:text-[var(--primary)] transition-colors">
              Privacy Policy
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[var(--border)] flex flex-col md:flex-row justify-between items-center text-sm text-[var(--muted)]">
          <p>&copy; {new Date().getFullYear()} Micap LLC. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Led by Jeff Milam, MBA</p>
        </div>
      </div>
    </footer>
  );
}
