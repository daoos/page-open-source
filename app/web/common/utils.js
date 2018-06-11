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

export const createComponents = function (list, path, type) {
    if (Object.prototype.toString.call(list) !== "[object Array]")
      return alert("数据格式不正确");
    const components = {};
    list.map(function(element) {
      const name = element.name;
      let showname = name;
      if (!!type) showname = type + "-" + name;
      components[showname] = () =>
        import(`component/module/${path}${name}.vue`); // 动态引入
    });
    return components;
  }
  