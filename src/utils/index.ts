type ReturnType = {
  definition: string
  dependsOnTypes: Record<string, string>
}

// TODO: Make this readable
export function getTypeDefinition(
  globalTypes: string,
  name: string,
  options: { asObject: true }
): ReturnType
export function getTypeDefinition(
  globalTypes: string,
  name: string,
  options?: { asObject: false }
): string
export function getTypeDefinition(
  globalTypes: any,
  name: any,
  { asObject = false }: any = {}
) {
  let dependsOnTypes: Record<string, string> = {}
  const lines: string[] = []
  const typeLines = globalTypes.split('\n')
  let found: boolean = false
  let whiteSpaceShift: number = 0

  // go through global.d.ts file
  for (const [idx, line] of typeLines.entries()) {
    // find type def start
    if (!found) {
      found =
        line.trim().startsWith('type ' + name) ||
        line.trim().startsWith('interface ' + name)
      if (!found) continue

      // find type defs recursively
      const typeRegex = /\/\* TYPES: (.*) \*\//
      const typeLine = typeLines[idx - 1]
      if (typeRegex.test(typeLine)) {
        let subTypes = typeLine.match(typeRegex)
        subTypes = subTypes?.[1].split(' ') || []
        for (const typeName of subTypes) {
          const { definition, dependsOnTypes: subTypeDependsOnTypes } =
            getTypeDefinition(globalTypes, typeName, {
              asObject: true,
            })
          dependsOnTypes = {
            ...subTypeDependsOnTypes,
            [typeName]: definition,
            ...dependsOnTypes,
          }
        }
      }
      whiteSpaceShift = line.length - line.trimStart().length
    }
    if (line.includes(':BREAK:')) break
    lines.push(line.slice(whiteSpaceShift))
  }
  return asObject
    ? { definition: lines.join('\n'), dependsOnTypes }
    : [
        ...Object.values(dependsOnTypes).flatMap((def) => [def, '']),
        ...lines,
      ].join('\n')
}

export function splitPathAndExtension(fullpath: string): {
  filepath: string
  extension: string
} {
  const filepath = fullpath.substring(0, fullpath.lastIndexOf('.'))
  const extension = fullpath.substring(
    fullpath.lastIndexOf('.') + 1,
    fullpath.length
  )
  return { filepath, extension }
}
