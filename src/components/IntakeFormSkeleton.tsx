export default function IntakeFormSkeleton() {
  return (
    <div
      className="w-full rounded-sm border border-lavender/20 bg-white/50 p-6 sm:p-8 animate-pulse"
      aria-hidden
    >
      <div className="h-4 bg-lavender/20 rounded w-1/3 mb-6" />
      <div className="space-y-4">
        <div className="h-10 bg-lavender/15 rounded-sm" />
        <div className="h-10 bg-lavender/15 rounded-sm" />
        <div className="h-10 bg-lavender/15 rounded-sm" />
        <div className="h-24 bg-lavender/15 rounded-sm" />
        <div className="h-11 bg-accent/30 rounded-sm" />
      </div>
    </div>
  );
}
