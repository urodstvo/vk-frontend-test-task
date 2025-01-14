import { API_URL } from "..";

export const searchRepositories = async (
  query: string,
  options?: {
    page: number | null;
    per_page: number | null;
    sort: string | null;
    order: string | null;
  }
) => {
  const url = new URLSearchParams();

  // Add parameters to the query only if they exist
  if (options && options?.page !== null) url.append("page", options.page.toString());
  if (options && options?.per_page !== null) url.append("per_page", options.per_page.toString());
  if (options && options?.sort !== null) url.append("sort", options.sort);
  if (options && options?.order !== null) url.append("order", options.order);

  const params = url.toString();

  const response = await fetch(`${API_URL}/search/repositories?q=${query}&${params}`);
  if (!response.ok) throw new Error(response.status.toString());

  const json = (await response.json()) as Promise<SearchRepositoriesResponse>;
  return json;
};

type SearchRepositoriesResponse = {
  total_count: number;
  incomplete_results: boolean;
  items: {
    id: number;
    name: string;
    full_name: string;
    private: boolean;
    owner: {
      login: string;
      id: number;
      avatar_url: string;
      url: string;
      html_url: string;
    };
    description: string | null;
    fork: boolean;
    html_url: string;
    stargazers_count: number;
    forks_count: number;
    language: string | null;
    visibility: string;
    created_at: string;
    updated_at: string;
  }[];
};
