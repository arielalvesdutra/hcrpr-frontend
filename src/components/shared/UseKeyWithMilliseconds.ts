export const keyWithMilliseconds = 
  (key: any):string => `${key}${new Date().getUTCMilliseconds()}`
