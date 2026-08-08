import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ARC Transformation Group — We build operational intelligence.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0b1220",
          color: "#f1f5f9",
          padding: 72,
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 48,
              height: 48,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#f8fafc",
              color: "#0b1220",
              fontSize: 24,
              fontWeight: 700,
              borderRadius: 10,
            }}
          >
            A
          </div>
          <div style={{ fontSize: 28, fontWeight: 600 }}>
            ARC Transformation Group
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 64, fontWeight: 600, lineHeight: 1.1, maxWidth: 900 }}>
            We build operational intelligence.
          </div>
          <div style={{ fontSize: 28, color: "#94a3b8", maxWidth: 820 }}>
            Labs · Studio · Platform · Intelligence · Academy
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
