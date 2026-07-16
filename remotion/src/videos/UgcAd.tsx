import { AbsoluteFill, Img, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/google-fonts/SpaceGrotesk";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { theme } from "./theme";

const { fontFamily: display } = loadFont("normal", { weights: ["500", "700"], subsets: ["latin"] });
const { fontFamily: body } = loadInter("normal", { weights: ["400", "500", "600"], subsets: ["latin"] });

// Vertical 9:16 UGC-style testimonial
export const UgcAd: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: theme.bg, fontFamily: body, padding: 60 }}>
      {/* portrait as top card */}
      <div style={{ flex: 1, borderRadius: 40, background: theme.soft, overflow: "hidden", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Img src={staticFile("portrait.png")} style={{ width: "80%", objectFit: "contain", transform: `scale(${interpolate(frame, [0, 420], [1, 1.08])})` }} />
        <div style={{ position: "absolute", top: 40, left: 40, background: "#FFF", padding: "12px 20px", borderRadius: 999, fontSize: 22, fontWeight: 600, boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}>
          <span style={{ color: theme.accent }}>●</span> Founder, ThePrem
        </div>
      </div>

      {/* Captions */}
      <div style={{ height: 900, paddingTop: 60, display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "center" }}>
        <Sequence from={0} durationInFrames={110}>
          <Caption text="I shipped 9 apps" accent="9 apps" />
        </Sequence>
        <Sequence from={110} durationInFrames={110}>
          <Caption text="as a solo builder" accent="solo" />
        </Sequence>
        <Sequence from={220} durationInFrames={110}>
          <Caption text="with real users." accent="real users" />
        </Sequence>
        <Sequence from={330} durationInFrames={90}>
          <FinalCTA />
        </Sequence>
      </div>
    </AbsoluteFill>
  );
};

const Caption: React.FC<{ text: string; accent: string }> = ({ text, accent }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 14 } });
  const parts = text.split(accent);
  return (
    <div style={{ textAlign: "center", padding: "0 40px", transform: `scale(${interpolate(s, [0, 1], [0.85, 1])})`, opacity: interpolate(frame, [0, 10, 90, 110], [0, 1, 1, 0]) }}>
      <div style={{ fontFamily: display, fontWeight: 700, fontSize: 120, lineHeight: 1.05, color: theme.ink, letterSpacing: -4 }}>
        {parts[0]}
        <span style={{ background: theme.accent, color: "#FFF", padding: "0 20px", borderRadius: 16, display: "inline-block" }}>{accent}</span>
        {parts[1]}
      </div>
    </div>
  );
};

const FinalCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 14 } });
  return (
    <div style={{ textAlign: "center", transform: `scale(${s})` }}>
      <div style={{ fontFamily: body, fontSize: 30, color: theme.muted, marginBottom: 20 }}>See the portfolio →</div>
      <div style={{ display: "inline-block", background: theme.ink, color: "#FFF", padding: "24px 48px", borderRadius: 999, fontFamily: display, fontWeight: 700, fontSize: 44 }}>
        theprem.vercel.app
      </div>
    </div>
  );
};
