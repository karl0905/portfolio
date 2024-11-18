export function Fileline({ content, type, hexcode }) {
  return (
    <>
      {type === 'dir' ? (
        <p className="text-md text-[#7394d5]">
          {content}
        </p>
      ) : type === 'file' ? (
        <p className="text-md text-[#afd7ff]">
          {content}
        </p>
      ) : type === 'misc' ? (
        <p className="text-md" style={{ color: `#${hexcode}` }}>
          {content}
        </p>
      ) : null}
    </>
  );
}
