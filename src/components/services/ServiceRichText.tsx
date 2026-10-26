import Link from "next/link";
import type { ServiceTextSegment } from "@/content/services/types";

export function ServiceRichText({ segments }: { segments: ServiceTextSegment[] }) {
  return (
    <>
      {segments.map((segment, index) => {
        if (segment.type === "text") {
          return <span key={index}>{segment.value}</span>;
        }
        if (segment.external) {
          return (
            <a
              key={index}
              href={segment.href}
              className="text-primary hover:text-accent transition-colors duration-300 underline-offset-2 hover:underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              {segment.value}
            </a>
          );
        }
        return (
          <Link
            key={index}
            href={segment.href}
            className="text-primary hover:text-accent transition-colors duration-300 underline-offset-2 hover:underline"
          >
            {segment.value}
          </Link>
        );
      })}
    </>
  );
}
