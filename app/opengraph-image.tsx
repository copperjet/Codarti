import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Codarti — Software, made with intent.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background:
            "radial-gradient(circle at 80% 20%, #C8FF3D33 0%, transparent 50%), radial-gradient(circle at 10% 90%, #6B4FE844 0%, transparent 55%), #FAFAF5",
          color: "#0F0E14",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 24,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#3D3A45",
          }}
        >
          <span>Codarti</span>
          <span>A software craft studio · Lusaka</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 132,
              lineHeight: 1.02,
              letterSpacing: -3,
              fontWeight: 400,
              maxWidth: 1040,
              display: "flex",
            }}
          >
            Software, made with intent
            <span style={{ color: "#C8FF3D" }}>.</span>
          </div>
          <div style={{ fontSize: 32, color: "#3D3A45", maxWidth: 900 }}>
            Engineering, design, and strategy for teams who care about the
            details.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "#3D3A45",
            fontSize: 22,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          <span>codarti.com</span>
          <span>Est. 2019</span>
        </div>
      </div>
    ),
    size
  );
}
