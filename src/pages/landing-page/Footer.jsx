export default function Footer() {
  return (
    <footer className="mt-20 bg-footer text-primary">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_1fr_1fr_1fr] lg:px-8">
        <div>
          <h3 className="font-heading text-4xl uppercase tracking-tight">
            Talqin
          </h3>
          <p className="mt-4 max-w-xs text-sm text-primary/70">
            Streetwear made for the bold. We create timeless apparel designed to
            stand out.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
            Shop
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-primary/75">
            <li>All products</li>
            <li>Hoodies</li>
            <li>T-shirts</li>
            <li>Pants</li>
            <li>Jackets</li>
            <li>Accessories</li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
            Customer Care
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-primary/75">
            <li>Contact us</li>
            <li>Shipping &amp; Delivery</li>
            <li>Returns</li>
            <li>Size Guide</li>
            <li>Track Order</li>
            <li>FAQ</li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
            Company
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-primary/75">
            <li>About us</li>
            <li>Our story</li>
            <li>Careers</li>
            <li>Wholesale</li>
            <li>Privacy</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary/10">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-3 px-4 py-4 text-xs uppercase tracking-[0.15em] text-primary/70 sm:flex-row sm:px-6 lg:px-8">
          <p>© 2026 Talqin. All rights reserved.</p>
          <div className="flex gap-4">
            <span>Visa</span>
            <span>Mastercard</span>
            <span>PayPal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
