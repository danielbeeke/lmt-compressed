import * as XLSX from 'https://cdn.sheetjs.com/xlsx-0.18.7/package/xlsx.mjs';
import { toIndexed } from './helpers/toIndexed.ts'
import { onlyUnique } from './helpers/onlyUnique.ts'

const file = await XLSX.readFile('LMT_4_0_t231752_20220425.xlsx')
const dataSheetName = file.SheetNames.pop()
const items: Array<any> = XLSX.utils.sheet_to_json(file.Sheets[dataSheetName])

const names: any = []
const languages = []
for (const item of items) {
  const itemTags = [
    item['Visual Language Tag 1'],
    item['Visual Language Tag 2'],
    item['Audio Language Tag']
  ].filter(Boolean)
  .filter(onlyUnique())

  for (const itemTag of itemTags) {
    languages.push([
      item.Descriptor,
      itemTag
    ])
  }
}

Deno.writeTextFileSync('./compressed.json', JSON.stringify(languages))
