import { program } from 'commander'
import { CommitOrder, type CommitOptions } from './types'

export class ArgHandler {
  private args: string[]

  constructor(args?: string[]) {
    this.args = args ?? process.argv
  }

  public parseArgs(): CommitOptions {
    program
      .option('-dir <dir>', 'Specify the directory to commit')
      .option('-r, --random', 'Commit files in random order')
      .option('-asc', 'Commit files in ascending order') // default
      .option('-dsc', 'Commit files in descending order')
      .option(
        '--sort-by [type]',
        'Sort by birthtime, mtime(modified time) or none (default: mtime)',
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

    if (!options.Dir) {
      program.outputHelp()
      console.error('Please specify the directory to commit')
      process.exit(1)
    }

    const commitOptions: CommitOptions = {
      dir: options.Dir,
      order: CommitOrder.NoDate,
      fromDate: options.from,
      toDate: options.to,
    }

    if (options.random) {
      commitOptions.order = CommitOrder.Random
    } else if (options.Dsc) {
      if (options.sortBy === 'birthtime') {
        commitOptions.order = CommitOrder.BirthDsc
      } else if (options.sortBy === 'mtime') {
        commitOptions.order = CommitOrder.MtimeDsc
      }
    } else {
      if (options.sortBy === 'birthtime') {
        commitOptions.order = CommitOrder.BirthAsc
      } else if (options.sortBy === 'mtime') {
        commitOptions.order = CommitOrder.MtimeAsc
      }
    }

    return commitOptions
  }
}
