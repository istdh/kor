import {
  NodeRendererType,
  RichText,
  RichTextProps,
} from "@graphcms/rich-text-react-renderer";
import React from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
} from 'next-share';
import { useRouter } from "next/router";
import { TypeRender } from "../../../type";



const sharedclassNamees = "dark:text-white";
const bodyclassNamees = "text-base text-gray-700";

function DetailPost({ content, references }: RichTextProps) {
  const { asPath } = useRouter()

  const renderers: NodeRendererType | undefined = {
    h1: ({ children }: TypeRender) => (
      <h1
        className={`mb-4 text-3xl text-gray-900 md:text-4xl lg:text-5xl font-semibold  ${sharedclassNamees}`}
      >
        {children}
      </h1>
    ),
    h2: ({ children }: TypeRender) => (
      <h2
        className={`mb-4 text-2xl text-gray-900 md:text-3xl lg:text-4xl font-semibold ${sharedclassNamees}`}
      >
        {children}
      </h2>
    ),
    h3: ({ children }: TypeRender) => (
      <h3 className={`text-2xl font-semibold ${sharedclassNamees}`}>
        {children}
      </h3>
    ),
    h4: ({ children }: TypeRender) => (
      <h4 className={`text-xl font-semibold ${sharedclassNamees}`}>
        {children}
      </h4>
    ),
    h5: ({ children }: TypeRender) => (
      <h5 className={`text-lg font-semibold ${sharedclassNamees}`}>
        {children}
      </h5>
    ),
    h6: ({ children }: TypeRender) => (
      <h6 className={`text-base font-semibold ${sharedclassNamees}`}>
        {children}
      </h6>
    ),
    p: ({ children }: TypeRender) => (
      <p className={`my-4 text-base ${bodyclassNamees} ${sharedclassNamees}`}>
        {children}
      </p>
    ),
    ul: ({ children }: TypeRender) => (
      <ul
        className={`list-disc list-inside my-4 text-base ${bodyclassNamees} ${sharedclassNamees}`}
      >
        {children}
      </ul>
    ),
    ol: ({ children }: TypeRender) => (
      <ol
        className={`list-decimal list-inside my-4 text-base ${bodyclassNamees} ${sharedclassNamees}`}
      >
        {children}
      </ol>
    ),
    li: ({ children }: TypeRender) => (
      <li className={`my-2 text-base ${bodyclassNamees} ${sharedclassNamees}`}>
        {children}
      </li>
    ),
    code: ({ children }: TypeRender) => (
      <code
        className={`bg-gray-100 dark:bg-gray-800 rounded-md p-2 text-sm ${sharedclassNamees}`}
      >
        {children}
      </code>
    ),
    code_block: ({ children }: TypeRender) => (
      <pre
        className={`bg-gray-100 dark:bg-gray-800 overflow-y-scroll rounded-md p-2 text-sm ${sharedclassNamees}`}
      >
        {children}
      </pre>
    ),
  };
  return <div>
    <RichText content={content} renderers={renderers} />
  </div>
}

export default DetailPost;
