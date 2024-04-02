const basicFetch = async <T>(endpoint: string): Promise<T> => {
    const response = await fetch(endpoint);

    if (!response.ok) throw new Error('Failed to fetch data');

    return await response.json();
};

export default basicFetch;