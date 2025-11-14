type Props = { src?: string; alt?: string; size?: number };

export default function Avatar({ src, alt = "", size = 36 }: Props) {
  const s = { width: size, height: size } as const;
  return (
    <div
      className="inline-flex items-center justify-center overflow-hidden rounded-full bg-zinc-200 text-zinc-600"
      style={s}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} width={size} height={size} />
      ) : (
        <span className="text-xs">NA</span>
      )}
    </div>
  );
}
