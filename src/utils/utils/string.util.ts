export function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export function urlBuilder(path: string, params?: object): string {

    let queryString = path;

    if (params) {
        const query = Object.entries(params)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
        queryString += `?${query}`;
    }
    
    return queryString;
}
