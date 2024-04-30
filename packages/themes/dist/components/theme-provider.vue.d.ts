import { Theme } from '../schemas/index.js';
import { DeepPartial } from '@directus/types';

declare const _default: import('vue').DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    darkMode: boolean;
    themeLight: string | null;
    themeLightOverrides: DeepPartial<Theme['rules']>;
    themeDark: string | null;
    themeDarkOverrides: DeepPartial<Theme['rules']>;
}>, {
    themeLight: string;
    themeDark: string;
    themeLightOverrides: () => {};
    themeDarkOverrides: () => {};
}>, {}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    darkMode: boolean;
    themeLight: string | null;
    themeLightOverrides: DeepPartial<Theme['rules']>;
    themeDark: string | null;
    themeDarkOverrides: DeepPartial<Theme['rules']>;
}>, {
    themeLight: string;
    themeDark: string;
    themeLightOverrides: () => {};
    themeDarkOverrides: () => {};
}>>>, {
    themeLight: string | null;
    themeLightOverrides: DeepPartial<Theme['rules']>;
    themeDark: string | null;
    themeDarkOverrides: DeepPartial<Theme['rules']>;
}, {}>;
export default _default;
type __VLS_TypePropsToRuntimeProps<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: import('vue').PropType<T[K]>;
    } : {
        type: import('vue').PropType<T[K]>;
        required: true;
    };
};
type __VLS_WithDefaults<P, D> = {
    [K in keyof Pick<P, keyof P>]: K extends keyof D ? __VLS_Prettify<P[K] & {
        default: D[K];
    }> : P[K];
};
type __VLS_Prettify<T> = {
    [K in keyof T]: T[K];
} & {};
