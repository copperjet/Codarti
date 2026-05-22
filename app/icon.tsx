import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
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
          fontSize: 340,
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
