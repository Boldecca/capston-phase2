import Image from "next/image";

type Props = { src?: string; alt?: string; size?: number };

export default function Avatar({ src, alt = "", size = 36 }: Props) {
  const s = { width: size, height: size } as const;
  return (
    <div
      className="relative inline-flex items-center justify-center overflow-hidden rounded-full bg-zinc-200 text-zinc-600"
      style={s}
    >
      {src ? (
        <Image src={src} alt={alt} fill sizes={`${size}px`} className="object-cover" />
      ) : (
        <span className="text-xs">NA</span>
      )}
    </div>
  );
}
