type Options = {
    url: string;
    method: string;
    body: Record<string, any> | string | null;
    headers?: {
        header: string;
        value: string;
    }[] | null;
};
declare const _default: import("@directus/extensions").OperationApiConfig<Options>;
export default _default;
