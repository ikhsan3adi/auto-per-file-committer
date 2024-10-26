import simpleGit from 'simple-git'
import type { CustomFileStat } from './types'

export class GitService {
  public async commit(file: CustomFileStat, date: Date = new Date()) {
    console.log(`Commit ${file.path} with date: ${date.toISOString()}...`)

    const git = simpleGit()

    const ignored = Boolean((await git.checkIgnore(file.path))[0])

    if (ignored) {
      console.log(`${file.path} is in .gitignore. Skipping...`)
      return
    }

    try {
      await git.add(file.path)
      await git.commit(`Create/Modify ${file.name}`, {
        '--date': date.toISOString(),
      })
      console.log(`Successfully committed ${file.path}`)
    } catch (_) {
      console.error(`Failed to commit ${file.path}. Skipping...`)
    }
  }
}
