import { cn } from "@/lib/cn";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "main" | "header" | "footer";
  id?: string;
};

/**
 * Centered layout container — max-w 1200px, 16px on mobile, 24px on tablet, 48px on desktop.
 */
export default function Container({
  children,
  className,
  as: Tag = "div",
  id,
}: ContainerProps) {
  return (
    <Tag id={id} className={cn("mx-auto w-full max-w-[1200px] px-4 sm:px-6 desk:px-12", className)}>
      {children}
    </Tag>
  );
}
