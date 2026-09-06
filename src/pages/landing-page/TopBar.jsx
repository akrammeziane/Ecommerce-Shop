export default function TopBar() {
  return (
    <div className="bg-footer text-primary">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-2 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.18em] sm:px-6 lg:px-8">
        <p className="flex items-center gap-2">
          <span className="inline-block h-2.5 w-2.5 rounded-full border border-primary/80" />
          Free shipping on orders over $100
        </p>
        <p className="flex items-center gap-2 text-primary/80">
          <span className="inline-block h-2.5 w-2.5 rounded-full border border-primary/80" />
          10% off your first order: code: STREETLO
        </p>
        <p className="text-primary/90">Help & support</p>
      </div>
    </div>
  );
}
