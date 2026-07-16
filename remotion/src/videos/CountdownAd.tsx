import { AbsoluteFill, Img, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/google-fonts/SpaceGrotesk";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { theme } from "./theme";

const { fontFamily: display } = loadFont("normal", { weights: ["500", "700"], subsets: ["latin"] });
const { fontFamily: body } = loadInter("normal", { weights: ["400", "500"], subsets: ["latin"] });

export const CountdownAd: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: theme.ink, fontFamily: body }}>
      <Sequence from={0} durationInFrames={60}>
        <Intro />
      </Sequence>
      {[5, 4, 3, 2, 1].map((n, i) => (
        <Sequence key={n} from={60 + i * 40} durationInFrames={40}>
          <Beat n={n} />
        </Sequence>
      ))}
      <Sequence from={260} durationInFrames={70}>
        <Reveal />
      </Sequence>
    </AbsoluteFill>
  );
};

const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [0, 15, 45, 60], [0, 1, 1, 0]);
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity: o }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontFamily: body, fontSize: 24, color: theme.accent, letterSpacing: 6, textTransform: "uppercase", marginBottom: 20 }}>Launching In</div>
        <div style={{ fontFamily: display, fontWeight: 700, fontSize: 80, color: "#FFF", letterSpacing: -2 }}>Get ready.</div>
      </div>
    </AbsoluteFill>
  );
};

const Beat: React.FC<{ n: number }> = ({ n }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 10, stiffness: 180 } });
  const scale = interpolate(s, [0, 1], [2.5, 1]);
  const o = interpolate(frame, [0, 6, 30, 40], [0, 1, 1, 0]);
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", border: `4px solid ${theme.accent}`, opacity: interpolate(frame, [0, 30], [0.6, 0]), transform: `scale(${interpolate(frame, [0, 30], [0.6, 1.6])})` }} />
      <div style={{ fontFamily: display, fontWeight: 700, fontSize: 500, color: "#FFF", lineHeight: 1, transform: `scale(${scale})`, opacity: o, letterSpacing: -20 }}>
        {n}
      </div>
    </AbsoluteFill>
  );
};

const Reveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 12, stiffness: 120 } });
  return (
    <AbsoluteFill style={{ background: "#FFF", alignItems: "center", justifyContent: "center", opacity: interpolate(frame, [0, 8], [0, 1]) }}>
      <div style={{ textAlign: "center", transform: `scale(${s})` }}>
        <div style={{ width: 240, height: 240, borderRadius: "50%", overflow: "hidden", margin: "0 auto 30px", border: `4px solid ${theme.accent}` }}>
          <Img src={staticFile("portrait.png")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div style={{ fontFamily: display, fontWeight: 700, fontSize: 120, color: theme.ink, letterSpacing: -4 }}>ThePrem</div>
        <div style={{ marginTop: 20, fontFamily: body, fontSize: 28, color: theme.accent, letterSpacing: 2 }}>NOW LIVE · theprem.vercel.app</div>
      </div>
    </AbsoluteFill>
  );
};