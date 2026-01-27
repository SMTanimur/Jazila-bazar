
"use client"
import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';
import SearchBox from './search-box';
import SearchSuggestions from './search-suggestions';
import { useState, useEffect, useCallback } from 'react';
import { IProduct } from '@/types';
interface Props {
  label: string;
  variant?: 'minimal' | 'normal' | 'with-shadow' | 'flat';
  [key: string]: unknown;
}

const Search: React.FC<Props> = ({ label, variant, ...props }) => {
  const router = useRouter();
  const params = useSearchParams();
  const textFromUrl = params?.get('text') || '';
  const [searchTerm, updateSearchTerm] = useState(textFromUrl);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(textFromUrl);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);
  
  // Sync searchTerm with URL params when they change externally
  useEffect(() => {
    const currentText = params?.get('text') || '';
    updateSearchTerm(currentText);
    setDebouncedSearchTerm(currentText);
    setShowSuggestions(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
  
  const handleOnChange = (e: any) => {
    const { value } = e.target;
    updateSearchTerm(value);
    setShowSuggestions(value.length >= 2);
  };
  
  const handleFocus = () => {
    if (searchTerm.length >= 2) {
      setShowSuggestions(true);
    }
  };
  
  const handleSelectProduct = useCallback((product: IProduct) => {
    updateSearchTerm(product.name);
    setShowSuggestions(false);
    // Navigate to product page
    router.push(`/products/${product.slug}`);
  }, [router]);

  const onSearch = (e: any) => {
    e.preventDefault();
    if (!searchTerm) return;
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      text: searchTerm,
    };

    const url = qs.stringifyUrl(
      {
        url: '/',
        query: updatedQuery,
      },
      { skipNull: true }
    );
 
 
    router.push(url,{
      scroll:false
    
    });
    
  };

  function clearSearch() {
    updateSearchTerm('');
    setDebouncedSearchTerm('');
    setShowSuggestions(false);
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery
    };
    
    // Remove text from query when clearing
    delete updatedQuery.text;

    const url = qs.stringifyUrl(
      {
        url: '/',
        query: updatedQuery,
      },
      { skipNull: true }
    );
 
 
    router.push(url,{
      scroll:false
    
    });
   
  }

  return (
    <div className="relative w-full">
      <SearchBox
        label={label}
        onSubmit={onSearch}
        onClearSearch={clearSearch}
        onChange={handleOnChange}
        onFocus={handleFocus}
        value={searchTerm}
        name="search"
        placeholder={'Search'}
        variant={variant}
        {...props}
      />
      <SearchSuggestions
        searchTerm={debouncedSearchTerm}
        isOpen={showSuggestions}
        onClose={() => setShowSuggestions(false)}
        onSelect={handleSelectProduct}
      />
    </div>
  );
};

export default Search;
