const program = require('commander');
const package = require('./package.json');
// const init = require('./command/init');
// const list = require('./command/list')
const add = require('./command/add')

program
    .version(package.version)      // 版本
    .usage('<command> [options]'); // 定义用法
// program.command('init (template)')
//     .description("创建新新项目")
//     .alias('i')
//     .action(function(template){
//          init(template);
//     })
program.command('add')
    .description("增加新组件")
    .alias('a')
    .action(function(){
        add();
    })
// program.command('list')    // command-命令名
//     .description("显示可使用的模板列表")  // description-描述
//     .alias('l')             // alias-命令简写
//     .action(function(){     // 命令行为
//        list();
//     })
program.parse(process.argv);   // 处理参数
if(program.args.length==0){
    //这里是处理默认没有输入参数或者命令的时候，显示help信息
    program.help();
}
