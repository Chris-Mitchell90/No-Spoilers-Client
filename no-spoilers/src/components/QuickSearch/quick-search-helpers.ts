import { SelectSearchOption } from 'react-select-search';
import SnippetAPI from '../../API/snippetAPI';

/**
 * Default value for search result box
 */

export const emptyOptions = [
  {
    name: 'Enter TV Show',
    value: '1',
  },
] as SelectSearchOption[];

/**
 * API call to populate search results
 *
 */
export const getOptions = async (query: string) => {
  if (query.length === 0) return emptyOptions;
  const results = await SnippetAPI.search(query);

  if (results.length === 0)
    return [
      {
        name: 'Not found',
        value: '2',
        poster_path: '',
        first_air_date: '',
      },
    ];

  return results.map((result) => {
    return {
      name: result.name,
      value: result.TMDB_show_id,
      poster_path: `https://image.tmdb.org/t/p/w500${result.poster_path}`,
      first_air_date: new Date(result.first_air_date).getFullYear(),
    };
  });
};
