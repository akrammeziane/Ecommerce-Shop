import { Mail } from "lucide-react";

export default function Newsletter() {
  return (
    <section className="mx-auto mt-16 max-w-[1400px] px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-between gap-4 rounded-none border border-black/10 bg-[#f7f7f7] px-5 py-6 sm:flex-row sm:px-8">
        <div className="flex items-center gap-3 text-footer">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-primary">
            <Mail size={18} />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-tight">
              Stay in the loop
            </p>
            <p className="text-xs text-footer/70">
              New drops, exclusive offers, and more.
            </p>
          </div>
        </div>

        <div className="flex w-full max-w-md items-center gap-2 sm:w-auto">
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full border border-black/10 bg-primary px-4 py-3 text-sm text-footer outline-none placeholder:text-footer/40"
          />
          <button className="bg-accent px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
}
