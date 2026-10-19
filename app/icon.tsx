import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f3eadc",
        }}
      >
        <div style={{ width: 14, height: 14, borderRadius: 7, background: "#6b4630" }} />
      </div>
    ),
    { ...size },
  );
}
