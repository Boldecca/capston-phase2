"use client";

interface Comment {
  id: string;
  author: string;
  post: string;
  text: string;
  date: string;
}

export default function Comments() {
  const comments: Comment[] = [
    {
      id: "1",
      author: "Alice Smith",
      post: "A Journey into Next.js",
      text: "Great article! Very helpful.",
      date: "Apr 21, 2024",
    },
    {
      id: "2",
      author: "Bob Johnson",
      post: "Understanding React Hooks",
      text: "This clarified a lot of confusion I had.",
      date: "Apr 19, 2024",
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Comments</h1>
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Author</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Post</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Comment</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment) => (
              <tr key={comment.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-gray-900 font-medium">{comment.author}</td>
                <td className="px-6 py-4 text-gray-900">{comment.post}</td>
                <td className="px-6 py-4 text-gray-600 text-sm line-clamp-2">{comment.text}</td>
                <td className="px-6 py-4 text-gray-600 text-sm">{comment.date}</td>
                <td className="px-6 py-4 text-sm">
                  <button className="text-red-600 hover:text-red-800 font-medium">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}