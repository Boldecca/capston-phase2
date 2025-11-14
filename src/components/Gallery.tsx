import Image from "next/image";

const images = ["/gallery-1.svg", "/gallery-2.svg", "/gallery-3.svg"] as const;

export default function Gallery() {
  return (
    <section className="py-8 sm:py-10">
      <h2 className="mb-4 text-2xl font-semibold">Featured</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {images.map((src, i) => (
          <div
            key={src}
            className="relative aspect-[4/3] overflow-hidden rounded-md ring-1 ring-border"
          >
            <Image src={src} alt={`Gallery ${i + 1}`} fill className="object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
}
