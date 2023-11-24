import { cn } from "@/lib/utils";
import { useGlobalModalStateStore } from "@/store/modal";
import { IProduct } from "@/types";
import { Tab } from "@headlessui/react";
import { useState } from "react";

interface Props {
  product: IProduct;
}
export default function ProductDetailsTab({ product }: Props) {
  let [tabHeading] = useState({
    Product_Details: "",
    Review_Rating: "",
    Questions_And_Answers: "",
  });
  const globalModal = useGlobalModalStateStore((state) => state);
  return (
    <div className="w-full xl:px-2 py-11 lg:py-14 xl:py-16 sm:px-0">
      <Tab.Group>
        <Tab.List className="block border-b border-border-base">
          {Object.keys(tabHeading).map((item) => (
            <Tab
              key={item}
              className={({ selected }) =>
                cn(
                  "relative inline-block transition-all text-15px lg:text-17px leading-5 text-gray-700 focus:outline-none pb-3 lg:pb-5 hover:text-brand  ml-8",
                  selected
                    ? "font-semibold after:absolute after:w-full after:h-0.5 after:bottom-0 after:translate-y-[1px] after:right-0 after:bg-primary"
                    : ""
                )
              }
            >
              {item.split("_").join(" ")}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-6 lg:mt-9">
          <Tab.Panel className="lg:flex">
            <div className="text-sm sm:text-15px text-brand-muted leading-[2em] space-y-4 lg:space-y-5 xl:space-y-7">
              <p>
                Go sporty this summer with this vintage navy and white striped
                v-neck t-shirt from the Abercrombie & Fitch. Perfect for pairing
                with denim and white kicks for a stylish sporty vibe. Will fit a
                UK 8-10, model shown is a UK 8 and 5’5. !!
              </p>
              <p>
                Typography is the work of typesetters, compositors,
                typographers, graphic designers, art directors, manga artists,
                comic book artists, graffiti artists, and now—anyone who
                arranges words, letters, numbers, and symbols for publication,
                display, or distribution—from clerical workers and newsletter
                writers to anyone self-publishing materials.
              </p>
              <p>
                Hit your next boxing workout with a combination it’s never seen
                before in the Combat Drop Arm Tank, including a
                freedom-instilling regular fit and dropped armhole to allow you
                to throw jabs and hooks at the punching bag with ease. A
                lightweight material keeps you fighting fit, and fresh.
              </p>
              <p>
                Go sporty this summer with this vintage navy and white striped
                v-neck t-shirt from the Abercrombie & Fitch. Perfect for pairing
                with denim and white kicks for a stylish sporty vibe. Will fit a
                UK 8-10, model shown is a UK 8 and 5’5. !!
              </p>
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <div>kjdkfd</div>
          </Tab.Panel>

          <Tab.Panel>
            <div className="flex flex-col ">
              <div className="flex items-center justify-between">
                <h1 className="text-lg text-gray-800 dark:text-white font-medium">
                  Have Doubts Regarding This Product ?
                </h1>
                <button
                  className="py-2 px-4 bg-gray-100 rounded-lg text-gray-800 dark:text-white"
                  onClick={() =>
                    globalModal.setPostQuestionState(true, product)
                  }
                >
                  Post Your Question
                </button>
              </div>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
