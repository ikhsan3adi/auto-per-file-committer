import fs from 'fs'
import { join } from 'path'
import { type CustomFileStat } from './types'

export class FileService {
  constructor(protected path: string) {}

  public setPath(path: string) {
    this.path = path
  }

  public async readFilesInDir() {
    return await new Promise<CustomFileStat[]>((resolve, reject) => {
      fs.readdir(
        this.path,
        { encoding: 'utf-8', recursive: true, withFileTypes: true },
        (err, files) => {
          if (err) reject(err)

          resolve(
            files
              .filter((file) => !file.isDirectory())
              .map((file): CustomFileStat => {
                const path = join(file.parentPath, file.name)
                const stat = fs.statSync(path)
                return {
                  path: path,
                  name: file.name,
                  birthtime: stat.birthtime.getTime(),
                  mtime: stat.mtime.getTime(),
                }
              })
          )
        }
      )
    })
  }
}
