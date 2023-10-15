import { Icons } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const classes = {
  root: "ps-10 pe-4 h-12 flex items-center w-full rounded appearance-none transition duration-300 ease-in-out text-heading text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ",
  normal:
    "bg-gray-100 border border-input bg-background focus:shadow  focus:border-accent",
  solid: "bg-gray-100 border border-border-100  focus:border-accent-200",
  outline: "border border-border-base focus:border-accent",
  shadow: "focus:shadow",
};

type SearchProps = {
  className?: string;
  shadow?: boolean;
  placeholder?: string;
  variant?: "normal" | "solid" | "outline";
  inputClassName?: string;
  onSearch: (data: SearchValue) => void;
};

type SearchValue = {
  searchText: string;
};

const Search: React.FC<SearchProps> = ({
  className,
  onSearch,
  variant = "outline",
  placeholder,
  shadow = false,
  inputClassName,
  ...rest
}) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,

    formState: { errors },
  } = useForm<SearchValue>({
    defaultValues: {
      searchText: "",
    },
  });
  const searchText = watch("searchText");

  useEffect(() => {
    if (!searchText) {
      onSearch({ searchText: "" });
    }
  }, [searchText]);

  const rootClassName = cn(
    classes.root,
    {
      [classes.normal]: variant === "normal",
      [classes.solid]: variant === "solid",
      [classes.outline]: variant === "outline",
    },
    {
      [classes.shadow]: shadow,
    },
    inputClassName
  );

  function clear() {
    reset();
    onSearch({ searchText: "" });
  }

  return (
    <form
      noValidate
      role="search"
      className={cn("w-full flex items-center relative", className)}
      onSubmit={handleSubmit(onSearch)}
    >
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <button className="outline-none absolute start-1 focus:outline-none active:outline-none p-2 text-body">
        <Icons.search className="w-5 h-5" />
      </button>
      <input
        type="text"
        id="search"
        {...register("searchText")}
        className={rootClassName}
        placeholder={placeholder ? placeholder : "Search"}
        aria-label="Search"
        autoComplete="off"
        {...rest}
      />
      {errors.searchText && <p>{errors.searchText.message}</p>}
      {!!searchText && (
        <button
          type="button"
          onClick={clear}
          className="outline-none absolute end-1 focus:outline-none active:outline-none p-2 text-body"
        >
          <Icons.close className="w-5 h-5" />
        </button>
      )}
    </form>
  );
};

export default Search;
