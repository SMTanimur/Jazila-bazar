
"use client"
import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';
import SearchBox from './search-box';
import { useState } from 'react';
interface Props {
  label: string;
  variant?: 'minimal' | 'normal' | 'with-shadow' | 'flat';
  [key: string]: unknown;
}

const Search: React.FC<Props> = ({ label, variant, ...props }) => {
  const router = useRouter();
  const [searchTerm, updateSearchTerm] = useState('');
  const params = useSearchParams();
  const handleOnChange = (e: any) => {
    const { value } = e.target;
    updateSearchTerm(value);
  };

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
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery
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
   
  }

  return (
    <SearchBox
      label={label}
      onSubmit={onSearch}
      onClearSearch={clearSearch}
      onChange={handleOnChange}
      value={searchTerm}
      name="search"
      placeholder={'Search'}
      variant={variant}
      {...props}
    />
  );
};

export default Search;
