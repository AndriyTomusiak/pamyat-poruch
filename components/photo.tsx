import Image from "next/image";

export function Photo({
  src,
  alt,
  className,
  priority = false,
  sizes = "(min-width: 1024px) 40vw, 100vw",
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={1200}
      height={900}
      sizes={sizes}
      priority={priority}
      className={className}
    />
  );
}
