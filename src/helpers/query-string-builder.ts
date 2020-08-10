import queryStringFactory from 'query-string'

/**
 * Recebe um objeto de chave e valor de filtros.
 * 
 * Retorna um string vazio caso não tenha filtros.
 * 
 * @param {*} filters 
 */
export const buildQueryString = (filters:any) => {

  if(filters === undefined) {
    return ''
  }

  if (Object.keys(filters).length) {
   return '?' + queryStringFactory.stringify(filters)
  }

 return ''
}
