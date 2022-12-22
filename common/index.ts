export const cloneDeep = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(cloneDeep)
  }
  else if (obj && typeof obj === 'object') {
    const cloned: any = {}
    const keys = Object.keys(obj)
    for (let i = 0, l = keys.length; i < l; i++) {
      const key = keys[i]
      cloned[key] = cloneDeep(obj[key])
    }
    return cloned
  }
  else {
    return obj
  }
}
