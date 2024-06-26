import * as fs from 'fs';
import { Driver, Range } from '@directus/storage';
import { Readable } from 'node:stream';

type DriverLocalConfig = {
    root: string;
};
declare class DriverLocal implements Driver {
    private root;
    constructor(config: DriverLocalConfig);
    private fullPath;
    /**
     * Ensures that the directory exists. If it doesn't, it's created.
     */
    private ensureDir;
    read(filepath: string, range?: Range): Promise<fs.ReadStream>;
    stat(filepath: string): Promise<{
        size: number;
        modified: Date;
    }>;
    exists(filepath: string): Promise<boolean>;
    move(src: string, dest: string): Promise<void>;
    copy(src: string, dest: string): Promise<void>;
    write(filepath: string, content: Readable): Promise<void>;
    delete(filepath: string): Promise<void>;
    list(prefix?: string): AsyncGenerator<string, any, unknown>;
    private listGenerator;
}

export { DriverLocal, type DriverLocalConfig, DriverLocal as default };
