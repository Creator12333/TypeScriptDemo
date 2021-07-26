import { resolve } from 'path';
import { readFileSync, writeFileSync } from 'fs';
export function readFile(path : string) : string {
    return readFileSync(resolve(__dirname, path), 'utf-8')
}

export function writeFile<T>(path : string, data : T) : void {
    writeFileSync(resolve(__dirname, path), JSON.stringify(data))
}