const PAPER = "#f7f3ea";
const PAPER_2 = "#ebe6d8";
const INK = "#1b1d12";
const MUTE = "#6b6d5f";
const LINE = "rgba(27,29,18,.12)";
const ACCENT = "#3a5a2e";
const ACCENT_2 = "#c8a24a";
const DANGER = "#a9432a";

const pins: Array<{ left: string; top: string; kind: "red" | "green" | "gold" }> = [
  { left: "42%", top: "52%", kind: "red" },
  { left: "38%", top: "65%", kind: "red" },
  { left: "48%", top: "44%", kind: "green" },
  { left: "55%", top: "58%", kind: "red" },
  { left: "46%", top: "72%", kind: "gold" },
  { left: "34%", top: "42%", kind: "red" },
  { left: "52%", top: "35%", kind: "green" },
  { left: "30%", top: "76%", kind: "red" },
  { left: "58%", top: "48%", kind: "gold" },
  { left: "42%", top: "30%", kind: "green" },
];

const pinColor = (kind: "red" | "green" | "gold") =>
  kind === "green" ? ACCENT : kind === "gold" ? ACCENT_2 : DANGER;

export const MeldpuntMapPreview = () => {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        paddingBottom: "64.86161251504213%",
        background: `linear-gradient(180deg, #fbf8f0, ${PAPER_2})`,
        color: INK,
      }}
    >
      {/* Browser chrome */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "6px 10px",
          borderBottom: `1px solid ${LINE}`,
          background: "rgba(255,255,255,.5)",
          fontSize: 9,
          color: MUTE,
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          letterSpacing: "0.02em",
          zIndex: 2,
        }}
      >
        <span style={{ display: "flex", gap: 3 }}>
          <i style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(27,29,18,.18)", display: "block" }} />
          <i style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(27,29,18,.18)", display: "block" }} />
          <i style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(27,29,18,.18)", display: "block" }} />
        </span>
        <span style={{ marginLeft: 6 }}>meldpuntaziatischehoornaar.nl/kaart</span>
      </div>

      {/* Map body */}
      <div style={{ position: "absolute", inset: "24px 0 0 0" }}>
        {/* Contour / topography pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: [
              "repeating-linear-gradient(45deg, transparent 0 18px, rgba(27,29,18,.035) 18px 19px)",
              "repeating-linear-gradient(-20deg, transparent 0 56px, rgba(27,29,18,.04) 56px 57px)",
              "radial-gradient(ellipse at 70% 40%, rgba(58,90,46,.08), transparent 60%)",
              "radial-gradient(ellipse at 30% 70%, rgba(200,162,74,.12), transparent 55%)",
            ].join(","),
          }}
        />

        {/* NL silhouette */}
        <svg
          viewBox="0 0 200 260"
          fill="none"
          stroke={INK}
          strokeWidth={1.2}
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%,-50%)",
            width: "42%",
            opacity: 0.18,
          }}
        >
          <path d="M60 20 L95 12 L130 22 L150 40 L165 70 L175 110 L170 140 L180 170 L165 205 L140 235 L110 245 L70 240 L45 220 L30 185 L25 150 L35 115 L30 80 L40 50 Z" />
        </svg>

        {/* Pins */}
        {pins.map((p, i) => {
          const color = pinColor(p.kind);
          const shadowRgb =
            p.kind === "green"
              ? "58,90,46"
              : p.kind === "gold"
              ? "200,162,74"
              : "169,67,42";
          return (
            <span
              key={i}
              style={{
                position: "absolute",
                left: p.left,
                top: p.top,
                transform: "translate(-50%,-100%)",
                width: 9,
                height: 9,
                borderRadius: "50%",
                background: color,
                boxShadow: `0 0 0 3px rgba(${shadowRgb},.18), 0 1px 3px rgba(0,0,0,.2)`,
              }}
            />
          );
        })}

        {/* Live feed overlay */}
        <div
          style={{
            position: "absolute",
            right: "4%",
            top: "8%",
            background: "rgba(255,253,247,.94)",
            border: `1px solid ${LINE}`,
            backdropFilter: "blur(4px)",
            borderRadius: 8,
            padding: "8px 10px",
            minWidth: "32%",
            fontSize: 9,
            lineHeight: 1.3,
            color: INK,
          }}
        >
          <div
            style={{
              fontSize: 8,
              color: MUTE,
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: 5,
            }}
          >
            Live feed
          </div>
          {[
            ["Nieuwe meldingen (24u)", "37"],
            ["In behandeling", "82"],
            ["Nesten verwijderd", "412"],
            ["Actieve bestrijders", "68"],
          ].map(([label, val], i, arr) => (
            <div
              key={label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 8,
                padding: "2px 0",
                borderBottom:
                  i === arr.length - 1 ? "none" : `1px dashed ${LINE}`,
                fontSize: 9,
              }}
            >
              <span style={{ color: MUTE }}>{label}</span>
              <span style={{ fontWeight: 500 }}>{val}</span>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div
          style={{
            position: "absolute",
            left: "4%",
            bottom: "6%",
            background: "rgba(255,253,247,.92)",
            border: `1px solid ${LINE}`,
            borderRadius: 6,
            padding: "5px 7px",
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            fontSize: 8,
            letterSpacing: "0.04em",
            color: INK,
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          {[
            { c: DANGER, label: "Open" },
            { c: ACCENT, label: "Gevalideerd" },
            { c: ACCENT_2, label: "Val" },
          ].map((l) => (
            <span key={l.label} style={{ display: "flex", gap: 5, alignItems: "center" }}>
              <i
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: l.c,
                  display: "block",
                }}
              />
              {l.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
