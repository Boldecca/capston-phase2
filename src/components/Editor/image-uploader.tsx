"use client";

import React, { useCallback, useMemo, useRef, useState } from "react";
import { CLOUDINARY_UPLOAD_PRESET, getCloudinaryUploadUrl } from "@/lib/cloudinary";

type UploadedImage = {
  url: string;
  public_id?: string;
  width?: number;
  height?: number;
};

export default function ImageUploader() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [uploads, setUploads] = useState<UploadedImage[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canUpload = useMemo(() => files.length > 0 && !isUploading, [files.length, isUploading]);

  const onPick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const onFiles = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const list = e.target.files;
    if (!list || list.length === 0) return;
    const newFiles = Array.from(list).filter((f) => f.type.startsWith("image/"));
    setFiles((prev) => [...prev, ...newFiles]);
    const newPreviews = newFiles.map((f) => URL.createObjectURL(f));
    setPreviews((prev) => [...prev, ...newPreviews]);
    e.target.value = ""; // allow re-selecting same file
  }, []);

  const removeAt = useCallback((idx: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
    setPreviews((prev) => prev.filter((_, i) => i !== idx));
  }, []);

  const uploadAll = useCallback(async () => {
    if (!CLOUDINARY_UPLOAD_PRESET) {
      setError("Cloudinary preset missing. Set NEXT_PUBLIC_CLOUDINARY_PRESET.");
      return;
    }
    setError(null);
    setIsUploading(true);
    try {
      const uploaded: UploadedImage[] = [];
      for (const f of files) {
        const form = new FormData();
        form.append("file", f);
        form.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
        const res = await fetch(getCloudinaryUploadUrl(), { method: "POST", body: form });
        if (!res.ok) throw new Error(`Upload failed (${res.status})`);
        const data = await res.json();
        uploaded.push({ url: data.secure_url, public_id: data.public_id, width: data.width, height: data.height });
      }
      setUploads((prev) => [...prev, ...uploaded]);
      setFiles([]);
      setPreviews([]);
    } catch (e: any) {
      setError(e?.message ?? "Upload failed");
    } finally {
      setIsUploading(false);
    }
  }, [files]);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">Upload images for your post</div>
        <div className="flex items-center gap-2">
          <button onClick={onPick} className="inline-flex items-center rounded-lg border px-3 py-1.5 text-sm transition-colors hover:bg-muted/60">
            Choose files
          </button>
          <button onClick={uploadAll} disabled={!canUpload} className="inline-flex items-center rounded-lg bg-primary px-3 py-1.5 text-sm text-primary-foreground transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow">
            {isUploading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>
      <input ref={inputRef} type="file" accept="image/*" multiple className="hidden" onChange={onFiles} />

      {error && <div className="text-sm text-destructive">{error}</div>}

      {previews.length > 0 && (
        <div>
          <div className="mb-2 text-xs text-muted-foreground">Selected</div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {previews.map((src, i) => (
              <div key={src} className="relative group overflow-hidden rounded-lg border bg-background/50">
                <img src={src} alt="preview" className="h-32 w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                <button onClick={() => removeAt(i)} className="absolute top-2 right-2 rounded-md bg-background/80 px-2 py-1 text-xs shadow hover:bg-background">
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {uploads.length > 0 && (
        <div>
          <div className="mb-2 text-xs text-muted-foreground">Uploaded</div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {uploads.map((u) => (
              <a key={u.url} href={u.url} target="_blank" rel="noreferrer" className="block overflow-hidden rounded-lg border bg-background/50">
                <img src={u.url} alt="uploaded" className="h-32 w-full object-cover transition-transform duration-300 hover:scale-105" />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
