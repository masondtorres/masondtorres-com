import { ImageResponse } from "next/og";

export const alt = "Mason Torres — Books, Projects & Resources";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 84px",
          color: "#ffffff",
          background: "#1d2922",
          fontFamily: "Arial, Helvetica, sans-serif"
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "#c9d8ce" }}>
            Mason Torres
          </div>
          <div style={{ maxWidth: 980, fontSize: 72, lineHeight: 1.05, fontWeight: 700 }}>
            Books, Projects & Resources
          </div>
        </div>
        <div style={{ fontSize: 30, color: "#d7e1da" }}>
          masondtorres.com
        </div>
      </div>
    ),
    size
  );
}
