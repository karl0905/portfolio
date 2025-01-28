"use client";
import {
  useContentStore,
  colorizeString,
  colorizeSnippet,
} from '@/global';

export function MainContent() {
  const { mainContent, snippet, snippetFileType } = useContentStore();
  const contentDescription = mainContent?.content;

  return (
    <div className="flex flex-col px-4 pt-10 overflow-x-hidden overflow-y-auto w-full gap-12">
      <div>
        {contentDescription?.map((str, index) => (
          <p
            key={index}
            className="text-md py-2"
            dangerouslySetInnerHTML={{ __html: colorizeString(str) }}
          />
        ))}
      </div>
      {snippet && (
        <pre className="text-sm py-4 border border-grey-400 p-4">
          <code dangerouslySetInnerHTML={{ __html: colorizeSnippet(snippet, snippetFileType) }} />
        </pre>
      )}
    </div>
  );
}
