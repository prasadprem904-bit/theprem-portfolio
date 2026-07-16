import { AbsoluteFill, Img, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/google-fonts/SpaceGrotesk";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { theme } from "./theme";

const { fontFamily: display } = loadFont("normal", { weights: ["500", "700"], subsets: ["latin"] });
const { fontFamily: body } = loadInter("normal", { weights: ["400", "500", "600"], subsets: ["latin"] });

const features = [
  { logo: "coreai", title: "CoreAI", desc: "AI chat assistant" },
  { logo: "naamsutra", title: "NaamSutra", desc: "Meaningful names generator" },
  { logo: "calcpro", title: "CalcPro", desc: "Smart calculator suite" },
  { logo: "shot", title: "Shot", desc: "Perfect photo composer" },
];

export const DemoAd: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: theme.soft, fontFamily: body }}>
      <Sequence from={0} durationInFrames={70}>
        <Intro />
      </Sequence>
      {features.map((f, i) => (
        <Sequence key={f.title} from={70 + i * 75} durationInFrames={80}>
          <FeatureCard {...f} />
        </Sequence>
      ))}
      <Sequence from={370} durationInFrames={50}>
        <CTA />
      </Sequence>
    </AbsoluteFill>
  );
};

const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 14 } });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", padding: 80 }}>
      <div style={{ transform: `scale(${s})`, textAlign: "center" }}>
        <div style={{ fontFamily: body, fontSize: 18, color: theme.accent, letterSpacing: 4, textTransform: "uppercase", marginBottom: 20 }}>Product Demo</div>
        <div style={{ fontFamily: display, fontWeight: 700, fontSize: 100, color: theme.ink, letterSpacing: -3, lineHeight: 1.05 }}>See what<br/>we shipped.</div>
      </div>
    </AbsoluteFill>
  );
};

const FeatureCard: React.FC<{ logo: string; title: string; desc: string }> = ({ logo, title, desc }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 16, stiffness: 130 } });
  const x = interpolate(s, [0, 1], [-80, 0]);
  const exitO = interpolate(frame, [60, 80], [1, 0], { extrapolateLeft: "clamp" });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", padding: 60, opacity: exitO }}>
      <div style={{ width: 900, background: "#FFF", borderRadius: 32, padding: 60, boxShadow: "0 40px 80px rgba(0,0,0,0.08)", border: `1px solid ${theme.line}`, transform: `translateX(${x}px)`, opacity: s }}>
        <div style={{ display: "flex", alignItems: "center", gap: 30, marginBottom: 30 }}>
          <div style={{ width: 120, height: 120, borderRadius: 24, background: theme.soft, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Img src={staticFile(`logos/${logo}.png`)} style={{ width: 80, height: 80, objectFit: "contain" }} />
          </div>
          <div>
            <div style={{ fontFamily: display, fontWeight: 700, fontSize: 64, color: theme.ink, letterSpacing: -2 }}>{title}</div>
            <div style={{ fontFamily: body, fontSize: 26, color: theme.muted, marginTop: 4 }}>{desc}</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 30 }}>
          {[0, 1, 2].map((i) => {
            const w = interpolate(frame, [15 + i * 8, 40 + i * 8], [0, 100], { extrapolateRight: "clamp" });
            return <div key={i} style={{ flex: 1, height: 12, background: theme.line, borderRadius: 6, overflow: "hidden" }}>
              <div style={{ width: `${w}%`, height: "100%", background: theme.accent }} />
            </div>;
          })}
        </div>
        <div style={{ marginTop: 24, display: "inline-block", padding: "8px 16px", background: "#DCFCE7", color: "#059669", borderRadius: 999, fontSize: 18, fontWeight: 600 }}>● Live</div>
      </div>
    </AbsoluteFill>
  );
};

const CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 14 } });
  return (
    <AbsoluteFill style={{ background: theme.ink, alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center", transform: `scale(${s})` }}>
        <div style={{ fontFamily: display, fontWeight: 700, fontSize: 90, color: "#FFF", letterSpacing: -3 }}>Try them all.</div>
        <div style={{ marginTop: 20, fontFamily: body, fontSize: 28, color: theme.accent }}>theprem.vercel.app</div>
      </div>
    </AbsoluteFill>
  );
};