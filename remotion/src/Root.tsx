import { Composition } from "remotion";
import { BrandAd } from "./videos/BrandAd";
import { DemoAd } from "./videos/DemoAd";
import { UgcAd } from "./videos/UgcAd";
import { CountdownAd } from "./videos/CountdownAd";

export const RemotionRoot = () => (
  <>
    <Composition id="brand" component={BrandAd} durationInFrames={450} fps={30} width={1080} height={1080} />
    <Composition id="demo" component={DemoAd} durationInFrames={420} fps={30} width={1080} height={1080} />
    <Composition id="ugc" component={UgcAd} durationInFrames={420} fps={30} width={1080} height={1920} />
    <Composition id="countdown" component={CountdownAd} durationInFrames={330} fps={30} width={1080} height={1080} />
  </>
);