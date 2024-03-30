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

export function slugify(text: string): string {
    return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w-]+/g, '')       // Remove all non-word chars
    .replace(/--+/g, '-')          // Replace multiple - with single -
    .replace(/^-+/, '')            // Trim - from start of text
    .replace(/-+$/, '');           // Trim - from end of text
}

export function hrefBuilder(path: string[]): string {
    return ['/note',...path].join('/')
}

export function capitalizeFirstChar(text: string): string {
    return text[0].toUpperCase() ;
}