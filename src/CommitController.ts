import type { FileService } from './FileService'
import type { GitService } from './GitService'
import { CommitOrder } from './types'

export class CommitController {
  private minDate = Date.parse('2004-01-01')

  constructor(
    private fileService: FileService,
    private gitService: GitService
  ) {}

  public async commit(
    order: CommitOrder,
    { from, to = new Date() }: { from?: Date; to?: Date }
  ) {
    const files = await this.fileService.readFilesInDir()

    const randomDates: Date[] = []

    switch (order) {
      case CommitOrder.BirthAsc:
        files.sort((a, b) => a.birthtime - b.birthtime)
        break
      case CommitOrder.BirthDsc:
        files.sort((a, b) => b.birthtime - a.birthtime)
        break
      case CommitOrder.MtimeAsc:
        files.sort((a, b) => a.mtime - b.mtime)
        break
      case CommitOrder.MtimeDsc:
        files.sort((a, b) => b.mtime - a.mtime)
        break
      default:
        files.sort((a, b) => Math.random() - 0.5)
        for (let i = 0; i < files.length; i++) {
          if (!from) {
            const diff = Date.now() - this.minDate
            randomDates.push(new Date(to.getTime() - Math.random() * diff))
          } else {
            const diff = to.getTime() - from.getTime()
            randomDates.push(new Date(from.getTime() + Math.random() * diff))
          }
        }
        randomDates.sort((a, b) => a.getTime() - b.getTime())
        break
    }

    for (let i = 0; i < files.length; i++) {
      let date: Date

      switch (order) {
        case CommitOrder.BirthAsc:
        case CommitOrder.BirthDsc:
          date = new Date(files[i].birthtime)
          break
        case CommitOrder.MtimeAsc:
        case CommitOrder.MtimeDsc:
          date = new Date(files[i].mtime)
          break
        case CommitOrder.Random:
          date = randomDates[i]
          break
      }

      await this.gitService.commit(files[i], date)
    }
  }
}