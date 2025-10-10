export class Page<T> {
    count: number = 0;
    next: string|null = "";
    previous: string|null = "";
    results: Array<T> = [];
}