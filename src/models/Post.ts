import mongoose from "@/lib/mongodb";

const { Schema } = mongoose;

const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true }, // markdown or HTML
    excerpt: { type: String },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    tags: [String],
    published: { type: Boolean, default: false },
    coverImage: { type: String },
    claps: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Post || mongoose.model("Post", PostSchema);