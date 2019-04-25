export class PageRequest {
    page;
    size;
    sort?;
    dir?;
}

export class Page {
    content;
    totalPages;
    totalElements;
    number;
    size;
    last;
    first;
}


export const SEARCH_DUE_TIME = 300;
