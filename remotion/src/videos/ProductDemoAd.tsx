import { AbsoluteFill, Img, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/google-fonts/SpaceGrotesk";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { theme } from "./theme";

const { fontFamily: display } = loadFont("normal", { weights: ["500", "700"], subsets: ["latin"] });
const { fontFamily: body } = loadInter("normal", { weights: ["400", "500", "600"], subsets: ["latin"] });

export type ProductDemoProps = {
  logo: string;
  name: string;
  tagline: string;
  url: string;
  features: string[]; // 3 features
  benefits: string[]; // 3 benefits
  accent?: string;
};

export const ProductDemoAd: React.FC<ProductDemoProps> = ({ logo, name, tagline, url, features, benefits, accent = theme.accent }) => {
  return (
    <AbsoluteFill style={{ background: theme.soft, fontFamily: body }}>
      <BackdropGradient accent={accent} />
      <Sequence from={0} durationInFrames={70}>
        <Intro logo={logo} name={name} tagline={tagline} accent={accent} />
      </Sequence>
      <Sequence from={70} durationInFrames={110}>
        <FeatureList title="Features" items={features} accent={accent} logo={logo} name={name} />
      </Sequence>
      <Sequence from={180} durationInFrames={110}>
        <FeatureList title="Benefits" items={benefits} accent={accent} logo={logo} name={name} />
      </Sequence>
      <Sequence from={290} durationInFrames={70}>
        <CTA name={name} url={url} accent={accent} logo={logo} />
      </Sequence>
    </AbsoluteFill>
  );
};

const BackdropGradient: React.FC<{ accent: string }> = ({ accent }) => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [0, 360], [0, 1]);
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at ${20 + t * 60}% ${30 + t * 40}%, ${accent}18, transparent 60%), ${theme.soft}`,
      }}
    />
  );
};

const LiveBadge: React.FC<{ accent: string }> = ({ accent }) => (
  <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px", background: "#DCFCE7", color: "#059669", borderRadius: 999, fontSize: 18, fontWeight: 600 }}>
    <span style={{ width: 8, height: 8, borderRadius: 999, background: accent }} /> Live
  </div>
);

const Intro: React.FC<{ logo: string; name: string; tagline: string; accent: string }> = ({ logo, name, tagline, accent }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 14 } });
  const y = interpolate(s, [0, 1], [40, 0]);
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", padding: 80 }}>
      <div style={{ textAlign: "center", transform: `translateY(${y}px)`, opacity: s }}>
        <div style={{ width: 200, height: 200, borderRadius: 44, background: "#FFF", boxShadow: "0 30px 60px rgba(0,0,0,0.08)", border: `1px solid ${theme.line}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 32px" }}>
          <Img src={staticFile(`logos/${logo}.png`)} style={{ width: 140, height: 140, objectFit: "contain" }} />
        </div>
        <div style={{ fontFamily: body, fontSize: 16, color: accent, letterSpacing: 4, textTransform: "uppercase", marginBottom: 12 }}>Product Demo</div>
        <div style={{ fontFamily: display, fontWeight: 700, fontSize: 110, color: theme.ink, letterSpacing: -3, lineHeight: 1 }}>{name}</div>
        <div style={{ marginTop: 16, fontFamily: body, fontSize: 28, color: theme.muted, maxWidth: 800 }}>{tagline}</div>
      </div>
    </AbsoluteFill>
  );
};

const Header: React.FC<{ logo: string; name: string; accent: string }> = ({ logo, name, accent }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
    <div style={{ width: 60, height: 60, borderRadius: 14, background: "#FFF", border: `1px solid ${theme.line}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Img src={staticFile(`logos/${logo}.png`)} style={{ width: 40, height: 40, objectFit: "contain" }} />
    </div>
    <div style={{ fontFamily: display, fontWeight: 700, fontSize: 32, color: theme.ink, letterSpacing: -1 }}>{name}</div>
    <div style={{ marginLeft: "auto" }}><LiveBadge accent={accent} /></div>
  </div>
);

const FeatureList: React.FC<{ title: string; items: string[]; accent: string; logo: string; name: string }> = ({ title, items, accent, logo, name }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cardS = spring({ frame, fps, config: { damping: 18 } });
  const exitO = interpolate(frame, [95, 110], [1, 0], { extrapolateLeft: "clamp" });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", padding: 60, opacity: exitO }}>
      <div style={{ width: 940, background: "#FFF", borderRadius: 32, padding: 50, boxShadow: "0 40px 80px rgba(0,0,0,0.08)", border: `1px solid ${theme.line}`, transform: `scale(${interpolate(cardS, [0, 1], [0.94, 1])})`, opacity: cardS }}>
        <Header logo={logo} name={name} accent={accent} />
        <div style={{ marginTop: 32, fontFamily: body, fontSize: 20, color: accent, letterSpacing: 3, textTransform: "uppercase", fontWeight: 600 }}>{title}</div>
        <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 20 }}>
          {items.map((item, i) => {
            const start = 12 + i * 14;
            const s = spring({ frame: frame - start, fps, config: { damping: 16 } });
            const x = interpolate(s, [0, 1], [-40, 0]);
            const w = interpolate(frame, [start + 6, start + 40], [0, 100], { extrapolateRight: "clamp" });
            return (
              <div key={i} style={{ opacity: s, transform: `translateX(${x}px)` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 999, background: accent, color: "#FFF", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: display, fontWeight: 700, fontSize: 20 }}>{i + 1}</div>
                  <div style={{ fontFamily: display, fontWeight: 500, fontSize: 34, color: theme.ink, letterSpacing: -0.5 }}>{item}</div>
                </div>
                <div style={{ marginLeft: 56, marginTop: 10, height: 6, background: theme.line, borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ width: `${w}%`, height: "100%", background: accent }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const CTA: React.FC<{ name: string; url: string; accent: string; logo: string }> = ({ name, url, accent, logo }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 14 } });
  const pulse = 1 + Math.sin(frame / 8) * 0.02;
  return (
    <AbsoluteFill style={{ background: theme.ink, alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
      <div style={{ position: "absolute", width: 800, height: 800, borderRadius: 999, background: `radial-gradient(circle, ${accent}40, transparent 60%)`, transform: `scale(${pulse})` }} />
      <div style={{ textAlign: "center", transform: `scale(${s})`, position: "relative" }}>
        <div style={{ width: 140, height: 140, borderRadius: 32, background: "#FFF", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
          <Img src={staticFile(`logos/${logo}.png`)} style={{ width: 100, height: 100, objectFit: "contain" }} />
        </div>
        <div style={{ fontFamily: display, fontWeight: 700, fontSize: 90, color: "#FFF", letterSpacing: -3 }}>Try {name}.</div>
        <div style={{ marginTop: 16, fontFamily: body, fontSize: 26, color: accent, wordBreak: "break-all", padding: "0 60px" }}>{url}</div>
      </div>
    </AbsoluteFill>
  );
};