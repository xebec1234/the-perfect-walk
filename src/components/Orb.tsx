export function Orb({ size = "large" }: { size?: "small" | "large" }) {
  return <div aria-hidden="true" className={`orb orb-${size}`} />;
}
