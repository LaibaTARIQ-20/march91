type ArticleBodyProps = {
  body: string[];
};

export default function ArticleBody({ body }: ArticleBodyProps) {
  return (
    <div className="max-w-2xl mx-auto font-body text-lg leading-8 text-ink space-y-6">
      {body.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
    </div>
  );
}
