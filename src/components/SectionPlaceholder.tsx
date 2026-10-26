type SectionPlaceholderProps = {
  className?: string;
};

export default function SectionPlaceholder({
  className = "min-h-[240px] bg-background",
}: SectionPlaceholderProps) {
  return <div className={className} aria-hidden />;
}
