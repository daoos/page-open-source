export const formatProps = (props,defaultStr) => {
  const base = 75
   // '自动'
  if(!props){
      return defaultStr
  }
  // 1% || 1PX || rem
  if(props.indexOf('%') !== -1 || props.indexOf('PX') !== -1 || props.indexOf('rem') !== -1){
      return props
  }
  // 1px || 1 情况
  const re = /\d+/g
  const match = re.exec(props)
  let result = props 
  if(match && match[0]){
      result = `${Number(match[0]) / base}rem`
  }
  return result
}