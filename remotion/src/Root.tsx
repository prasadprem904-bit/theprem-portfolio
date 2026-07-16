import { Composition } from "remotion";
import { BrandAd } from "./videos/BrandAd";
import { DemoAd } from "./videos/DemoAd";
import { UgcAd } from "./videos/UgcAd";
import { CountdownAd } from "./videos/CountdownAd";
import { ProductDemoAd, ProductDemoProps } from "./videos/ProductDemoAd";

const products: (ProductDemoProps & { id: string })[] = [
  {
    id: "coreai", logo: "coreai", name: "CoreAI", tagline: "Your always-on AI chat assistant.", url: "coreaii.vercel.app",
    features: ["Fast conversational AI", "Context-aware answers", "Clean, distraction-free UI"],
    benefits: ["Save hours every week", "Think & write faster", "Learn anything, instantly"],
  },
  {
    id: "shot", logo: "shot", name: "Shot", tagline: "Compose the perfect photo, every time.", url: "your-perfect-shot-five.vercel.app",
    features: ["Smart composition guides", "Lighting & angle tips", "One-tap camera presets"],
    benefits: ["Shoot like a pro", "Confident framing", "Better memories, always"],
  },
  {
    id: "naamsutra", logo: "naamsutra", name: "NaamSutra", tagline: "Meaningful names, thoughtfully generated.", url: "naamsutra.vercel.app",
    features: ["Cultural name meanings", "Instant suggestions", "Save your favourites"],
    benefits: ["Names with soul", "No more guesswork", "Perfect fit, every time"],
  },
  {
    id: "sarkari", logo: "sarkari", name: "Sarkari Sahayak", tagline: "Your guide to government schemes.", url: "sarkari-sahayak-guide.vercel.app",
    features: ["Curated scheme database", "Eligibility at a glance", "Simple Hindi + English"],
    benefits: ["Never miss a benefit", "Apply with clarity", "Empower every citizen"],
  },
  {
    id: "calcpro", logo: "calcpro", name: "CalcPro", tagline: "A smart calculator suite for daily life.", url: "calcproapp.vercel.app",
    features: ["Scientific + finance tools", "History & memory", "Clean, minimal interface"],
    benefits: ["Solve anything, faster", "One app, every calc", "Zero learning curve"],
  },
  {
    id: "businessgrowth", logo: "businessgrowth", name: "BusinessGrowth", tagline: "Actionable playbooks for founders.", url: "bussinessgrowth.vercel.app",
    features: ["Growth frameworks", "Practical checklists", "Real founder insights"],
    benefits: ["Scale with clarity", "Skip the guesswork", "Ship what matters"],
  },
  {
    id: "sip", logo: "sip", name: "Sip", tagline: "Gentle reminders to stay hydrated.", url: "sipwaterreminder.vercel.app",
    features: ["Personalised schedule", "Non-intrusive nudges", "Daily hydration streaks"],
    benefits: ["Feel more energetic", "Build a healthy habit", "One less thing to forget"],
  },
];

const productCompositions = products.map((p) => (
  <Composition
    key={p.id}
    id={`product-${p.id}`}
    component={ProductDemoAd}
    durationInFrames={360}
    fps={30}
    width={1080}
    height={1080}
    defaultProps={{ logo: p.logo, name: p.name, tagline: p.tagline, url: p.url, features: p.features, benefits: p.benefits }}
  />
));

export const RemotionRoot = () => (
  <>
    <Composition id="brand" component={BrandAd} durationInFrames={450} fps={30} width={1080} height={1080} />
    <Composition id="demo" component={DemoAd} durationInFrames={420} fps={30} width={1080} height={1080} />
    <Composition id="ugc" component={UgcAd} durationInFrames={420} fps={30} width={1080} height={1920} />
    <Composition id="countdown" component={CountdownAd} durationInFrames={330} fps={30} width={1080} height={1080} />
    {productCompositions}
  </>
);