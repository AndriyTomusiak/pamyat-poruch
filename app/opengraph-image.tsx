import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

export const alt = "Пам’ять поруч — догляд за місцем поховання у Хмельницькому";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const font = await readFile(join(process.cwd(), "assets/fonts/Manrope-SemiBold.ttf"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f3eadc",
          color: "#2a2218",
          padding: "72px",
          fontFamily: "Manrope",
        }}
      >
        <div style={{ width: 96, height: 8, background: "#6b4630" }} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, lineHeight: 1.05, color: "#6b4630" }}>Пам’ять поруч</div>
          <div style={{ marginTop: 24, fontSize: 36, lineHeight: 1.3 }}>Хмельницький і громада</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Manrope", data: font, weight: 600, style: "normal" }],
    },
  );
}
