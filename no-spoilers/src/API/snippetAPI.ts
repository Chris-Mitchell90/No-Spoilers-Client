import { post } from './api-client';

export const searchSnippets = async (
  query: string
): Promise<TVShowSnippet[]> => {
  const data = {
    search: query,
  };
  const results = await post(`/quicksearch`, data);

  return results.data;
};

const SnippetAPI = {
  search: searchSnippets,
};

export default SnippetAPI;
