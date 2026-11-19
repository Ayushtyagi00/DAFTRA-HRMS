import HomeNavbar from "../../components/home/HomeNavbar";
import HomeHero from "../../components/home/HomeHero";
import HomeStats from "../../components/home/HomeStats";
import HomeTrustedBy from "../../components/home/HomeTrustedBy";
import HomeFeatures from "../../components/home/HomeFeatures";
import HomeDashboardPreview from "../../components/home/HomeDashboardPreview";
import HomeHowItWorks from "../../components/home/HomeHowItWorks";
import HomeIndustries from "../../components/home/HomeIndustries";
import HomeComparison from "../../components/home/HomeComparison";
import HomeSecurity from "../../components/home/HomeSecurity ";
import HomeTestimonials from "../../components/home/HomeTestimonials";
import HomeFAQ from "../../components/home/HomeFAQ ";
import HomeCTA from "../../components/home/HomeCTA";
import HomeFooter from "../../components/home/HomeFooter";
import HomeScrollTop from "../../components/home/HomeScrollTop ";

// Custom keyframes + fonts used by the home components (no tailwind.config changes needed)
const css = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
.home-root{font-family:'Plus Jakarta Sans',ui-sans-serif,system-ui,sans-serif;scroll-behavior:smooth}
.home-root .font-display{font-family:'Fraunces',Georgia,serif}
@keyframes kenburns{from{transform:scale(1)}to{transform:scale(1.12)}}
@keyframes rise{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
@keyframes progress{from{width:0}to{width:100%}}
@keyframes shine{from{transform:translateX(-120%) skewX(-20deg)}to{transform:translateX(220%) skewX(-20deg)}}
@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@keyframes pulsering{0%{transform:scale(.55);opacity:.8}100%{transform:scale(1.15);opacity:0}}
.animate-kenburns{animation:kenburns 9s ease-out forwards}
.animate-rise{animation:rise .9s ease-out both}
.animate-float{animation:float 6s ease-in-out infinite}
.animate-progress{animation:progress linear forwards}
.animate-marquee{animation:marquee 36s linear infinite}
.animate-pulse-ring{animation:pulsering 3.6s ease-out infinite}
.btn-shine{position:relative;overflow:hidden}
.btn-shine::after{content:"";position:absolute;inset:0;width:40%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.45),transparent);transform:translateX(-120%) skewX(-20deg)}
.btn-shine:hover::after{animation:shine .8s ease}
@media (prefers-reduced-motion:reduce){.home-root *{animation:none!important;scroll-behavior:auto}}
`;

export default function HomePage() {
  return (
    <div className="home-root min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      <style>{css}</style>
      <HomeScrollTop />
      <HomeNavbar />
      <HomeHero />
      <HomeStats />
      <HomeTrustedBy />
      <HomeFeatures />
      <HomeDashboardPreview />
      <HomeHowItWorks />
      <HomeIndustries />
      <HomeComparison />
      <HomeSecurity />
      <HomeTestimonials />
      <HomeFAQ />
      <HomeCTA />
      <HomeFooter />
    </div>
  );
}
