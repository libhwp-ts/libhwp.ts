import * as Cfb from 'cfb'
import * as Fs from 'node:fs'
import * as Commander from 'commander'

const Program = new Commander.Command()

Program.option('-f, --file <FILE>', 'A file to inspect.', '')
  .option('-s, --save', 'Save the file?', false)

Program.parse()

// eslint-disable-next-line @typescript-eslint/naming-convention
const Options = Program.opts() as {file: string; save: boolean}
console.log('We are inspecting the file:', Options.file)

const Data = Cfb.read(new Uint8Array(Fs.readFileSync(Options.file)), {type: 'buffer'})

if (Options.save) {
  Fs.writeFileSync(Options.file + '.json', JSON.stringify(Data, null, 2))
}
