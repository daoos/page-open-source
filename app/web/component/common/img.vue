<template>
    <img :data-url="formatImg(dataList)" :alt="(alt)?alt:'8只小猪'" :style="whStyle" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" class="lazy" />
</template>

<script>
    /**
     * v-img
     * @module components/common/Img
     * @desc img组件，主要是qiniu & ali 的域名切换
     * @param {Array} dataList - 数据
     * @param {String} alt - 名称
     *
     * @example
     * <v-img :data-list="[imgUrl,w,h,false,true]" :alt="alt"></rb-img>
     * <v-img :data-list="[imgUrl]" :alt="alt"></rb-img>
     */

    import { PIC_ENV, PIC_PATH, PIC_DOMAIN, PIC2_DOMAIN } from '../../common/conf'
    import { autoLazyload } from '../../common/lazyload'

    let lazyLoadHandle;
    if (typeof window !== 'undefined') {
        lazyLoadHandle = autoLazyload()
    }

    export default {
        props: {
            dataList: Array,
            alt: String
        },
        computed: {
          whStyle () {
            if (this.dataList[5]) {
              return {
                width: this.dataList[1] + 'px',
                height: this.dataList[2] + 'px'
              }
            }
            return {}
          }
        },
        methods: {
            formatImg: function (data) {
                const self = this;
                if (typeof window !== 'undefined') {
                    self.$nextTick(function () {
                        lazyLoadHandle.insertHandle()
                    });
                }

                const len = data.length
                let url = data[0]
                let w, h, suffix, clip, orign = false

                if (len > 1) {
                    w = Math.floor(data[1])
                    h = Math.floor(data[2])
                    suffix = data[3]
                    clip = data[4]
                    // add by wayky
                    if (data[5]) {
                      orign = true
                    }
                } else {
                    w = false
                    h = false
                    suffix = false
                    clip = false
                }

                //                if (!len || !url) return;
                //  if (url.indexOf('http') === -1) url = PIC_PATH + url
                //  以上 indexOf 报错，改成以下判断
                if (!/^http/g.test(url)) {
                  url = PIC_PATH + url
                }
                if (!/^https/g.test(url)) {
                  url = url.replace('http','https')
                }

                if (PIC_ENV === 1) { // ali
                    if (len === 1) return url
                    else {
                      if (orign) { return url }
                      return url + '@' + (w ? w + 'w_' : '') + (h ? h + 'h_' : '') + (suffix || (clip ? '1e_1c' : '0e'))
                    }
                } else if (PIC_ENV === 2) { // qiniu
                    url = url.replace(PIC_DOMAIN, PIC2_DOMAIN)
                    if (len === 1) return url
                    else {
                        if (orign) { return url }
                        return url + '?imageView2/' + (clip ? '1' : '2') + '/' + (w ? 'w/' + w + '/' : '') + (h ? 'h/' + h : '')
                    }
                }
            }
        }
    }
</script>
