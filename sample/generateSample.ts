import fs from 'fs'
import path from 'path'

for (let index = 0; index < 5; index++) {
  setTimeout(() => {
    fs.writeFile(
      path.join(__dirname, `sample-${index}.txt`),
      'Hello, World!',
      (err) => {
        if (err) {
          console.error(err)
        }
      }
    )
  }, 1000)
}
