export interface ApiError extends Error {
  status: number;
  statusText: string;
  url?: string;
  bodyText?: string;
}

export async function fetchJson<T>(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(input, init);

  if (!res.ok) {
    let bodyText: string | undefined;

    try {
      bodyText = await res.text();
    } catch {
      bodyText = undefined;
    }

    const error: ApiError = Object.assign(
      new Error(
        `Request to ${res.url} failed with ${res.status} ${res.statusText}`
      ),
      {
        status: res.status,
        statusText: res.statusText,
        url: res.url,
        bodyText,
      }
    );

    throw error;
  }

  return (await res.json()) as T;
}
