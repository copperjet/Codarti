import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0F0E14",
          fontSize: 120,
          fontFamily: "Georgia, serif",
        }}
      >
        <span style={{ color: "#FAFAF5" }}>C</span>
        <span style={{ color: "#FF5A1F" }}>.</span>
      </div>
    ),
    size
  );
}
