import { Post } from "@/types";
import { getPgPool } from "./db";

const selectColumns =
  "id, title, slug, content, tags, cover_image, state, author_id, created_at, updated_at";

function mapPost(row: any): Post {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    content: row.content,
    coverImage: row.cover_image ?? undefined,
    tags: row.tags ?? [],
    author: {
      id: row.author_id ?? "anonymous",
      name: "Unknown Author",
      email: "",
    },
    status: row.state,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function getPublishedPosts(): Promise<Post[]> {
  const pool = getPgPool();
  const { rows } = await pool.query(
    `select ${selectColumns} from posts where state = $1 order by created_at desc`,
    ["published"]
  );
  return rows.map(mapPost);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const pool = getPgPool();
  const { rows } = await pool.query(
    `select ${selectColumns} from posts where slug = $1 limit 1`,
    [slug]
  );
  return rows[0] ? mapPost(rows[0]) : null;
}

export async function createPostRecord(input: {
  title: string;
  content: string;
  tags: string[];
  coverImage?: string;
  state: "draft" | "published";
  authorId?: string | null;
  slug: string;
}) {
  const pool = getPgPool();
  const { rows } = await pool.query(
    `insert into posts (title, content, tags, cover_image, state, author_id, slug)
     values ($1, $2, $3, $4, $5, $6, $7)
     returning ${selectColumns}`,
    [
      input.title,
      input.content,
      input.tags,
      input.coverImage ?? null,
      input.state,
      input.authorId ?? null,
      input.slug,
    ]
  );
  return mapPost(rows[0]);
}

export async function updatePostBySlug(
  slug: string,
  patch: Partial<{
    title: string;
    content: string;
    tags: string[];
    coverImage?: string;
    state: "draft" | "published";
  }>
) {
  const pool = getPgPool();
  const fields: string[] = [];
  const values: any[] = [];
  let index = 1;

  if (patch.title) {
    fields.push(`title = $${index++}`);
    values.push(patch.title);
  }
  if (patch.content) {
    fields.push(`content = $${index++}`);
    values.push(patch.content);
  }
  if (patch.tags) {
    fields.push(`tags = $${index++}`);
    values.push(patch.tags);
  }
  if (patch.coverImage !== undefined) {
    fields.push(`cover_image = $${index++}`);
    values.push(patch.coverImage ?? null);
  }
  if (patch.state) {
    fields.push(`state = $${index++}`);
    values.push(patch.state);
  }

  if (!fields.length) {
    return getPostBySlug(slug);
  }

  values.push(slug);

  const { rows } = await pool.query(
    `update posts set ${fields.join(", ")} where slug = $${index} returning ${selectColumns}`,
    values
  );
  return rows[0] ? mapPost(rows[0]) : null;
}

export async function deletePostBySlug(slug: string) {
  const pool = getPgPool();
  await pool.query(`delete from posts where slug = $1`, [slug]);
}

export async function ensureUniqueSlug(base: string) {
  const normalizedBase = slugify(base || "post");
  const pool = getPgPool();
  let currentSlug = normalizedBase;
  let suffix = 1;

  while (true) {
    const { rows } = await pool.query(`select id from posts where slug = $1 limit 1`, [currentSlug]);
    if (rows.length === 0) {
      return currentSlug;
    }
    currentSlug = `${normalizedBase}-${suffix++}`;
  }
}

function slugify(value: string) {
  return (
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .replace(/-{2,}/g, "-")
      .slice(0, 80) || `post-${Date.now()}`
  );
}

