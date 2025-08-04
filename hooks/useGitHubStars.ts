import { useState, useEffect } from "react";

interface GitHubRepo {
  name: string;
  stargazers_count: number;
  html_url: string;
}

export function useGitHubStars() {
  const [totalStars, setTotalStars] = useState<number>(0);
  const [repoCount, setRepoCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGitHubStars() {
      try {
        setLoading(true);
        setError(null);

        // Fetch user's repositories
        const response = await fetch(
          "https://api.github.com/users/Gaseema/repos?per_page=100&sort=stars"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch GitHub data");
        }

        const repos: GitHubRepo[] = await response.json();

        // Calculate total stars
        const stars = repos.reduce(
          (total, repo) => total + repo.stargazers_count,
          0
        );

        setTotalStars(stars);
        setRepoCount(repos.length);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        // Fallback values
        setTotalStars(0);
        setRepoCount(0);
      } finally {
        setLoading(false);
      }
    }

    fetchGitHubStars();
  }, []);

  return { totalStars, repoCount, loading, error };
}
