const defaultImg = 'https://pic.8pig.com/comment_img/u_88/11588/7f44be7f6a2363d0688002af8e311e92.jpeg'
// 已有组件名称
export default [
  {
    name: 'default',
    props: {
      msg: '在这里新建你的页面吧',
    }
  },
  {
    name: 'pImg',
    props: {
      display: 'block',
      width: '750px',
      height: 'auto',
      isLink: false,
      url: '',
      imgUrl: '',
      textAlign: 'left',
      paddingRight: 0,
      paddingLeft: 0,
      paddingTop: 0,
      paddingBottom: 0,
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0,
      bgColor: '#fff',
      borderWidth: '0px',
      borderColor: '#fff',
      borderStyle: 'solid',
      pcDisplay: 'block',
      pcWidth: '100%',
      pcHeight:'100%',
      pcIsLink: false,
      pcUrl: '',
      pcImgUrl: '',
      pcTextAlign: 'left',
      pcPaddingRight: 0,
      pcPaddingLeft: 0,
      pcPaddingTop: 0,
      pcPaddingBottom: 0,
      pcMarginTop: 0,
      pcMarginBottom: 0,
      pcMarginLeft: 0,
      pcMarginRight: 0,
      pcBgColor: '#fff',
      pcBorderWidth: '0px',
      pcBorderColor: '#fff',
      pcBorderStyle: 'solid',
    }
  },
  {
    name: 'txt',
    props: {
      txt: '文本组件,请在此输入内容',
      fontSize: '14px',
      fontWeight: 'normal',
      color: '#000',
      width: '',
      height: '',
      lineHeight: '',
      textAlign: 'left',
      display: 'block',
      paddingRight: 0,
      paddingLeft: 0,
      paddingTop: 0,
      paddingBottom: 0,
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0,
      isLink: false,
      url: '',
      bgColor: '#fff',
      borderWidth: '0px',
      borderColor: '#fff',
      borderStyle: 'solid'
    }
  }      
  ,{
    name: 'default1',
    props: {
      msg: '在这里添加修改组建的默认属性',
    }
  }
        
  ,{
    name: 'test',
    props: {
      msg: '在这里添加修改组建的默认属性',
    }
  }
        
]
