const co = require('co');
const prompt = require('co-prompt');
const fs  = require('fs');
const path = require('path')
const { isExistSync, writeFileSync } = require('../utils')
const modulePath = path.resolve('./', 'app/web/component/module')

module.exports = function (){
  co(addComponents())
}

const addComponents = function *() {
  const defaultName = 'default1'
  let compsName = defaultName
  const promptName = yield prompt('请输入组件名称(默认default1): ')

  if(promptName){
    compsName = promptName
  }
  console.log("components‘s name: ",compsName)
  const tmpData= {
    edit: require(`../template/edit`),
    preview: require(`../template/preview`),
    publish: require(`../template/publish`)
  }

  const files = {
    edit: path.resolve(modulePath, 'edit', compsName+'.vue'),
    preview: path.resolve(modulePath, 'preview', compsName+'.vue'),
    publish: path.resolve(modulePath, 'publish', compsName+'.vue'),
  }

  try {
    yield isExistSync(files.edit)
    yield isExistSync(files.preview)
    yield isExistSync(files.publish)

    yield writeFileSync(files.edit,tmpData.edit)
    yield writeFileSync(files.preview,tmpData.preview)
    yield writeFileSync(files.publish,tmpData.publish)
    
    yield addDefaultSeting(compsName)

    console.log('组件创建成功')
  } catch (err) {
    console.log('文件写入失败',err)
    process.exit(0)
  }

  process.exit(0)

}

function addDefaultSeting (name) {
  return new Promise(function(resolve,reject) {
    fs.readFile(path.resolve(modulePath, 'defaultSetting.js'), 'utf8', function(err,data){
      if (err) {
        reject(err)
      } else {
        const start = data.indexOf('[')
        const end = data.lastIndexOf(']')
        const oldObj = data.substring(start+1, end-1)
        
        const defaultStr = `
  ,{
    name: '${name}',
    props: {
      msg: '在这里添加修改组建的默认属性',
    }
  }
        `
        const newObj = oldObj + defaultStr
        fs.writeFile(path.resolve(modulePath, 'defaultSetting.js'), data.replace(oldObj,newObj),function(err){
          if (err) reject(err)
          resolve()
        })
        
      }
    })
  })

}