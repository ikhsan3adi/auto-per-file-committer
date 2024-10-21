# auto-per-file-committer

Automated tool that commits files one by one to a version control repository, such as Git. Users can choose the commit order either based on the file creation time or randomly. This tool helps ensure each file's changes are tracked in an organized or randomized sequence, depending on the user's preference. Perfect for automating sequential or randomized commits.

## Usage

```shell
cd <YOUR REPO PATH>
bun <PATH TO THIS REPO/src/index.ts> -dir <YOUR REPO PATH(must be current directory)>
```

Example:

```shell
cd dir/my-repo
bun ../auto-per-file-committer/src/index.ts -dir .

# dir/my-repo
# dir/auto-per-file-committer
```

Run `bun start --help` in the `auto-per-file-committer` directory for more information.
