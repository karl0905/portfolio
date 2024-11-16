export function Fileline({ content, type, hexcode }) {
  return (
    <>
      {type === 'dir' ? (
        <p className="text-sm text-[#7394d5]">
          {content}
        </p>
      ) : type === 'file' ? (
        <p className="text-sm text-[#afd7ff]">
          {content}
        </p>
      ) : type === 'misc' ? (
        <p className="text-sm" style={{ color: `#${hexcode}` }}>
          {content}
        </p>
      ) : null}
    </>
  );
}
