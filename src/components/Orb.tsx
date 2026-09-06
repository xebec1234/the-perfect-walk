export function Orb({
  size = "large",
  pulse = false,
}: {
  size?: "small" | "large";
  pulse?: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className={`orb orb-${size}${pulse ? " orb-pulse" : ""}`}
    />
  );
}