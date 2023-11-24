import { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

interface Props {
  className?: string;
  shareUrl?: string;
}
interface NewsLetterFormValues {
  shareLink: string;
}
const defaultValues = {
  shareLink: "",
};

const SocialShareBox: React.FC<Props> = ({ className = "", shareUrl = "" }) => {
  const [copyText, setCopyText] = useState({
    value: shareUrl,
    copied: false,
  });
  const { register } = useForm<NewsLetterFormValues>({
    defaultValues,
  });
  useEffect(() => {
    if (copyText.copied) {
      setTimeout(() => {
        setCopyText({
          ...copyText,
          copied: false,
        });
      }, 1500);
    }
  }, [copyText]);
  return (
    <div
      className={cn(
        "shadow-card bg-white dark:bg-gray-900 rounded-md p-4 md:p-6 lg:p-7",
        className
      )}
    >
      <h1 className="mb-2">Share on social media</h1>

      <div className="flex flex-wrap items-center mb-4 -mx-1">
        <FacebookShareButton url={shareUrl} className="mx-1">
          <FacebookIcon
            size={40}
            round={true}
            className="transition-all hover:opacity-90"
          />
        </FacebookShareButton>
        <TwitterShareButton url={shareUrl} className="mx-1">
          <TwitterIcon
            size={40}
            round
            className="transition-all hover:opacity-90"
          />
        </TwitterShareButton>
        <WhatsappShareButton url={shareUrl} separator=":: " className="mx-1">
          <WhatsappIcon
            size={40}
            round
            className="transition-all hover:opacity-90"
          />
        </WhatsappShareButton>
        <LinkedinShareButton url={shareUrl} className="mx-1">
          <LinkedinIcon
            size={40}
            round
            className="transition-all hover:opacity-90"
          />
        </LinkedinShareButton>
      </div>
      <p>Copy link</p>
      <form noValidate className="space-y-5">
        <div className="relative mt-2.5 mb-1.5">
          <Input
            type="link"
            className="w-full"
            value={shareUrl}
            {...register("shareLink", {
              pattern: {
                value:
                  /^((https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}))$/,
                message: " ",
              },
            })}
          />
          {!copyText.copied ? (
            <>
              {/* @ts-ignore */}
              <CopyToClipboard
                text={copyText.value}
                onCopy={() =>
                  setCopyText({
                    ...copyText,
                    copied: true,
                  })
                }
              >
                {/* @ts-ignore */}
                <span
                  className="absolute  right-0.5 top-[6%] h-[90%] px-2 text-primary text-sm uppercase font-bold flex items-center bg-white cursor-pointer"
                  role="button"
                >
                  copy
                </span>
              </CopyToClipboard>
            </>
          ) : (
            <span className="absolute right-0.5 top-[6%] h-[90%] p-2 pl-1.5  text-primary text-sm uppercase font-bold flex items-center bg-gray-100 cursor-pointer">
              copied
            </span>
          )}
        </div>
      </form>
    </div>
  );
};

export default SocialShareBox;
