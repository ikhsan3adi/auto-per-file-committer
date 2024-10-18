import simpleGit from 'simple-git'
import type { CustomFileStat } from './types'

export class GitService {
  public async commit(file: CustomFileStat, date: Date) {
    console.log(`Commit ${file.path}...`)

    const git = simpleGit()

    try {
      await git.add(file.path)
      await git.commit(`Create/Modify ${file.name}`, {
        '--date': date.toISOString(),
      })
      console.log(`Successfully committed ${file.path}`)
    } catch (_) {
      console.error(`Failed to commit ${file.path}`)
    }
  }
}
