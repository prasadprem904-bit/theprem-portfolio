import { AbsoluteFill, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, Img } from "remotion";
import { loadFont } from "@remotion/google-fonts/SpaceGrotesk";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { theme } from "./theme";

const { fontFamily: display } = loadFont("normal", { weights: ["500", "700"], subsets: ["latin"] });
const { fontFamily: body } = loadInter("normal", { weights: ["400", "500"], subsets: ["latin"] });

const logos = ["coreai", "shot", "naamsutra", "sarkari", "calcpro", "businessgrowth", "sip", "tryonix", "buzz"];

export const BrandAd: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scene timing: 0-90 logo reveal, 90-210 tagline, 210-360 product grid, 360-450 outro
  return (
    <AbsoluteFill style={{ background: theme.bg, fontFamily: body }}>
      {/* subtle accent dot bg */}
      <AbsoluteFill style={{ opacity: 0.04 }}>
        <div style={{ position: "absolute", top: -200, right: -200, width: 600, height: 600, borderRadius: "50%", background: theme.accent }} />
        <div style={{ position: "absolute", bottom: -200, left: -200, width: 500, height: 500, borderRadius: "50%", background: theme.accent }} />
      </AbsoluteFill>

      <Sequence from={0} durationInFrames={110}>
        <LogoReveal />
      </Sequence>
      <Sequence from={110} durationInFrames={110}>
        <Tagline />
      </Sequence>
      <Sequence from={220} durationInFrames={150}>
        <ProductGrid logos={logos} />
      </Sequence>
      <Sequence from={370} durationInFrames={80}>
        <Outro />
      </Sequence>

      {/* progress bar */}
      <div style={{ position: "absolute", bottom: 0, left: 0, height: 6, background: theme.accent, width: `${interpolate(frame, [0, 450], [0, 100])}%` }} />
    </AbsoluteFill>
  );
};

const LogoReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 14, stiffness: 120 } });
  const scale = interpolate(s, [0, 1], [0.6, 1]);
  const opacity = interpolate(frame, [0, 20, 90, 110], [0, 1, 1, 0]);
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity }}>
      <div style={{ transform: `scale(${scale})`, textAlign: "center" }}>
        <div style={{ width: 260, height: 260, borderRadius: "50%", overflow: "hidden", margin: "0 auto 30px", border: `4px solid ${theme.accent}`, boxShadow: "0 30px 60px rgba(16,163,127,0.25)" }}>
          <Img src={staticFile("portrait.png")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div style={{ fontFamily: display, fontWeight: 700, fontSize: 96, color: theme.ink, letterSpacing: -3 }}>ThePrem</div>
        <div style={{ fontFamily: body, fontSize: 22, color: theme.muted, letterSpacing: 4, marginTop: 8, textTransform: "uppercase" }}>Prem Prasad</div>
      </div>
    </AbsoluteFill>
  );
};

const Tagline: React.FC = () => {
  const frame = useCurrentFrame();
  const words = ["Building", "Products", "People", "Love."];
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", padding: 80 }}>
      <div style={{ fontFamily: display, fontWeight: 700, fontSize: 110, lineHeight: 1.05, color: theme.ink, letterSpacing: -4, textAlign: "center" }}>
        {words.map((w, i) => {
          const start = i * 10;
          const o = interpolate(frame, [start, start + 12], [0, 1], { extrapolateRight: "clamp" });
          const y = interpolate(frame, [start, start + 20], [40, 0], { extrapolateRight: "clamp" });
          const isLove = w === "Love.";
          return (
            <span key={i} style={{ display: "inline-block", opacity: o, transform: `translateY(${y}px)`, marginRight: 24, color: isLove ? theme.accent : theme.ink }}>
              {w}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const ProductGrid: React.FC<{ logos: string[] }> = ({ logos }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleO = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", padding: 60 }}>
      <div style={{ fontFamily: body, fontSize: 18, color: theme.muted, letterSpacing: 3, textTransform: "uppercase", opacity: titleO, marginBottom: 20 }}>9 Products · All Live</div>
      <div style={{ fontFamily: display, fontWeight: 700, fontSize: 60, color: theme.ink, letterSpacing: -2, opacity: titleO, marginBottom: 40 }}>The Portfolio</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 240px)", gap: 24 }}>
        {logos.map((name, i) => {
          const start = 20 + i * 6;
          const s = spring({ frame: frame - start, fps, config: { damping: 12, stiffness: 140 } });
          return (
            <div key={name} style={{ width: 240, height: 240, background: theme.soft, borderRadius: 24, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${s})`, opacity: s, border: `1px solid ${theme.line}` }}>
              <Img src={staticFile(`logos/${name}.png`)} style={{ width: 140, height: 140, objectFit: "contain" }} />
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 15 } });
  return (
    <AbsoluteFill style={{ background: theme.ink, alignItems: "center", justifyContent: "center", opacity: interpolate(frame, [0, 10], [0, 1]) }}>
      <div style={{ textAlign: "center", transform: `scale(${interpolate(s, [0, 1], [0.9, 1])})` }}>
        <div style={{ fontFamily: display, fontWeight: 700, fontSize: 130, color: "#FFF", letterSpacing: -4 }}>ThePrem</div>
        <div style={{ marginTop: 30, fontFamily: body, fontSize: 26, color: theme.accent, letterSpacing: 2 }}>theprem.vercel.app</div>
      </div>
    </AbsoluteFill>
  );
};