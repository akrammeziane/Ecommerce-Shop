import { Link } from "react-router-dom";
import { ArrowUpRight, HeartHandshake, Shield } from "lucide-react";
import aboutImage from "../../assets/aboutImage.jpg";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="border-y border-black/10 bg-primary py-16 lg:py-24"
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left Visual Column */}
          <div className="relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden border border-black/10 bg-hero">
              <img
                src={aboutImage}
                alt="Talqin Modest Islamic Men Streetwear"
                className="h-full w-full object-cover contrast-105 hover:scale-105 transition-all duration-700"
              />
              {/* Islamic Brand Badges */}
              <div className="absolute top-4 left-4 bg-footer text-primary px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] border border-primary/20">
                Talqin // Men's Modestwear
              </div>
              <div className="absolute bottom-4 right-4 bg-accent text-footer px-4 py-2 text-[11px] font-black uppercase tracking-widest shadow-md">
                Oversized & Covered Fits
              </div>
            </div>

            {/* Background Decorative Frame */}
            <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full border border-black/20 bg-transparent hidden sm:block" />
          </div>

          {/* Right Copy Column */}
          <div className="space-y-6">
            <h2 className="font-heading text-3xl sm:text-5xl font-black uppercase tracking-tight text-footer leading-none">
              Modesty in Form. <br />
              <span className="text-accent">Built for the Modern Muslim.</span>
            </h2>

            <p className="text-sm sm:text-base text-footer/80 leading-relaxed font-normal">
              TALQIN fuses modern urban streetwear with Islamic standards of
              modesty. From oversized heavy-gsm hoodies and relaxed-fit
              drop-shoulder tees to streetwear thobes and cargo pants, every
              piece is designed with longer cuts, non-revealing silhouettes, and
              premium ethical materials.
            </p>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-black/10">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-footer">
                    Relaxed & Longer Cuts
                  </h4>
                  <p className="text-[11px] text-footer/60 mt-0.5">
                    Designed with extra length and proper coverage in mind.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <HeartHandshake className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-footer">
                    Ethical Sourcing
                  </h4>
                  <p className="text-[11px] text-footer/60 mt-0.5">
                    Premium heavy cotton and fair trade production.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Group */}
            <div className="pt-6 flex flex-wrap items-center gap-4">
              <Link
                to="/about"
                className="bg-footer text-primary px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] transition hover:bg-accent hover:text-footer flex items-center gap-2 group"
              >
                Our Brand Mission
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <Link
                to="/shop"
                className="border border-black px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-footer hover:bg-black hover:text-primary transition"
              >
                View Collection
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
