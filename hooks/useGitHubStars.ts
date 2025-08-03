import { useState, useEffect } from "react";

interface GitHubRepo {
  stargazers_count: number;
}

export function useGitHubStars(owner: string, repo: string) {
  const [stars, setStars] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStars = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.github.com/repos/${owner}/${repo}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch repository data");
        }

        const data: GitHubRepo = await response.json();
        setStars(data.stargazers_count);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        setStars(null);
      } finally {
        setLoading(false);
      }
    };

    fetchStars();

    // Refresh every 5 minutes
    const interval = setInterval(fetchStars, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [owner, repo]);

  return { stars, loading, error };
}
