import { ArgHandler } from './ArgHandler'
import { CommitController } from './CommitController'
import { FileService } from './FileService'
import { GitService } from './GitService'

async function main() {
  const options = new ArgHandler().parseArgs()

  const fileService = new FileService(options.dir)
  const gitService = new GitService()
  const commitController = new CommitController(fileService, gitService)

  await commitController.commit(options)
}

main()
