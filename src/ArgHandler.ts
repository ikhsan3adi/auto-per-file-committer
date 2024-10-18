import { program } from 'commander'
import { CommitOrder, type CommitOptions } from './types'

export class ArgHandler {
  private args: string[]

  constructor(args?: string[]) {
    this.args = args ?? process.argv
  }

  public parseArgs(): CommitOptions {
    program
      .option('-dir [dir]', 'Specify the directory to commit (default: .)', '.')
      .option('-r, --random', 'Commit files in random order')
      .option('-asc', 'Commit files in ascending order') // default
      .option('-dsc', 'Commit files in descending order')
      .option(
        '--sort-by [type]',
        'Sort by birthtime or mtime(modified time) (default: mtime)',
        'mtime'
      )
      .option(
        '--from <date>',
        'Specify the start date for random order',
        (val) => new Date(val)
      )
      .option(
        '--to <date>',
        'Specify the end date for random order',
        (val) => new Date(val)
      )
      .parse(this.args)

    const options = program.opts()

    if (options.random) {
      options.order = CommitOrder.Random
    } else if (options.Dsc) {
      if (options.sortBy === 'birthtime') {
        options.order = CommitOrder.BirthDsc
      } else {
        options.order = CommitOrder.MtimeDsc
      }
    } else {
      if (options.sortBy === 'birthtime') {
        options.order = CommitOrder.BirthAsc
      } else {
        options.order = CommitOrder.MtimeAsc
      }
    }

    return {
      dir: options.Dir,
      order: options.order,
      fromDate: options.from,
      toDate: options.to,
    }
  }
}
