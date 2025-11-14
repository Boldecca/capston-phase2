type Comment = {
  id: string;
  author: string;
  content: string;
  children?: Comment[];
};

type Props = {
  comments: Comment[];
};

export default function CommentTree({ comments }: Props) {
  const render = (nodes: Comment[]) => (
    <ul className="space-y-3">
      {nodes.map((c) => (
        <li key={c.id}>
          <div className="rounded border p-3">
            <div className="text-sm font-medium">{c.author}</div>
            <div className="text-sm text-muted-foreground">{c.content}</div>
          </div>
          {c.children && c.children.length > 0 && (
            <div className="ml-4 mt-2 border-l pl-4">{render(c.children)}</div>
          )}
        </li>
      ))}
    </ul>
  );
  return <div>{render(comments)}</div>;
}
