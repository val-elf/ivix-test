export class HttpService {
    private static requestedGets: { [key: string]: Promise<any> } = {};

    public static get<T>(url: string): Promise<T> {
        if (!this.requestedGets[url]) {
            this.requestedGets[url] = new Promise(async (resolve) => {
                const result = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                resolve((await result.json()) as T);
            });
        }
        return this.requestedGets[url];
    };
}