import MyPosts from "@/components/Dashboard/MyPosts";
import NewPostButton from "@/components/Dashboard/NewPostButton";

export default function PostsPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Your Posts</h1>
        <NewPostButton />
      </div>
      <MyPosts />
    </div>
  );
}
