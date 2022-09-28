/*
 * @Author: Topskys
 * @Date: 2022-08-20 17:21:54
 * @LastEditTime: 2022-08-30 17:03:04
 * @LastEditors: Topskys
 * @Description: go head
 * @FilePath: \pt-apijsonpd:\MyProject\Vue\myLog.js
 */



/**
 * @description: 解析URL参数
 * @return {*}
 */
export const getSearchParams = () => {
    const searchPar = new URLSearchParams(window.location.search);
    const parObj = {}
    for (const [key, value] of searchPar.entries()) {
        parObj[key] = value
    }
    return parObj
}


/**
 * @description: 判断手机是Android还是ios
 * 1:ios
 * 2:android
 * 3:others
 * @return {*}
 */
export const getOSType = () => {
    let u = navigator.userAgent,
        app = navigator.appVersion
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1
    let isIOS = !!u.match(/\(i[^;]+;( u;)? CPU.+Mac OS X/)
    if (isIOS) {
        return 1
    }
    if (isAndroid) {
        return 2
    }
    return 3
}


/**
 * @description: 数组去重
 * @param {*} arr
 * @param {*} key
 * @return {*}
 */
export const uniqueArrayObject = (arr = [], key = 'id') => {
    if (arr.length === 0) return
    const obj = {}
    arr.forEach((item) => {
        if (!obj[item[key]]) {
            obj[item[key]] = item
        }
    })
    return Object.values(obj)
}


/**
 * @description: 滚动到页面顶部
 * @return {*}
 */
export const scrollToTop = () => {
    const height = document.documentElement.scrollTop || document.body.scrollTop
    if (height > 0) {
        window.requestAnimationFrame(scrollToTop)
        window.scrollTo(0, height - height / 8)
    }
}



/**
 * @description: 滚动到页面顶部
 * @return {*}
 */
// export const scrollToTop = () => {
//     window.scrollTo({top:0,left:0,behavior:"smooth"})
// }

/**
 * @description: 滚动到页面底部
 * @return {*}
 */
export const scrollToBottom = () => {
    window.scrollTo({
        top: document.documentElement.offsetHeight,
        left: 0,
        behavior: "smooth"
    })
}




/**
 * @description: 滚动到页面底部
 * @return {*}
 */
export const scrolledToBottom = () => document.documentElement.clientHeight + window.scrollY >= document.documentElement.scrollHeight


/**
 * @description: 打开浏览器打印框
 * @return {*}
 */
export const showPrintDialog = () => window.print()



/**
 * @description: 随机布尔值
 * @return {*}
 */
export const randomBoolean = () => Math.random() >= 0.5


/**
 * @description: 摄氏度转华氏度
 * @param {*} celsius
 * @return {*}
 */
export const celsiusToFahrenheit = (celsius) => celsius * 9 / 5 + 32

/**
 * @description: 华氏度转摄氏度
 * @param {*} fahrenheit
 * @return {*}
 */
export const fahrenheitToCelsius = (fahrenheit) => (fahrenheit - 32) * 5 / 9



/**
 * @description: 检测对象是否为空
 * @param {*} obj
 * @return {*}
 */
export const objIsEmpty = obj => Reflect.ownKeys(obj).length === 0 && obj.constructor === Object




/**
 * @description: 元素滚动到可见区域
 * @param {string} element
 * @return {*}
 */
export const scrollToVisible = (element) => {
    const element = document.querySelector(element)
    element.scrollIntoView({
        behavior: "smooth",
    })
}



/**
 * @description: 滚动到元素位置
 * @param {*} element
 * @return {*}
 */
export const smoothScroll = element => {
    document.querySelector(element).scrollIntoView({
        behavior: 'smooth'
    })
}



/**
 * @description: uuid
 * @return {*}
 */
export const uuid = () => {
    const temp_url = URL.createObjectURL(new Blob())
    const uuid = temp_url.toString()
    URL.revokeObjectURL(temp_url) // 释放url
    return uuid.substring(uuid.lastIndexOf('/') + 1)
}



/**
 * @description: 金额格式化
 * @param {number} number 要格式化的数字
 * @param {number} decimals 保留几位小数点
 * @param {string} dec_point 小数点符号
 * @param {string} thousands_sep 千分位符号
 * @return {*}
 */
export const moneyFormat = (number, decimals, dec_point, thousands_sep) => {
    number = (number + '').replace(/[^0-9+-Ee.]/g, '')
    const n = !isFinite(number) ? 0 : +number
    const prec = !isFinite(+decimals) ? 2 : Math.abs(decimals)
    const sep = typeof thousands_sep === 'undefined' ? ',' : thousands_sep
    const dec = typeof dec_point === 'undefined' ? '.' : dec_point
    let s = ''

    const toFixedFix = function (n, prec) {
        const k = Math.pow(10, prec)
        return '' + Math.ceil(n * k) / k // ceil()：返回大于或等于其数值参数的最小整数。
    }

    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    const reg = /(-?\d+)(\d{3})/
    while (reg.test(s[0])) {
        s[0] = s[0].replace(reg, '$1' + sep + '$2');
    }

    if ((s[1] || '').length < prec) {
        s[1] = s[1] || ''
        s[1] = new Array(prec - s[1].length + 1).join('0')
    }
    return s.join(dec)
}



/**
 * @description: 存储操作
 * @return {*}
 */
class Storage {

    constructor(isLocal = true) {
        this.storage = isLocal ? localStorage : sessionStorage
    }

    setItem(key, value) {
        if (typeof (value) === 'Object') value = JSON.stringify(value)
        this.storage.setItem(key, value)
    }

    getItem(key) {
        try {
            return JSON.parse(this.storage.getItem(key))
        } catch (e) {
            return this.storage.getItem(key)
        }
    }

    removeItem(key) {
        this.storage.removeItem(key)
    }

    clear() {
        this.storage.clear()
    }

    key(index) {
        return this.storage.key(index)
    }

    length() {
        return this.storage.length
    }
}

const localStorage = new Storage()
const sessionStorage = new Storage(false)
export {
    localStorage,
    sessionStorage
}





/**
 * @description: 下载文件
 * @param {*} api
 * @param {*} params
 * @param {*} filename
 * @param {*} type
 * @return {*}
 */
import axios from 'axios'
import {
    now
} from 'core-js/core/date';
import {
    dirname
} from 'path';
import {
    text
} from 'stream/consumers';
export const downloadFile = (api, params, filename, type = 'get') => {
    axios({
        method: type,
        uel: api,
        responseType: 'blob',
        params: params,
    }).then((res) => {
        let str = res.headers['content-disposition']
        if (!res || !str) return
        let suffix = ''
        if (str.lastIndexOf('.')) {
            filename ? '' : filename - decodeURI(str.substring(str.indexOf('-') + 1, str.lastIndexOf('.')))
            suffix = str.substring(str.lastIndexOf('.'), str.length)
        }
        if (window.navigator.msSaveBlob) {
            try {
                const blobObject = new Blob([res.data])
                window.navigator.msSaveBlob(blobObject, filename + suffix)
            } catch (e) {
                console.log(e)
            }
        } else {
            let url = window.URL.createObjectURL(res.data)
            let link = document.createElement('a')
            link.style.display = "none"
            link.href = url
            link.setAttribute('download', filename + suffix)
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            Window.URL.revokeObjectURL(link.href)
        }
    }).catch((err) => {
        console.log(err.message)
    })
}



/**
 * @description: 深拷贝
 * @param {*} parent
 * @return {*}
 */
export const clone = parent => {
    // 判断类型
    const isType = (obj, type) => {
        if (typeOf(obj) !== 'object') return false
        const typeString = Object.prototype.toString.call(obj)
        let flag;
        switch (type) {
            case 'Array':
                flag = typeString === '[object Array]'
                break
            case 'Date':
                flag = typeString === '[object Date]'
                break
            case 'RegExp':
                flag = typeString === '[object RegExp]'
                break
            default:
                flag = false
        }
        return flag
    }
    // 处理正则
    const getRegExp = reg => {
        var flags = ""
        if (reg.global) flags += "g"
        if (reg.ignoreCase) flags += "i"
        if (reg.multiline) flags += "m"
        return flags
    }
    // 维护两个储存循环引用的数组
    const parents = []
    const children = []

    const _clone = parent => {
        if (parent === null) return null
        if (typeof parent !== 'object') return parent
        let child, proto

        if (isType(parent, "Array")) {
            child = []
        } else if (isType(parent, "RegExp")) {
            child = new RegExp(parent.source, getRegExp(parent))
            if (parent.lastIndex) child.lastIndex = parent.lastIndex
        } else if (isType(parent, 'Date')) {
            child = new Date(parent.getTime())
        } else {
            // 处理对象原型
            proto = Object.getPrototypeOf(parent)
            // 切断原型链
            child = Object.create(proto)
        }

        // 处理循环引用
        const index = parents.indexOf(parent)

        if (index !== -1) {
            // 如果父数组存在本对象，说明之前已经被引用过，直接返回此对象
            return children[index]
        }
        parents.push(parent)
        children.push(child)

        for (let i in parent) {
            // 递归
            child[i] = _clone(parent[i])
        }
        return child
    }
    return _clone(parent)
}


/**
 * @description: 模糊搜索
 * @param {*} list 原数组
 * @param {*} keyword 查询的关键词
 * @param {*} attribute 数组需要检索属性
 * @return {*}
 */
export const fuzzyQuery = (list, keyword, attribute = 'name') => {
    const reg = new RegExp(keyword)
    const arr = []
    for (let i = 0; i < arr.length; i++) {
        if (reg.test(list[i][attribute])) {
            arr.push(list[i])
        }

    }
    return arr
}


/**
 * @description: 遍历树节点
 * @param {array} data
 * @param {function} callback
 * @param {string} childrenName
 * @return {*}
 */
export const foreachTree = (data, callback, childrenName = 'children') => {
    for (let i = 0; i < data.length; i++) {
        callback(data[i])
        if (data[i][childrenName] && data[i][childrenName].length > 0) {
            foreachTree(data[i][childrenName], callback, childrenName)
        }
    }
}
// 使用
// foreachTree(data,(item) => {
//     if(item.id===9){
//         result=item;
//     }
// })
// console.log(result)


/**
 * @description: 数组扁平化，亦称展开数组，将多维数组转化成一维数组。
 * @param {array} arr
 * @return {array}
 * 基本思路：逐个判断子项是否为数组
 * 有3种方法，方法1：使用数组和字符串的转换
 */
Array.prototype.flat = function (arr) {
    // 数组转换成字符串，在用map()方法拼接成数组
    return arr.join(',').split(',').map(item => {
        return parseInt(item)
    });
}

/**
 * @description: 递归，方法2
 * @return {array}
 */
// Array.prototype.flat = function () {
//     const res = this.map((item) => {
//         if (Array.isArray(item)) {
//             return item.flat()
//         }
//         return [item]
//     })
//     return [].concat(...res)
// }


/**
 * @description: white，some，方法3
 * @return {array}
 */
// Array.prototype.flat = function () {
//     let res = this;
//     while (res.some(item => Array.isArray(item))) {
//         res = [].concat(...res)
//     }
//     return res
// }




// js对象解构技巧

// const user = {
//     name: 'Topsky',
//     age: 18,
//     nickname: 'Hello',
//     address: {
//         country: 'uk',
//         postalCode: '7900',
//     }
// };
// var name = user.name // ES2015之前
// const {name,age} = user; // ES6

// 解构并保留一个休息对象永久链接
// const {name,...rest} = user; // 剩余的属性...rest：{age:18,nickname:'Hello'}

// 解构嵌套对象属性永久链接
// 对象有时候具有多个层， 可采取针对嵌套属性的操作
// 一口气把country属性抽出来
// const {
//     address: {
//         country
//     },
//     address,
// } = user;
// console.log(country, address); // 'uk' , address: {country: 'uk',postalCode: '7900',}

// 用不同的名字解构永久链接
// 取别名，name:alias
// const {
//     address: shippingAddress
// } = user

// 解构潜在的空值永久链接
// const {
//     children
// } = user // children：对象没有该属性，故值为undefined

// const {
//     children = 3
// } = user // children：手动设置其值// 打印值为3

// 在循环内解构永久链接，在循环中解构
// const users = [{
//     name: "Topsky",
//     age: 18,
// }, ......];
// for (let {
//         name,
//         age
//     } of users) {
//     console.log(name, age);
// }

// 动态名称解构永久链接
// const getProperty = 'name' // or 'age'
// how do we get this from the user now?
// 可以使用方括号注释
// const {
//     [getProperty]: returnValue
// } = user // returnValue：Topsky


// 从函数中解构永久链接
// 返回一个对象
// const getProduct = () => {
//     return {
//         id: 1,
//         name: 'MateBook',
//     }
// }
// const product = getProduct() // product：{id: 1, name: 'MateBook',}
// const {id}=getProduct()// id：1




// try...catch
// (()=>{
//     try{
//         return 2
//     }finally{
//         return 3
//     }
// })()


// typeof [] / null/特异对象 // 'object'
// null instanceof Object // false
// Object.prototype.toString.call([]) // 检查对象类型 

let f1 = () => 'Topsky'
f1() // return 'Topsky'
let f2 = () => {}
f2() // return underfined // ()=>{}是一个整体
let f3 = () => ({})
f3() // return {}


// js标签，foo会被识别为带标签的语句
foo: {
    console.log('js标签');
    break foo;
}

let str = ''
loop1:
    for (let i = 0; i < 5; i++) {
        if (i == 1) {
            continue loop1
        }
        str = str + i
    }
console.log(str) // 0234



/**
 * @description: 监听网络状态1
 * @return {*}
 */
navigator.connection.addEventListener('change', () => {
    const {
        rtt,
        downlink,
        effectiveType,
        saveData
    } = navigator.connection
    console.log(`网络连接类型${effectiveType}`)
    console.log(`下行速度/带宽${downlink}Mb/s`)
    console.log(`往返时间${rtt}ms`)
    console.log(`打开/请求数据保护模式${saveData}`)
    // if (/\slow-2g|2g|3g|4g/.test(effectiveType)) todo
})

// 监听网络状态2
// mounted() {
//         let self = this
//         window.addEventListener('online', self.updateOnlineState, true)
//         window.addEventListener('offline', self.updateOnlineState, true)
// },
// methods: {
//         updateOnlineState: function () {
//             var self = this;
//             self.onLineInfo = navigator.onLine?"online":"offline"
//         }
//     },



// 页面可编辑
// 浏览器URL输入data:text/html,<htmlcontenteditable>可打开编译器
// <div class='haveInput' contentEditable="true" placeholder='请输入'></div>
// .haveInput:before{ content:attr(placeholder);display:block;color:#333;}




// 测览器活践窗口册:
// window.onblur &winudlow.anfocus
// 定义:这两个apl分和表示窗回失去盆点和窗回处干活跃狱态
// 浏览其他窗口、和览器最水、点击其他程序彩,window.onblur 事件就会触发;向到该窗回,window.onfocus事件就会触发o
// mounted() {
// let self = this;
// window.addEventListener('blur'.self.doFlashTitle, true);
// window.addEventListener( 'focus'，function(){
// clearlnterval(self.timer);
// document.title =‘微信网页版";}, true);
// }，
// methods: {
//         doFlashlntle: function () {
//                 var self = this;
//                 self.timer = setInterval(() => {
//                     if (!self.flashFlag) {
//                           document.title = "微信网页版";
//                                 else {
//                                     document.title = `微信(${self.infoNum})` ;
// self.flashFlag = !self.flashFlag
// },500)
//         },
// }







/**
 * @description: 验证元素是否在可视区域内
 * @param {*} entries
 * @param {*} elements
 * @param {*} callback
 * @return {*}
 */
// export const observerDOM = (entries, elements = [], callback, ) => {
//     const option = {
//         threshold: 1.0
//     }
//     const observer = new IntersectingObserver(callback, option)
//     elements.forEach((el, i) => {
//         dom[i] = document.querySelector(el)
//         observer.observe(dom[i])
//     })
//     entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//             console.log(`
$ {
    entry.target.id
}
is visible `) // entry.target is dom元素
//         }
//     })
// }



// 用解构简写
// const v1=this.data.v1
// const v2=this.data.v2
// const {v1,v2} = this.data





// Array.find简写
// 原本使用for循环
// filterData=arr.find(item=>item.type==='v1' && item.name==='x')



// 查询条件简写
//if type === 't1' f1()
//else if type === 't2' f2()
// ...
// else throw new Error('Invalid'+type)
// 简写
// var types = {
//     t1: f1,
//         t2: f2,
// }
// var fn=types[type]
// (!fn) && throw new Error('Invalid'+type); fn();




// 按位索引简写
// arr.indexOf(item)>-1
// arr.indexOf(item)===-1
// 简写
// if(~arr.indexOf(item))
// if(!~arr.indexOf(item))
// or
// if(arr.includes(item))



// Object.entries()，将对象转换为数组
// const obj={t1:'v1',t2:'v2',t3:'v3'}
// arr=Object.entries(obj)
// Output:
// [
//     ['t1':'v1' ],
//     ['t2':'v2'],
//     ['t3':'v3']
// ]



// 输出键值
// Object.values(obj)
// ['v1','v2','v3']


// 双按位简写，双重NOT按位运算符方法仅适用于32位整数
// Math.floor(1.9)===1 // true
// 简写
// ~~1.9===1 //true



// 重复一个字符串多次
// let str=''
// for (let i=0; i <5;i++) {
//     str+='string '
// }
// 简写
// 'string '.repeat(5)


// 从字符串中获取字符
//let str='abc'
// str.charAt(2)//c
// 简写
// str[2] //c




// 数学指数幂函数的简写
// Math.pow(2,3)//8
// 简写
// 2**3//8




/**
 * @description: 识别装置
 * @return {string}
 */
export const detectDeviceType = () => {
    return /Android|webOS|iPhone|iPad|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent) ? Mobile : Desktop
}


/**
 * @description: 隐藏元素
 * @param {dom} element
 * @param {boolean} removeFormFlow 是否删除元素
 * @return {*}
 */
export const hideElement = (element, removeFormFlow = false) => {
    removeFormFlow ? (element.style.display = none) : (element.style.visibility = hidden)
}


/**
 * @description: 获取URL上的查询参数
 * @return {*}
 */
export const getURLParams = () => {
    const url = new URL(window.location.href)
    return url.searchParams.get(ParamName) ? url.searchParams.get(ParamName) : null
}


/**
 * @description: 简单深拷贝
 * @param {object} obj
 * @return {object}
 */
export const simpleDeepClone = (obj) => JSON.parse(JSOn.stringify(obj))



/**
 * @description: 判断横屏或竖屏
 * @return {string}
 */
export const getOrientation = () => {
    const isPortrait = screen.orientation.type.startsWith('portrait')
    return isPortrait ? 'portrait' : 'landscape'
    // screen.orientation.lock(orientation) // 锁屏
}


/**
 * @description: 元素全屏切换，默认根据根元素html
 * @param {element} el
 * @return {*}
 */
export const toggleFullscreen = (el) => {
    if (el) {
        if (!el.fullscreenElement) {
            el.requestFullscreen()
        } else if (el.exitFullscreen) {
            el.exitFullscreen()
        }
    } else {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen()
        } else if (document.exitFullscreen) {
            document.exitFullscreen()
        }
    }
}




/**
 * @description: 获取唤醒锁
 * @return {*}
 */
let wakeLock = null
async function play() {
    // ...
    wakeLock = await navigator.wakeLock.request('screen')
}
/**
 * @description: 离开网页标签时，就会释放唤醒锁
 * @return {*}
 */
async function pause() {
    // ...
    await wakeLock.release()
}



/**
 * @description: 录制屏幕，开始截屏
 * @param {boolean} cursor
 * @param {boolean} audio
 * @return {promise}
 */
export const liveScreen = (cursor = 'always', audio = true) => {
    const option = {
        video: {
            cursor: cursor, // 一直显示光标
        },
        audio: audio, // 录制声音
    }
    navigator.mediaDevices.getDisplayMedia(option) // returns a promise 
}

// 预览录音html
// <video autoplay id='preview' ></video>

// 预览录音js
previewElem = document.getElementById('preview')
previewElem.srcObject = await liveScreen()

// 停止屏幕截图
let tracks = previewElem.srcObject.getTracks()
tracks.forEach((track) => track.stop())
previewElem.srcObject = null


/**
 * @description: 分享网址
 * @param {配置} option
 * @return {*}
 */
async function shareURL(option = {
    title: 'Topsky',
    text: 'Developer',
    url: "https://www.google.com/"
}) {
    await navigator.share(option)
}



/**
 * @description: 使用剪贴板
 * @return {*}
 */
async function paste() {
    const text = await navigator.clipboard.readText()
    await navigator.clipboard.writeText(text)
}

// Object.prototype.hasOwnProperty(name) // 用于判断对象是否该属性name
// obj.hasOwnProperty(name) // return boolean 报错使用：obj.hasOwnProperty.call(name)



/**
 * @description: 获取数据类型
 * @param {*} value
 * @return {type}
 */
export const getDataType = (value) => {
    const match = Object.prototype.toString.call(value).match(/(\w+)]/)
    return match[1].toLocaleLowerCase()
}


/**
 * @description: 停止冒泡时间
 * @param {default} event
 * @return {*}
 */
export const stopPropagation = (event) => {
    event = event || window.event
    if (event.stopPropagation) {
        event.stopPropagation()
    } else {
        event.cancelBubble = true
    }
}



/**
 * @description: 深拷贝一个对象，复制深度嵌套对象
 * @param {object} obj
 * @param {*} hash
 * @return {object}
 */
export const deepCopy = (obj, hash = new WeakMap()) => {
    if (obj instanceof Date) {
        return new Date(obj)
    }
    if (obj instanceof RegExp) {
        return new RegExp(obj)
    }
    if (hash.has(obj)) {
        return hash.get(obj)
    }
    let allDesc = Object.getOwnPropertyDescriptors(obj)
    let cloneObj = Object.create(Object.getPrototypeOf(obj), allDesc)
    hash.set(obj, cloneObj)
    for (let key of Reflect.ownKeys(obj)) {
        if (obj[key] && typeof obj[key] === "object") {
            cloneObj[key] = deepCopy(obj[key], hash)
        } else {
            cloneObj[key] = obj[key]
        }
    }
    return cloneObj
}




/**
 * @description: 确定设备类型
 * @return {string}
 */
export const isMobile = () => {
    return !!navigator.userAgent.match(/(iPhone|Android|iPad|ios|IOS|iPad|BlackBerry|WebOS|Symbian|Windows Phone|Phone)/i)
}



/**
 * @description: IOS设备
 * @return {string}
 */
export const isIOS = () => {
    let reg = /iPhone|iPad|ios|IOS|iPad|Macintosh/i
    return reg.test(navigator.userAgent.toLowerCase())
}

/**
 * @description: Android设备
 * @return {string}
 */
export const isAndroid = () => {
    return /android/i.test(navigator.userAgent.toLowerCase())
}


/**
 * @description: 生成随机字符串
 * @param {number} length
 * @return {string}
 */
export const randomString = (length) => {
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let strLen = chars.length
    let randomStr = ""
    for (let i = 0; i < length; i++) {
        randomStr += chars.charAt(Math.floor(Math.random() * strLen))
    }
    return randomStr
}


/**
 * @description: 首字母大写
 * @param {string} string
 * @return {string}
 */
export const firstLetterUpper = (string) => {
    return string.charAt(0).toUpperCase() + string + slice(1)
}


/**
 * @description: 生成指定范围内的随机数
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
export const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min



/**
 * @description: 打乱数组顺序
 * @param {array} array
 * @return {array}
 */
export const shuffleArray = (array) => {
    return array.sort(() => 0.5 - Math.random()) // ES6
}


/**
 * @description: 从数组中获取随机值
 * @param {array} array
 * @return {*}
 */
export const getRandomValue = array => array[Math.floor(Math.random() * array.length)]



/**
 * @description: 格式化货币方法1
 * @param {number} money
 * @return {string}
 */
export const formatMoney1 = money => money.replace(new RegExp(`( ? ! ^ )( ? = (\\d {
    3
})) + $ {
    money.includes('.') ? '\\.' : '$'
}
`, 'g'), ',')


/**
 * @description: 格式化货币方法2
 * @param {number} money
 * @return {string}
 */
export const formatMoney2 = money => money.toLocaleString()



/**
 * @description: 设置cookies
 * @param {string} key
 * @param {*} value
 * @param {date} expire
 * @return {*}
 */
export const setCookie = (key, value, expire) => {
    const date = new Date //new Function 可省略()
    date.setDate(d.getDate() + expire)
    document.cookie = `
$ {
    key
} = $ {
    value
};
expires = $ {
    date.toUTCString
}
`
}


/**
 * @description: 获取cookies
 * @param {string} key
 * @return {*}
 */
export const getCookie = key => {
    const cookieStr = unescape(document.cookie)
    const arr = cookieStr.split('; ')
    let cookieValue = ""
    for (let i = 0; i < arr.length; i++) {
        const temp = arr[i].split('=')
        if (temp[0] === key) {
            cookieValue = temp[1]
            break
        }
    }
    return cookieValue
}


/**
 * @description: 删除cookies
 * @param {string} key
 * @return {*}
 */
export const deleteCookie = key => {
    document.cookie = `
$ {
    encodeURIComponent(key)
} = ;
expires = $ {
    new Date()
}
`
}




/**
 * @description: 过滤错误值
 * @param {array} array
 * @param {type} type
 * @return {array}
 */
export const filterErrorValue = (array, type) => {
    return array.filter(type)
}
// const array = [1, 0, undefined, '', false]
// array.filter(Boolean) // [1, 0, undefined, '']


// 判断简化
// if(a===undefined||a===10||a===""||a===null){}
// if ([ undefined ,10 , "" ,null].includes(a)){}



// 初始化数组
const array = Array(6).fill('') //[('',)*length=6]
// 初始化一个定长的二维数组
const matrix = Array(6).fill(0).map(() => {
    Array(5).fill(0)
}) //[6][5]=0

// 清空数组
array.length = 0
array = []

// 拼接数组
const starts = [1, 2]
const ends = [5, 6, 7]
// 方法1
array = [9, ...starts, ...ends, 8] // [9,1,2,5,6,7,8] 
// 方法2，数据两大时，占据内存大，建议使用方法3
starts.concat(ends) // [1,2,5,6,7] 
// 方法3
Array.prototype.push.apply(starts, ends) // // [1,2,5,6,7] 

// 将数组元素转换为数字
array = ['1', '2', '3', '0.04', '-5']
array = array.map(Number) // [1,2,3,0.04, -5]

// 从数组中获取最大值和最小值 ES6
// Math.max(...array)// -5

// 将类数组转换为数组
Array.prototype.slice.call(arguments)
// or 
// [...arguments]

// 删除数组元素
// 使用delete删除后元素会编程undefined，不会消失，消耗内存，建议splice()
array.splice(0, 2) // 删除[1,2]


// 空值合并运算符，为空或未定义，返回右侧操作，否则返回左侧操作
// const nullVal = null
// const emptyStr = ''
// const someNum = 23
// const a = nullVal ?? 'A default' // A default
// const b = emptyStr ?? 'B default' // '' // empty string != undefined or null
// const cc = someNum ?? 'C default' // 13


// 检查对象是否为空
// Object.keys({}).length //0
// Object.keys({
//     key: 1
// }).length //1


/**
 * @description: 缩短console.log()
 * @return {*}
 */
export const c = console.log.bind(document) // 使用c("hello c")



// 进制转换10>2、16  ES6
// const number = 43
// number.toString(2) //101011
// number.toString(16) //2b


// 反转字符串或单词 ES6
const sentence = "There is the developer which name is Topsky"
reverseBySeparator(sentence, "") // "Topsky is name which  developer the is There"
reverseBySeparator(reverseSentence, " ") // "ereth si"
/**
 * @description: 反转字符串或单词
 * @param {string} string
 * @param {type} separator
 * @return {string}
 */
export const reverseBySeparator = (string, separator) => {
    return string.split(separator).reverse().join(separator)
}


/**
 * @description: 判断回文字符串
 * @param {string} str1
 * @param {string} str2
 * @return {boolean}
 */
export const isReverse = (str1, str2) => {
    const normalize = (str) => {
        str.toLowerCase().normalize('NFD').split('').reverse().join('')
    }
    return normalize(str1) === str2
}
// isReverse('rac','car') // true


/**
 * @description: 判断两个字符串是否为互相排列 ES6
 * @param {string} str1
 * @param {string} str2
 * @return {boolean}
 */
export const isAnagram = (str1, str2) => {
    const normalize = (str) => {
        str.toLowerCase().normalize('NFD').split('').reverse().join('')
    }
    return normalize(str1) === normalize(str2)
}
// isAnagram('rat','car') // false


// 冻结对象，不能修改其属性值 ES6
// Object.freeze(obj)


/**
 * @description: 数组Set去重 ES6
 * @param {array} arr
 * @return {array}
 */
export const uniqueArray1 = arr => [...new set(arr)]

/**
 * @description: Set去重
 * @param {*} arr
 * @return {*}
 */
export const uniqueArray2 = arr => Array.from(new Set(arr))

/**
 * @description: 数组filter去重
 * @param {*} arr
 * @param {*} index
 * @return {*}
 */
export const uniqueArray3 = arr => arr.filter((item, index) => arr.indexOf(item) === index)



// 保留指定位小数 ES6
// number.toFixed(2) // 0.123456->0.12


/**
 * @description: 从RGB转换为HEX
 * @param {number} r
 * @param {number} g
 * @param {number} b
 * @return {string}
 */
export const rgbToHex = (r, g, b) => {
    const toHex = (number) => {
        const hex = number.toString(16)
        return hex.length === 1 ? `
0 $ {
    hex
}
` : hex
    }
    return `#
$ {
    toHex(r)
}
$ {
    toHex(g)
}
$ {
    toHex(b)
}
`
}
// 46,32,67 -> #2e2043



// === 和 == 的区别 ES6
// == ：值比，浅比较
// === ：值比，类型比，严格比较


// 合并对个对象 ES6
// const obj = {...obj1,...obj2,}


// 交换变量值 ES6
// [var1, var2] = [val2, val1]




/**
 * @description: 分割指定长度的元素数组
 * @param {array} list
 * @param {number} size
 * @param {array} cacheList
 * @return {array}
 */
export const listChunk = (list, size = 1, cacheList = []) => {
    const tmp = [...list]
    if (size <= 0) return cacheList
    while (tmp.length) {
        cacheList.push(tmp.splice(0, size))
    }
    return cacheList
}




/**
 * @description: 获取数组交集
 * @param {array} list
 * @param {array} args
 * @return {array}
 */
export const intersection = (list, ...args) => list.filter(item => args.every(list => list.includes(item)))



/**
 * @description: 函数柯里化
 * @param {function} fn
 * @return {array}
 */
export const curring = fn => {
    const {
        length
    } = fn;
    const curried = (...args) => {
        return (args.length >= length) ? fn(...args) : (...args2) => curried(...args.concat(args2))
    }
    return curried
}


/**
 * @description: 字符串前面空格去除与替换
 * @param {*} str
 * @return {*}
 */
export const trimString = (str) => str.replace(new RegExp('^([\\s]*)(.*)$'), '$2')


/**
 * @description: 获取当前子元素是其父元素下子元素的排位
 * @param {*} el
 * @return {*}
 */
export const getIndex = el => {
    if (!el) return -1
    let index = 0
    do {
        index++
    } while (el = el.previousElementSibling)
    return index
}


/**
 * @description: 获取当前元素相对于document的偏移量
 * @param {*} el
 * @return {*}
 */
export const getOffset = el => {
    const {
        top,
        left
    } = el.getBoundingClientRect()
    const {
        scrollTop,
        scrollLeft
    } = document.body
    return {
        top: top + scrollTop,
        left: left + scrollLeft
    }
}


/**
 * @description:获取元素类型 
 * @param {*} obj
 * @return {*}
 */
export const dataType = obj => {
    Object.prototype.toString.call(obj).replace(/^\[object (.+)\]$/, '$1').toLowerCase()
}



/**
 * @description: 判断是否是移动端
 * @return {*}
 */
// export const isMobile = () => 'ontouchstart' in window


/**
 * @description:fade动画 
 * @param {*} el
 * @param {*} type
 * @return {*}
 */
export const fade = (el, type = 'in') => {
    el.style.opacity = (type === 'in' ? 0 : 1)
    let last = +new Date()
    const tick = () => {
        const opacityValue = (type === 'in' ? (new Date() - last) / 400 : -(new Date() - last) / 400)
        el.style.opacity = +el.style.opacity + opacityValue
        last = +new Date()
        if (type === 'in' ? (+el.style.opacity < 1) : (+el.style.opacity > 0)) requestAnimationFrame(tick)
    }
    tick()
}

/**
 * @description: 将指定格式的字符串解析为日期字符串
 * @param {*} str
 * @param {*} format
 * @return {*}
 */
export const dataPattern = (str, format = '-') => {
    if (!str) return new Date()
    const dateReg = new RegExp(` ^ (\\d {
    2
}) $ {
    format
}(\\d {
    2
}) $ {
    format
}(\\d {
        4
    }
    $)
`)
    const [, month, day, year] = dateReg.exec(str)
    return new Date(`
$ {
    month
}, $ {
    day
}
$ {
    year
}
`)
}



/**
 * @description: 获取选中的文本
 * @return {*}
 */
export const getSelectedText = () => window.getSelection().toString()




/**
 * @description: 复制内容到剪切板
 * @param {*} text
 * @return {*}
 */
export const copyToClipboard = (text) => navigator.clipboard.writeText(text)



/**
 * @description: 禁止网页复制粘贴
 * @return {*}
 */
export const noCopyPaste = () => {
    const el = document.querySelector('html')
    el.oncopy = () => false
    el.onpaste = () => false
}


/**
 * @description: 清除所有cookie
 * @return {*}
 */
export const clearCookies = () => {
    return document.cookie.split(';').forEach(cookie => document.cookie = cookie.replace(/^+/, '').replace(/=.*/, ` = ;
expires = $ {
    new Date(0).toUTCString()
};
path = /`))
}



/**
 * @description: 滚动到页面顶部
 * @return {*}
 */
export const goToTop = () => window.scrollTo(0, 0)



/**
 * @description: 判断当前标签页是否激活
 * @return {*}
 */
export const isTabInView = () => !document.hidden


/**
 * @description: 重定向到一个URL
 * @param {*} url
 * @return {*}
 */
export const redirectURL = url => location.href = url








/**
 * @description: 限制input只能输入中文
 * @return {*}
 */
export const limitInputChinese = () => {
    const input = document.querySelector('input[type="text"]')
    const clearText = target => {
        const {
            value
        } = target
        target.value = value.replace(/[^\u4e00-\u9fa5]/g, '')
    }
    input.onfocus = ({
        target
    }) => {
        clearText(target)
    }
    input.onkeyup = ({
        target
    }) => {
        clearText(target)
    }
    input.onblur = ({
        target
    }) => {
        clearText(target)
    }
    input.oninput = ({
        target
    }) => {
        clearText(target)
    }
}


/**
 * @description: 去除字符串中的html代码
 * @param {*} str
 * @return {*}
 */
export const removeHTML = (str = '') => str.replace(/<[\/\!]*[^<input>]*>/ig, '')

/**
 * @description: 去除字符串中的html
 * @param {*} str
 * @return {*}
 */
export const stripHTML = str => (new DOMParser().parseFromString(str, 'text/html')).body.textContent || ''


/**
 * @description: 判断数组是否为空
 * @param {*} arr
 * @return {*}
 */
export const arrIsNotEmpty = arr => Array.isArray(arr) && arr.length > 0


/**
 * Ctrl+win+t
 * @description: 防抖
 * @param {*} fn
 * @param {*} delay
 * @return {*}
 */
export const debounce = function (fn, delay) {
    let timer
    return function (...args) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, delay)
    }
}


/**
 * @description: 节流
 * @param {*} fn
 * @param {*} delay
 * @return {*}
 */
export const throttle = function (fn, delay) {
    let last = 0 // 上次触发时间
    return function (...args) {
        const now = Date.now()
        if (now - last > delay) {
            last = now
            fn.apply(this, args)
        }
    }
}


/**
 * @description: 深拷贝，JSON方法，不支持值为undefined、函数和循环引用的情况
 * @param {*} obj
 * @return {*}
 */
export const cloneObjByJSON = obj => {
    return JSON.parse(JSON.stringify(obj))
}


/**
 * @description: 深拷贝， 递归方法
 * @param {*} obj
 * @param {*} cache
 * @return {*}
 */
export const deepClone = (obj, cache = new WeakMap()) => {
    if (obj == null || typeof obj !== "object") return obj
    if (obj instanceof Date) return new Date(obj)
    if (obj instanceof RegExp) return new RegExp(obj)

    if (cache.has(obj)) return cache.get(obj)
    let cloneObj = new obj.constructor(obj)
    cache.set(obj, cloneObj)

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            cloneObj[key] = deepClone(obj[key], cache)
        }
    }
    return cloneObj
}


/**
 * @description: 冒泡排序
 * @param {*} arr
 * @return {*}
 */
export const bubbleSort = arr => {
    let len = arr.length
    let num = null
    for (let j = 0; i < len - 1; j++) {
        if (arr[j] > arr[j + 1]) {
            num = arr[j]
            arr[j] = arr[j + 1]
            arr[j + 1] = num
        }
    }
}


/**
 * @description: 检查日期是否有效
 * @param {array} val
 * @return {*}
 */
export const isDateValid = (...val) => !Number.isNaN(new Date(...val).valueOf())


/**
 * @description: 计算两个日期时间间隔
 * @param {new Date("2022-8-26")} date1
 * @param {new Date("2022-8-27")} date2
 * @return {*}
 */
export const dayDif = (date1, date2) => Math.ceil(Math.abs(date1.getTime() - date2.getTime()))

/**
 * @description: 查找日期位于一年中的第几天
 * @param {*} date
 * @return {*}
 */
export const dayOfYear = date => Math.floor(Math.abs(date.getTime() - new Date(date.getFullYear(), 0, 0)))

/**
 * @description: 时间格式化
 * @param {*} date
 * @return {*}
 */
export const timeFormatDate = date => Math.toTimeString().slice(0, 8)

/**
 * @description: 字符串首字母大写
 * @param {*} str
 * @return {*}
 */
export const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)

/**
 * @description: 翻转字符串
 * @param {*} str
 * @return {*}
 */
export const reverseStr = str => str.split('').release().join('')

/**
 * @description: 随机字符串
 * @return {*}
 */
export const randomStr = () => Math.random().toString(36).slice(2)

/**
 * @description: 截断字符串，返回指定长度的截断字符串
 * @param {*} str
 * @param {*} length
 * @return {*}
 */
export const truncateStr = (str, length) => str.length < length ? str : `${str.slice(0,length-3)}...`

/**
 * @description: 判断奇偶数
 * @param {*} number
 * @return {*}
 */
export const isEven = number => number % 2 === 0

/**
 * @description: 求数组平均值，若从数组末尾开始求和，可使用arr.reduceRight()
 * @param {array} args
 * @param {*} b
 * @return {*}
 */
export const average = (...args) => args.reduce((a, b) => a + b) / args.length




/**
 * @description: 指定位数四首五入
 * @param {*} n
 * @param {*} d
 * @return {*}
 */
export const round = (n, d) => Number(Math.round(n + 'e' + d) + 'e-' + d)

/**
 * @description: 获取随机十六进制颜色
 * @return {*}
 */
export const randomHex = () => `${Math.floor(Math.random() *0xffffff).toString(16).padEnd(6,"0")}`



// 图片防盗链
// 1、修改hosts文件127.0.0.1指定两个不同的域名
// 2、服务器端
const fs = require("fs");
const path = require("path");
const http = require("http");
const url = require("url");
const getHostName = function (str) {
    let {
        hostname
    } = url.parse(str);
    return hostname
}

http.createServer((req, res) => {
    let refer = req.headers['referer'] || req.headers['referrer'] // 请求头均小写
    // 先看一下refer值与host值对比，不相等就需要放到链
    // 读取文件，返回客户端
    let {
        pathname
    } = url.parse(req.url)
    // 要找的文件
    let src = path.join(--dirname, 'public', '.' + pathname)
    fs.stat(src, err => { // 判断文件是否存在
        if (!err) {
            if (refer) { //不是所有图片都有来源
                let referHost = getHostName(refer)
                let host = req.headers['host'].split(':')[0]
                if (referHost != host) {
                    // 防盗链
                    fs.createReadStream(path.join(__dirname, 'public', './1.jpg')).pipe(res)
                } else {
                    // 正常显示，如果路径存在，可以正常显示直接返回
                    fs.createReadStream(src).pipe(res)
                }

            } else {
                res.end('end')
            }
        }
    })
}).listen(8080)


/**
 * @description: bind实现
 * @param {*} context
 * @return {*}
 */
Function.prototype.es6bind = function (context) {
    const content = context || window
    const _this = this
    const args = Array.prototype.slice.call(arguments, 1)
    return function () {
        return _this.apply(content, args.concat(...arguments))
    }
}



/**
 * @description: 监听屏幕旋转变化
 * @return {*}
 */
export const screenOrientationChange = function () {
    let self = this
    let orientation = screen.orientation || screen.mozOrientation || screen.msOrientation
    window.addEventListener('orientationchange' in window ? 'orientationchange' : 'resize', function () {
        self.angle = orientation.angle
    })
}
//or 媒体查询
// 竖屏
// @media screen and(orientation: portrait) {}
// 横屏
// @media screen and(orientation: landscape) {}



/**
 * @description: 电池状态查询
 * @return {*}
 */
export const getBatteryInfo = function () {
    let self = this;
    if (navigator.getBattery) {
        navigator.getBattery().then(function () {
            self.batteryInfo = battery.charging ? `正在充电：剩余${battery.level*100}%` : `剩余电量${battery.level*100}%`
        })
    } else {
        self.batteryInfo = '不支持电池状态查询'
    }
}




// 让你的手机震动
// window.navigator.vibrate(200)
// 使用:震动效果会在很多游戏使用。如欢采耳地主中,
// 地主打完王炸后手机都会有震动的效果,以此来表达地主唱瑟的心情也很是合理示品:
export const vibrateFun = function () {
    let self = this;
    if (navigator.vibrate) {
        navigator.vibrate([500, 500, 500, 500, 500, 500, 500, 500, 500, 500]);
    } else {
        self.vibrateInfo = "您的设备不支持震动";
    }
    // 清除震动
    navigator.vibrate(0)
    //  持续震动 
    setInterval(function () {
        navigator.vibrate(200);
    }, 500);
}


/**
 * @description: 获取当前语言
 * @return {*}
 */
export const getThisLang = function () {
    const langList = ['cn', 'hk', 'tw', 'en', 'fr']
    const len = langList.length
    const thisLang = (navigator.language || navigator.browser.language).toLowerCase()
    for (let i = 0; i < len; i++) {
        if (thisLang.includes(langList[i])) {
            return langList[i]
        } else {
            return 'en'
        }
    }
}






// 命名多个变量且赋值
let [var1, var2, var3] = [1, 2, 3]


// 如果存在----简写
// if (test === true) or if (test!=="") or if(test!==null)
// if(test)// it will check empty string,null and undefined


// 多个条件的 AND (&&) 运算符
// if (test) {
// callMethod()
// }
// if test is only true
// test && callMethod()// 判断条件 && 执行表达式


// 短函数调用
// (test===1?fn1:fn2)()


// switch简写，将条件保存在键值对对象中，并可根据条件使用
// switch (data) {
//     case 1:
//         fn1();
//         break;
//     case 2:
//         fn2();
//         break;
// }
// 简写
// var data ={1:fn1,2:fn2};
// data[something] && data[something]()


// 隐式返回简写
// function fn(f){
//     return Math.PI*f
// }
// fn =f=>(Math.PI*f)


// 扩展运算简写
// const arr1 = [1, 2, 3]
// const arr2 = [4,5,6].concat(arr1)
// 简写
// const newArray = [4, 5, 6, ...arr]


// 小数基数指数
// for(var i=0; i<10000; i++)
// for(var i=0; i<1e4; i++)


// 对象属性分配
// let obj={n1,n2}


// 将字符串转换成数字
// parseInt('123')
// parseFloat('12.3')
// 简写
// +'123'
// +'12.3'




// 保持宽高比
// .wrap{display:inline-block;aspect-ratio:1/1;}



// 数组转换tree前
// const arr = [{
//         id: 1,
//         name: '部门1',
//         pid: 0
//     },
//     {
//         id: 2,
//         name: '部门2',
//         pid: 1
//     },
//     {
//         id: 3,
//         name: '部门3',
//         pid: 2
//     }, {
//         id: 4,
//         name: '部门4',
//         pid: 3
//     }, {
//         id: 5,
//         name: '部门5',
//         pid: 4
//     }
// ]


// 转换结果
// const tree = [{
//     "id": 1,
//     "name": "部门1",
//     "pid": 0,
//     "children": [{
//             "id": 2,
//             "name": "部门2",
//             "pid": 1,
//             "children": []
//         },
//         {
//             "id": 3,
//             "name": "部门3",
//             "pid": 2,
//             "children": [
//                 // ...
//             ]
//         },
//     ]
// }]


// 方法一：递归
/**
 * @description: 将数组转换为tree
 * @param {*} data
 * @param {*} rootId
 * @return {*}
 */
export const arrayToTree1 = function (data, rootId) {
    function getChildren(data, result, pid) {
        for (const item of data) {
            if (item.pid == pid) {
                const newItem = {
                    ...item,
                    children: []
                }
                result.push(newItem)
                getChildren(data, newItem.children, item.pid)
            }
        }
    }
    const result = []
    getChildren(data, result, rootId)
    return result
}

// 方法一：简写
/**
 * @description: 将数组转换为tree
 * @param {*} data
 * @param {*} pid
 * @return {*}
 */
export const arrayToTree2 = function (data, pid) {
    return data.filter(item => item.pid === pid).map(item => ({
        ...item,
        children: arrayToTree2(data, item.id)
    }))
}


// 方法二：不适用递归，使用临时变量map来存储
/**
 * @description: 将数组转换为tree
 * @param {*} data
 * @param {*} rootId
 * @return {*}
 */
export const arrayToTree3 = function (data, rootId) {
    const [result, itemMap] = [
        [], new Map()
    ]
    for (const item of data) {
        itemMap.set(item.id, {
            ...item,
            children: []
        })
    }
    for (const item of data) {
        const {
            id,
            pid
        } = item
        const treeItem = itemMap.get(id)
        if (pid === rootId) {
            result.push(treeItem)
        } else {
            if (!itemMap.get(pid)) {
                itemMap.set(pid, {
                    children: []
                })
            }
            itemMap.set(pid.children.push(treeItem))
        }
    }
    return result
}


/**
 * @description: 清除空格
 * @param {*} str
 * @param {*} type
 * @return {*}
 */
// String.prototype.trim = function (str, type = "default") {
//     return type === "left" ? str ? .replace(/^(\s*| *)/, "") : type === "right" ? str ? .replace(/(\s*| *)$/, "") : str ? .replace(/^\s*(.*?)\s+$/, "$1")
// }


/**
 * @description: 随机数时间戳
 * @return {*}
 */
export const uniqueId = () => {
    var [a, b] = [Math.random, parseInt]
    return `Number(new Date()).toString()${b(10*a())}${b(10*a())}${b(10*a())}`
}



/**
 * @description: UTF-8解码
 * @param {*} string
 * @return {*}
 * |：
 * &：
 * !!：
 * ?：
 * ??：
 */
export const utf8Decode = function (string) {
    var [tmp_arr, i, ac, c1, c2, c3] = [
        [], 0, 0, 0, 0, 0
    ]
    string += ""
    while (i < string.length) {
        c1 = string.charCodeAt(i)
        if (c1 < 128) {
            tmp_arr[ac++] = String.fromCharCode(c1)
            i++
        } else if (c1 > 191 && c1 < 224) {
            c2 = string.charCodeAt(i++)
            tmp_arr[ac++] = String.fromCharCode(((c1 && 31) << 6) | (c2 && 63))
            i += 2
        } else {
            c2 = string.charCodeAt(i++)
            c3 = string.charCodeAt(i++)
            tmp_arr[ac++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6 | (c3 & 63)))
            i += 3
        }
    }
    return tmp_arr.join('')
}



/**
 * @description: 半角转换为全角函数
 * @param {*} str
 * @return {*}
 */
export const toDBC = (str) => {
    var res = "";
    for (var i = 0; i < str.length; i++) {
        code = str.charCodeAt(i); // code 未定义，升级为全局变量
        if (code >= 33 && code <= 126) {
            res += String.fromCharCode(str.charCodeAt(i) + 65248)
        } else if (code == 33) {
            res += String.fromCharCode(str.charCodeAt(i) + 12288 - 32)
        } else {
            res += str.charAt(i)
        }
    }
    return res
}


/**
 * @description: 判断是否以某个字符串开头
 * @param {*} str
 * @return {*}
 */
String.prototype.startsWith = function (str) {
    return this.indexOf(str) == 0
}



/**
 * @description: resize操作
 * @return {*}
 */
(function () {
    var fn = function () {
        var w = document.documentElement ? document.documentElement.clientWidth : document.body.clientWidth,
            r = 1255,
            b = Element.extend(document.body),
            classname = b.className;
        if (w < r) {
            //当窗体的宽度小于1255的时候执行相应的操作
        } else {
            // 当窗体的宽度大于1255的时候执行相应的操作
        }
    };
    if (window.addEventListener) {
        window.addEventListener("resize", function () {
            fn();
        });
    } else if (window.attachEvent) {
        window.attachEvent("onresize", function () {
            fn();
        });
    }
    fn();
})();



/**
 * @description: 替换全部
 * @param {*} s1
 * @param {*} s2
 * @return {*}
 */
String.prototype.replaceAll = function (s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2)
}


/**
 * @description: 将键值对拼接成URL带参数
 * @param {*} obj
 * @return {*}
 */
export const toParamsURL = obj => {
    let aUrl = []
    let fnAdd = function (key, val) {
        return `${key}=${val}`
    }
    for (var k in obj) {
        aUrl.push(fnAdd(k, obj[k]))
    }
    return encodeURIComponent(aUrl.join('&'))
}


























// Vue


// components和Vue.component

// export default{ components:{home}}// 局部注册
// Vue.component('home',home)// 全局注册


// Vue.extend，可将一些子元素挂载到父元素上 

// var Profile=Vue.extend({
//     template:'<p>{{extendData}}</p>'
// })



// // mixins，帮助多个组件重复使用一个逻辑

// const mixin = {
//     created() {
//         this.dateTime()
//     },
//     methods: {
//         dateTime() {
//             // 这里是执行多个组件相同js逻辑的位置
//         }
//     }
// }
// // 组件使用：
// export default {
//     mixins: [mixin]
// }



// // extends，用法与mixins很相似，只不过接收的参数是简单的选项对象或构造函数，故extends只能单次扩展一个组件

// const extend = {
//     created() {
//         this.dateTime()
//     },
//     methods: {
//         dateTime() {
//             // 这里是执行多个组件相同js逻辑的位置
//         }
//     }
// }
// // 组件使用：
// export default {
//     extends: extend
// }



// Vue.nextTick

// 在DOM更新后的操作
// mounted(){this.$nextTick(()=>{this.$refs.input.focus()})}




// Vue.directive

// 1使用场景:官方给我们提供了很多指令,但是我们如果想将文字
// 变成指定的颜色定义成指令使用,这个时候就需要用到Vue.directive
// 全局定义
// Vue.directive("change color",funetion(el,binding,vnode){eL.style[ "color"]= binding.value;})
//使用
// <template>
// <div v-change-color=color">{{message}}</div><]template>
// <script>
// export default{data({
// return{
// color:'green'}
// }}
// </script>
// 2生命周期
// 1.bind只调用一次,指令第一次绑定到元素时候调用,用这个钩子可以定义二个绑定时执行一次的初始化动作。
// 2.inserted:被绑定的元素插入交节点的时模调用，父节点存在即句调用，不必存在doeument中)
// 3.update:被绑定与元素所在模板更新时调用，而且无论绑定值是否有变化,痛过比较更新前后的绑定值，忽略不必要的模板更新
// 4.componentUpdate :被绑定的元素所在模板完成一次更新更新周期的时候调用5.unbind:只调用一次，指令元素解绑的时候调用






// Vue.filter

// 局部注册，组件里面
// filter: {
//     xFilter: (value) =>{}
// }

// 全局注册
// Vue.filters('xFilter', (value)=>{})

// 多个过滤器全局注册
// /src/filters.js
// let dateServer=val=>val.replace(/(\d{4})(\d{2})(\d{2})/g,'$1-$2-$3')
// export dateServer
// /src/main.js
// import * as custom from './filters/custom'
// Object.keys(custom).forEach(key=>Vue,filter(key,custom[key]))



// Vue.set() vue2

// 作用：当你利用索引直接设置一个数组项时或修改数组长度时，由于Object.defineprototype()方法限制，数据不响应更新，但vue3使用proxy解决了这个问题
// 使用set()
// this.$set(arr,index,item)
// 再利用数组push(),splice()



// Vue.config.keyCodes

// 配置别名
// 将键码113定义为f2
// Vue.config.keyCodes.f2=113
// <input @keyup.f2='add'></input>



// Vue.config.performance

// 监听性能，只支持开发模式和支持performance.mark API的浏览器
// 使用：
//  Vue.config.performance=true



// Vue.config.errorHandler

// 指定组件的渲染和观察期间捕获错误的处理函数
// 使用：
// Vue.config.errorHandler= function(err,vm,info){// info 只在vue2.2.0+可用}



// Vue.config.warnHandler

// vue运行时警告的自定义处理函数，开发者模式生效
// 使用：
// Vue.config.warnHandler= function(msg,vm,trace){}



// v-pre

// vue是响应式的，但某些静态标签不需要多次编译，节省性能
// <div v-pre></div>



// v-once

// 有些静态dom没有改变，故只需渲染一次
// 与v-pre的区别，v-once只渲染一次，v-pre不编译，原样输出



// v-cloak

// 在网络慢的情况下，vue页面绑定数据，渲染页面时会出现明显的闪烁，使用v-cloak会保持实例直到编译结束
// <template><div v-cloak>{{value}}</div></template>
// css中，[v-cloak]{display:none;}



// 事件修饰符

// vue是响应式的，但静态标签不需要多次编译，节省性能
// .stop：阻止冒泡
// .prevent：阻止默认行为
// .self：仅绑定元素自身触发
// .once：只触发一次
// .passive：滚动事件默认行为，将会立即触发，不能和prevent一起使用



// Vue-router

// 1缓存和动画

// 1.路由是使用官方组件 vue router,使用方法相信大家非常熟悉;
// 2.这里我就叙述下路由的缓存和动画;
// 3.可以用exclude(除了)或者include(包括),2.1.0新增来坐判断
// <transition>
// <keep-alive :include="['a','b]">
//或include="a,b" :include="/a|b/",a和b表示组件的name
//因为有些页面,如试试数据统计.要实时刷新,所以就不需要缓存
// <router-view/>//路由标签
// </keep—alive>
// <router-view exclude="e"/>//e表示组件的name值
// </transition>

// 2全局路由钩子
// 1.router.beforeEach
// 2.router.beforeResolve (v 2.5.0+)
// 和beforeEach类似,区别是在导航被确认之前,
// 同时在所有组件内守卫和异步路由组件被解析之后,解析守卫就被调用即在 beforeEach之后调用
// 3. router.afterEach
// 全局后置钩子
// 在所有路由跳转结束的时候调用
// 这些钩子不会接受next 国数也不会改变导航本身
// router.beforeEach(to, from,next{ console.log('全局前置守卫: beforeEach '--next需要调用 '》11一般登录拦截用这个,也叫导航钩子守卫
// if (path==="/alogin") {
//         next()
//         return
//     }
//     if (token) {
//          next();
//     }
// })

// 3组件路由钩子

// 1.beforeRouteEnter
// 在渲染该组件的对应路由被确认前调用,
// 用法和参数与router.beforeEach类似,next需要被主动调用此时组件实例还未被创建、不能访问this
// 可以通过传一个回调给next来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数
// 2.beforeRouteUpdatc (v 2.2+)
// 在当前路由改变,并且该组件被复用时调用,可以通过this访问实例，next需要被主动调用。不能传回调
// 3.beforeRouteLeave
// 导航离开该组件的对应路由时调用, 可以访问组件实例this, next需要被主动调用, 不能传回调
// beforeRouteEnter(to, from, next) {
//  这里还无法访问到组件实例， this === undefined
// next(vm => {
//     //通过 `vm`访问组件实例
// })
// }
// 4 路由模式
// 设置mode属性: hash或history
// 5 Vue.Srouter
// this.$router.push(): 跳转到不同的url， 但这个方法回向history栈添加一个记录， 点击后退会返回到上一个页面
// this.$router.replace(): 不会有记录
// this.$router.go(n): n可为正数可为负数。 正数前进， 负数后退.类似window.history.go(n)

// 6 Vue.$Sroute
// 表示当前跳转的路由对象,属性有:name:路由名称
// path:路径
// query:传参接收值
// params:传参接收值
// fullPath:完成解析后的URL，包含查询参数和hash的完整骼径matched:路由记录副本
// redirectedFrom:如果存在重定向,即为重定向来源的路由的名宇
// this.Sroute.params.id:获取通过params或/:id传参的参数
// this.Sroute.query.id:获取通过query传参的参数

// 7 router view 的key
// 场景:由于Vuc会复用相同组件,即/page/1=>/pagc/2或者/page?id-1=>/page?id-2这类链接跳转时,将不在执行created, mounted之类的钩子
// 这样组件的created和mounted就都会执行
// <router-view :key="$route.fullPath"></router-view>



// Object.freeze
// 场景:一个长列表数据.一般不会更改,但是vue会做getter和setter的转换用法;是ES5新增的特性,可以冻结一个对象。防止对象被修改
// 支持:vue 1.0.18I对其提供了支持,对于data或vuex里使用freeze冻结了的对象，vuc不会做getter和sctter的转换
// 注意:冻结只是冻结里面的单个属性,引用地址还是可以更改
// new vue({
// data: {
// vue不会对list里的olhject做getter. setter绑定list: Object.freexe(T
// { ralue:1 },{ value: 2 }])
// },
// mounted(){
// 界面不会有响应,因为单个属性被冻结
// this.list[ 0].value = 100;
// 下面两种做法，界面都会响应
// tn1s.list=[
// {value: 100 },{ value: 200 }];
// this.list = Object.freeze([{
// value: 100
// }, {
//     value: 200
// }
// ];
// this.list=Object.freeze([{ value:100 },{ value:200}])}})'



// 调试template
// 场景: 在Vue开发过程中， 经常会遇到template模板渲染时
// JavaSeript变量出错的问题， 此时也许你会通过console.log来进行调试这时可以在开发环境挂载一个log函数
//main.js
// Vue.prototype.$log = window.console.log;
//组件内部
// <div>{{$log(info)}}</div>


















// IDEA插件

// Codota：代码只能提示插件
// CodeGlance：显示代码缩略图插件
// Key Promoter X：快捷键提示插件
// 阿里巴巴代码规范检查插件
// Lombok：简化臃肿代码插件
// SonarLint：代码质量检查插件
// Save Actions：格式化代码插件
// Rainbow Brackets：彩虹括号插件












// chrome插件

// github加速器：https://github.com/netty/netty
// Clear Cache
// JSON Viewer
// Octotree：解决github上查看代码一层层进入在出来的问题
// Code Cola：一个可视化编辑在线页面css样式的插件
// WEB前端助手
// Adblock Plus ：删除广告



// 项目

// 电影院选座：https://gitee.com/bysj2021/ci
// 微博App：https://github.com/sam408130/DSLolita
// 微信app：https://github.com/tbl00c/TLChat
// 仿网易云音乐app：https://github.com/boyan01/flutter-netease-music
// 仿抖音app：https://github.com/sshiqiao/douyin-ios-objectc //github.com/18380438200
// 仿今日头条app：https://github.com/chaychan/TouTiao
// 仿美团外卖点餐app：https://github.com/swStar/vue-meituan
// 在线考试：https://github.com/19920625lsg/spring-boot-online-exam
// 仿斗鱼直播app：https://github.com/yukilzw/dy_
// 人力资源管理：https://github.com/lenve/vhr
// MarkText：https://github.com/marktext/marktext
// YesPlayMusic：https://github.com/qier222/YesPlayMusic
// PicGo：https://github.com/Molunerfinn/PicGo
// PPTist：https://github.com/pipipi-pikachu/PPTist
// vue2-elm：https://github.com/bailicangdu/vue2-elm
// vue-element-admin：https://github.com/PanJiaChen/vue-element-admin
// Cider基于Electron和vue.js的音乐播放器：https://github.com/ciderapp/Cider
// newbee-mall-vue3-app：https://github.com/newbee-ltd/newbee-mall-vue3-app
// YouTube：https://github.com/aslanyanhaik/youtube-ios
// B站App：https://github.com/code-mcx/react-bilibili




















// css


// 常用布局方案


// 水平垂直居中

// 行内块级元素
// .parent{line-height:500px;text-align:center;}
// .child{display:inline-block;vertical-align:middle;}


// 定位方式实现水平垂直居中一：
// .child{position:absolute;left:calc(50% - 150px);top:calc(50% - 150px);}

// 定位方式实现水平垂直居中二：
// .child{position:absolute;left:50%;top:50%;margin-top:-150px;margin-left:-150px;}

// 定位方式实现水平垂直居中三：
// .child{position:absolute;left:0;right:0;top:0;bottom:0;margin:0;}

// 定位方式实现水平垂直居中一：
// .child{position:absolute;left:50% ;top:50%; transform:translate(-50%, -50%);}


// Flex
// .parent{display:flex;justify-content:center;align-items:center;}
// or
// .child{margin:auto;}


// Grid
// .parent{display:grid;align-items:center;justify-items:center;// or items 简写 place-items:center;}
// .child{margin:auto; // or align-self:center;justify-self:center; // self简写 place-self:center;}


// 两列布局

// float方案

// flex
// .container{display:flex;}
// .right{flex:1}

//Grid
// .container{display:grid;grid-template-columns:auto 1fr;} 


// 三列布局

//Grid
// .container{display:grid;grid-template-columns:auto 1fr auto;} 


// 圣杯布局
// .container{display:grid;grid-template:auto 1fr auto/ auto 1fr auto;}




// 水平居中

// 子元素为行内元素，可使用text-align: center;

// 定宽块级元素水平居中
// 1 margin: 0 auto;
// 2 position:relative;left:50%;margin-left:-50%;
// 3 .child{position:absolute;left:0;right:0;width:300px;margin:auto;}
// 4 .child{position:absolute;left:50%;transform:translateX(-50%);}

// Flex方案
// .parent{height:300px;display:flex;justify-content:center}
// .child{margin:auto;}

// Grid方案
// .parent{height:300px;display:grid;justify-content:center;// or justify-items:center;}
// or
// .child{margin:auto;}



// 垂直居中

// 行内块级元素垂直居中，vertical-align: middle;

// 定位方法实现方法一：
// .child{position:absolute;top:50%;margin-top:-50%;}

// 定位方法实现方法二：
// .child{position:absolute;top:0;bottom:0;margin:auto;height:300px;}

// 定位方法实现方法三：
// .child{position:absolute;top:50%;transform:translateY(-50%);}

// Flex方案
// .parent{display:flex;align-items:center}
// or
// .child{margin:auto;}

// Grid方案
// .parent{display:grid;align-content:center;// or justify-items:center;}
// or
// .child{margin:auto;// or align-self:center;}



// 粘性定位
// .title{position:sticky;top:0;}



// 毛玻璃，高斯模糊和羽化，模糊。使用background-filter:blur(20px);，加上box-shadow:0 0 30px 10px rgba(0,0,0,0.3)使其变得更自然些。



// 文字溢出部分显示省略号
// 单行（一定要设宽度）
// p {
//     width: 200px;
//     overflow: hidden;
//     text - overflow: ellipsis;
//     white-space: nowrap;
// }
// 多行
// p {
//     display:-webkit-box;
//     overflow: hidden;
// -webkit-box-orient:vertical;
// -webkit-line-clamp: 3;
// }



// 中英文自动换行
// word-break:break-all; // 只对英文有效，以字母作为换行依据
// word-wrap:break-word; // 只对英文有效，以单词作为换行依据 
// white-space:pre-wrap; // 只对中文有效，强制换行 
// white-space:nowrap; // 不强制换行，中英文都有效 




// 文字阴影
// text-shadow:[X-offset,Y-offset,Blur,Color]; 



// 修改input输入光标的颜色不改变字体颜色
// input{color:#fff;caret-color:red;}




// 设置placeholder的字体样式

// Chrome/Opera/Safari
// input::-webkit-input-placeholder{
// color:red;
// }

// Firefox 19+
// input::--moz-placeholder{
// color:red;
// }

// IE 10+
// input:-ms-input-placeholder{
// color:red;
// }

// Firefox 18-
// input:-moz-placeholder{
// color:red;
// }


// 不固定高宽div垂直居中的方法
// 方法一：伪元素和inline-block/ vertical-align(兼容IE8)
// .box-wrap:before { content:'';display:inline-block;height:100%;vertical-align:middle;margin-right:-0.25em;// 微调整空格}
// .box{display:inline-block;vertical-align:middle;}

// 方法二：flex（不谦容IE8-）
// .box-wrap{height:300px;display:flex;justify-content:center;align-items:center;}

// 方法三：transform（不谦容IE8-）
// .box-wrap{width:100%;height:300px;position:relative;}
// .box{position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);-webkit-transform:translate(-50%, -50%);}

// 方法四：margin: auto;
// .box-wrap{width:100%;height:300px;position:relative;}
// .box{position:absolute;top:0;left:0;bottom:0;right:0;width:50%;height:50%;margin:auto;}



// 解决IOS页面滑动卡顿
// html,body {-webkit-overflow-scrolling:touch;}


// 滚动条样式

// 滚动条整体样式
// class::-webkit-scrollbar{
// 设置y，x轴的宽度
// width:8px;height:8px;
// }

// 滚动条里面小方块
// class::-webkit-scrollbar-thumb{
// border-radios:10px;
// background-color: #aaa;
// }

// 滚动条里面轨道
// class::-webkit-scrollbar-track{
// box-shadow:inset 0 0 5px rgba(0,0,0,0.2)
// border-radios:10px;
// }

// .dome{
// display:none;// Chrome Safari
// scrollbar-width:none;// Firefox
// -ms-overflow-style:none;//IE 10+
// overflow:auto;
// }



// css绘制三角形

// div{width:0;height:0;border-width:0 40px 40px;border-style:solid;border-color:black;border-color:transparent transparent red;}
// div:after{content:'';position:absolute;top:1px;left:-38px;border-width:0 38px 38px;border-style:solid;border-color: transparent transparent green;}// 带边框

// .wrapper{height:0;width:0;border-top:50px solid red;border-bottom:50px solid transparent;border-left:50px solid transparent;border-right:50px solid transparent;}

// .wrapper{width:300px;height:300px;background:red;clip-path:polygon(40px 0,80px 40px,40px 100px)}


// 合并表格边框
// table{border-collapse:collapse;}



// css选取第n个元素
// *:first/last-child{}
// *:nth-child(n){}
// *:nth-child(2n){}// 偶数
// *:nth-child(2n+1){}// 奇数
// *:nth-child(n+3){}// from 3 to n
// *:nth-child(-n+3){}// from 0 to 3
// *:nth-last-child(3){}// 倒数第3个



// 移动端软件变为搜索方式
// 默认情况下软件键盘上该键位为前往或确认等文字，要使其变为搜索文字，需要在input上加上type="search"声明。
// <form action="#"><input type="search" placeholder="请输入..." name="search"/></form>



// onerror处理图片异常
// <img onerror="this.src='url;this.onerror=null'"/>



// 背景图片的太小
// .box-img{backgrond:url(../images/) no-repeat center center !important;background-size:20px auto !important;}



// 文字之间的距离和抬头距离
// div{letter-spacing:2px;text-indent:36px;}



// 文字两端对齐
// .wrap{text-align:justify;text-justify:distribute-all-lines;// IE6-8 text-align-last:justify;// 一个块或行的最后一行对齐方式 -moz-text-align-last:justify;-webkit-text-align-last:justify;}



// 文字竖向排版
// .wrap{height:210px;line-height:30px;text-align:justify;writing-mode:vertical-lr;// left to right //tb-lr(IE) }



// 使元素鼠标事件失效
// .wrap{pointer-event:none;cursor:default;}



// 禁止用户选择
// .wrap{
//   -webkit-touch-callout:none;
//   -webkit-user-select: none;
//   -khtml-user-select: none;
//   -moz-user-select: none;
//   -ms-user-select: none;
//   user-select: none;
// }




// css使用硬件加速GPU，不适用3D变形
// .wrap{transform:translateZ(0);}



// 页面动画出现闪烁transform 或 animations
// .cube{-webkit-backface-visibility:hidden;backface-visibility:hidden;-webkit-perspective:1000;perspective:1000;}
// 只有-webkit生效
// .cube{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0);}



// 字母大小写转换
// div{text-transform:capitalize;font-variant:small-caps;}


// 容器透明
// .wrap{filter:alpha(opacity=50);-moz-opacity:0.5;-khtml-opacity:0.5; opacity:0.5;}




// 消除transition闪屏
// .wrap{-webkit-transform-style:preserve-3d;-webkit-backface-visibility:hidden;-webkit-perspective:1000;}



// 识别字符串里的'\n'并换行
// body{white-space:pre-line;}


// 移除a标签被点击链接的边框
// a{outline:0/none;text-decoration:none;}



// css显示链接之后的URL
// <a href="http://www.apishop.net">text</a>
// a:after{content:" (" attr(href) ")";}



// select内容居中显示、下拉内容右对齐
// .select{text-align: center;text-align-last:center;}
// .option{direction:rtl;}



// 子元素固定宽度，父元素宽度被撑开
// 父元素下子元素为块级元素
// .wrap{white-space: nowrap;display:inline-block;}
// 父元素下子元素为行内元素
// .wrap{white-space: nowrap;}



// div里面的图片和文字同时上下居中
// .wrap{height:100;line-height:100;}
// img{vertical-align: middle;}



// 实现宽高等比例自适应矩形
// .scale{width:100%;padding-bottom:56.25%;height:0;position:relative;}
// .item{position:absolute;width:100%;height:100%;}



// transform的rotate属性在span标签下失效
// span{display:inline-block;}



// css加载动画
// .loader{-webkit-animation:circle 1s infinite linear;}
// @keyframes circle{0%{transform:rotate(0deg);} 100%{transform:rotate(360deg);} }




// 文字渐变
// .text-signature{width:300px;-webkit-background-clip:text;-webkit-text-color:transparent;background-image:linear-gradient(to right, #ec2239,#40a4e2,#ea96f5);}



// 好看的边框阴影
// .wrap{box-shadow:0 0 13px 1px rgba(51,51,51,0.1)}



// 好看的背景渐变
// .text_gradient{
// width:500px;height: 100px;
// background: linear-gradient(25deg， rgb(79，107，208)，rgb(98，141，185)，rgb(102，175，161)，rgb(92，210，133)) rgb(182，228，253);
// }



// 实现立体字效果
// .text_solid{
// font-size: 32px;
// text-align: center;
// font-weight: bold;
// line-height:100px;
// text-transform: uppercase;
// position: relative;
// background-color:#333;
// color:#fff;
// text-shadow:
// 0px 1px px #c0c0c0,
// 0px 2px px #b8b0b0 ,
// 0px 3px px #a0a0a0,
// 0px 4px 0px #909090,
// 0px 5px 10px rgba(0, 0，0，0.6);
// }



// 实现全屏背景图片
// .wrap{background-image: url(./png);width:100vw;height:100vh;zoom:1;background-color:#fff;background-repeat:no-repeat;background-position:center 0;background-size:cover;-webkit-background-size:cover;-o-background-size:cover;}


// 实现文字描边的2种方法
// 方式一:
// .stroke{-webkit-text-stroke: 1px greenyellow;text-stroke: 1px greenyellow;}
// 方式二:
// .stroke {
// text-shadow;#000 1px 0 0,#000 0 1px 0,#000 -1px 0 0,#000 0 -1px 0;
// -webkit-text-shadow; #000 1px 0 0, #000 0 1px 0,#000 -1px 0 0,#000 0 -1px0;
// -moz-text-shadow:#000 1px 0 0, #000 0 1px 0,#000 -1px 0 0,#000 0 -1px 0;
// *filter: Glow(color=#000,strength=1);
// }



// 元素透明度的实现
// .dom { opacity: 0.4; filter: alpha(opacity = 40); /* 工8及早版本 */ }
// 使用rgba() 设置颜色透明度。
// .demo { background: rgba(255, 0, 0, 1);
// 说明: RGBA是代表Red(红色) Green(绿色) Blue(蓝色） 和Alpha(不透明度) 三个单词的缩写。


// 解决1px边框变粗问题
// .dome{ height: 1 px; background: #dbdbdb; transform:scaleY(0.5); }



// calc(100% - 50px)



// 实现文字模糊
// .text-vague{color: transparent;text-shadow:#111 0 0 5px;}


// 通过滤镜让图标变灰
// -张彩色的图片就能实现鼠标移入变彩色，移出变灰的效果。
//<a href='' class= 'icon' ><img src='01.jpg'/></a>
// .icon{
// -webkit-filter: grayscale( 100%);
// -moz-filter: grayscale (100%);
// -ms-filter: grayscale(100%);
// -o-filter: grayscale(100%);
// filter: grayscale(100%);
// filter: gray;
// }
// .icon:hover{
// filter: none;
// -webkit-filter: grayscale(0%);
// }



// 图片自适应object-fit
// 当图片比例不固定时，想要让图片自适应，一般都会用background-size:cover/contain，但是这个只适用于背景图。css3中可使用object-fit属性来解决图片被拉伸或是被缩放的问题。使用的提前条件:图片的父级容器要有宽高。
// img{width:100%,height:100%;object-fit:cover;}
// fill:默认值。内容拉伸填满整个content box,不保证保持原有的比例。contain:保持原有尺寸比例。长度和高度中长的那条边跟容器大小一致，短的那条等比缩放，可能会有留白。cover:保持原有尺寸比例。宽度和高度中短的那条边跟容器大小一致,长的那条等比缩放。可能会有部分区域不可见。(常用) none:保持原有尺寸比例。同时保持替换内容原始尺寸大小。scale-down:保持原有尺寸比例,如果容器尺寸大于图片内容尺寸，保持图片的原有尺寸，不会放大失真;容器尺寸小于图片内容尺寸，用法跟contain—样。



// 行内标签元素出现间隙问题

// 方式一:父级font-size设置为0
// .father{font-size:0;}

// 方式二:父元素上设置word-spacing的值为合适的负值
// .father{ word-spacing: -2px;}
// 其它方案: 1 将行内元素写为1行(影响阅读);2 使用浮动样式（(会影响布局)。




// 解决vertical-align属性不生效
// 在使用vertical - align: middle实现垂直居中的时候， 经常会发现不生效的情况。 这里需要注意它生效需要满足的条件:
// 作用环境: 父元素设置line - height。 需要和height一致。 或者将display属性设置为table - cell， 将块元素转化为单元格。
// 作用对象: 子元素中的inline - block和inline元素。 <
//     div class = "box" >
//     <img src = " ./test.jpg" / > < span > 内部文字 < /span></div >
//  .box{
// width: 300 px;
// line - height: 300 px;
// font - size: 16 px;
// }
//     .box img{
// width: 30 px;
// height: 30 px;
// vertical - align: middle;}
//     .box span{
// vertical - align: middle
// }












// 首字母掉落

//效果：M： My name is topskys 

// 可以使用:first-letter删除文本的第一个字母

// like:

// p: first - letter { // 指定首字母

//         font - size: 200 % ;

//         color: # 8 a2be2;
// }

// shape-outside： 设置形状
// wekit - shape - outside: polygon(0 0,100% 100%, 0 100%);

// :while()：简化代码
// .page :while(div,.title,#article){}

// 透明图像的阴影drop-shadow

// steps()：分割文本动画，在@keyframes使用

// cursor：自定义光标cursor:url('imgUrl'),auto;

// 实现三栏布局的7种方法：左中右
// float+calc()
// float+margin负值
// 圣杯布局：利用float，外边距负值和相对定位来实现
// 绝对定位实现
// 弹性布局flex：左右两栏固定宽度，中间栏flex:1
// 网格布局grid：固定左右两栏宽度，中间栏为auto，grid-template-columns:200px auto 200px;










// HTML
// 捕获属性打开设备摄像头
// <input type="file" capture="user" accept="image/*"/>

// 网站自动刷新
// 10s刷一次
// <head><meta http-equiv="refresh" content="10"></meta></head>

// 激活拼写检查
// <input type="text" spellcheck="true" lang="en"/>

// 指定要上传的文件类型
// <input type="file" accept=".jpeg,.png"/>

// 在input输入多个条目
// <input type="file" multiple/>

// 防止翻译
// <p translate="no">Topsky</p>

// 创建一个视屏海报（缩略图）
// <video poster="img"></video>

// 点击链接自动下载
// <a href="file" download/>


// 特殊实用标签

// 水平居中 or text-align:center;
//<center></center>

// abbreviations，缩写，给文章添加注释
// <abbr title="Daily Active User">DAU</abbr><span>，日活跃用户数，......</span>

// 高亮（黄色）
// <mark>高亮文本</mark>

// sup、sub，分别表示文字的上下表，主要利用vertical-align的top和sub属性值，再缩小字号。
// <div>3<sup>[2]</sup></div>
// <div>4<sub>2</sub></div>

// figure，对于文本的描述
// <figure><img src="http://placehold.it/"></img><figcaption>对img描述</figcaption></figure>

// progress
// <progress min="0" max="100" step="1" value="60"></progress>

// area，为图片提供点击热区，需要搭配map使用

// details，该标签包裹的内容默认隐藏，只留下一个简述的文字
// <details><summary>点击查看详情</summary><p>被隐藏的内容</p></details>

// dialog，浏览器自带弹窗alert，confirm，prompt，会阻塞页面运行，还提供了一个dialog，类似各大组件库的modal，其方法有showModal、close。

// datalist，用于给输入框提供可选值的一个列表标签，类似SELECT组件，可实现“输入联想”功能。
// <label>输入：</label><input></input><datalist><option value="1"></option></datalist>

// fieldset，用于分组管理form表单内的元素
// <form action='url'><fieldset disabled><legend>被禁用区域</legend> </fieldset> </form>

// noscript，在浏览器不支持或禁用JavaScript时展示该标签
// <noscript>浏览器不支持或禁用JavaScript，请更换浏览器or启用js</noscript>















// 正则表达式

// 数字相关
// 正数 / 负数 / 小数: 
var reg = /^(\-|\+ )?\d + (\.\d + )?$/
// 正实数保留小数点后2位: 
reg = /^[0-9]+(.[0-9]{23})?$/
// 正实数保留小数点后1到3位: 
reg = /^[0-9]+(.[0-9]{1,3})?$/
// n位数字: 
reg = /^\d{n}$/
// 至少n位数字: 
reg = /^\d{n,}$/
// m至n位的数字: 
reg = /^\d{n,m]$/
// 数字和字母至少包含其—: 
reg = /^[A-Za-z0-9]+$/
// 必须包含数字和字母: 
reg = /^(?=.*[a-zA-Z])(?=.*\d).+$/
// md5值: 
reg = /^([a-f\d]{32}|[A-F\d]{32})$/
// base64值: 
reg = /^\s*data:(?:[a-z]+\/[a-z0-9-+.]+(?:;[a-z-]+=[a-z0-9-]+)?)?(?:;base64)?,([.a-z0-9!$&',()*+;=\-._~:@/?%\s]*?)\s*$/i

// 只有数字: 
reg = /^[0-9]*$/
reg = /^\d{1,}$/
// 整数: 
reg = /^-?[0-9]\d*$/
// 正整数: 
reg = /^+?[1-9]\d*$/
// 非正整数: 
reg = /^-[1-9]\d*|0$/
// 负整数: 
reg = /^-[1-9]\d*$/
// 非负整数: 
reg = /^ld+$/
// 浮点数: 
reg = /^(-?\d+) (\.\d+)?$/
// 正浮点数: 
reg = /^[1-9]\d*\.\d|0\.\d*[1-9]\d*$/
// 负浮点数: 
reg = /^-([1-9]\d*\.\d*|0\.\d*[1-9]\d*)/
// 小数: 
reg = /^-?\d+\.\d+$/

// 号码相关
// 合法账号1(字母开头，5-16位，允许字母数字下划线)∶
reg = /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/
// 合法账号2(4-16位，允许字母，数字，下划线，减号):
reg = /^[8-zA-Z0-9_-]{4,16}$/
// 强密码1(必须包含大小写字母和数字的组合，不能使用特殊字符，长度在8-10之间):
reg = /^(?=.*\d)(?=.*[a-=])(?=.[A-Z]).{8,10}$/
// 强密码2(必须包含字母、数字、特殊字符:**@#$%^&“~()-+=* ) : /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\w_!@=$%^&*~()-+=]+$)(?![a-z0-9]+$)(?!.[8-zNM_!@#5%8^温*()-+=]+$)(?i[e-9Mw_!@#$x8~()-+=]+$)[a-zA-20-a1w_I@#$3^8*~()-+=]/
//网址: 
reg = /^(((ht|f)tps?):\/\/)?(^!@#$%^&*?.\s-?\.)+[a-z]{2,6}\/?/
//网址带端口号:
reg = /^((ht|f)tps?:\/\/)?[\w-]+(\.[\w-]+)+:\d{1,5}\/?$/
//ip-v4: 
reg = /\\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9][01]?[0-9][0-9]?)\\b/
//ip-v6: /([O-9a-fA-F][(1,4]:)[7,7][0-9a-fA-F][1,4}|([0-9a-fA-F][1,4}:)[1,7]:|([0-9a-fA-F](1,4}:)(1,6]:[0-9a-fA-F](1,4}([0-9a-fA-F](1,4]:){1,5](:[0-9a-fA-F][1,4]){[1,2]l([0-9a-fA-F]{1,4}:){1,4)( :[0-9a-fA-F][1,4))1,3}|([0-98-fA-F][1,4):){1,3)(:[0-98-fA-F][1,4))(1,4]([0-98-fA-F][1.4]:)[1,2]K:[0-9a-fA-F][1,4))[1.5]][0-9a-fA-F][1,4]:((:[0-9a-fA-F][1.4))(1,6]):((:[0-9a-fA-F][1,43])[1.7] :)|fe8o:( : [0-9a-fA-F][0,4)){0,4]8[0-98~zA-Z][1,]::(ffff(:0[1,4))(0.1):)(0,1]((25[0-5]](2[0-4][1{0,1][0-9]){0,1][0-9])1I.)(3,3](25[0-5][(2[0-4][1[0,1][0-9]){0,1][0-9])/([0-9a-fA-F][1,4]:)(1,4]:((25[0-5]](2[0-4][1{0,1][0-9]){0,1][0-9])1.){3,3])(25[0-5][(2[0-4][10,1][e-9]){0,1][e-9]))/
//手机号(以1开头) : 
reg = /^(?:(?:\+|00)86)?1\d{10}$/
//手机号(以13至19开头) :
reg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
// 手机号（以工信部公布的手机号段开头)︰
reg = /^(?:(?: \+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/
// 国内固话号码: 
reg = /\d[3]-\d{8}|\d{4}-\d{7}/
// 邮箱号: 
reg = /^\w+([-+.]\w+)*@\w+)*\.\w+([-.]\w+)*$/
//邮政编码: 
reg = /[1-9]\d{5}(?!\d)/
// 身份证号: 
reg = /^[1-9]\d[{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/
//  ·银行卡号（(公、 私账户): 
reg = /^[1-9]\d{9,29}$/
// 车牌号:
reg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘香蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z][A-HJ-NP-Z0-9]{4,5}[A-HJ-NP-z0-9桂学警港典]$/
// QQ号: 
reg = /^[1-9][0-9]{4,10}$/
// 微信号: 
reg = /^[a-zA-Z][-_a-zA-Z0-9]{5,19}$/
// 版本号〔 x.y.z): 
reg = /^\d+(?:\.\d+){2}$/

// 生活相关
// 金额（宽松，可为负、首位可为0，支持千分位分隔)︰
reg = /^-?\d+(,\d{3})*(\.\d{1,2})?$/
// 金额(大于0，两位小数):
reg = /(^[1-9]{1}[0-9]*$)|(^[0-9]*\.[0-9]{2}$)/
// 金额(严格，不为负、小数点后最多两位，首位不为0):
reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
// 护照:
reg = /(^[EeKkGgDdSsPpHh]\d{8}$)|(^(([Ee][a-fA-F])|([DdSsPp][Ee])|([Kk][Jj])|([Mm][Aa])|(1[45]))\d{7}$)/
// 香港身份证:
reg = /^[a-zA-Z]\d{6}\([\dA]\)$/
// 澳门身份证:
reg = /^[1|5|7]\d{6}\(\d\)$/
// 湾湾身份证: 
reg = /^[a-zA-Z][0-9]{9}$/
// 股票代码: 
reg = /(s[hz]|5[Hz])(000[\d]{3}|002[\d]{3}|300[\d]{3}|600[\d]{3}|60[\d]{4})$/
//  不含 abc的单词: 
reg = /\b((?!abc)\w)+\b/

// 编程相关
// 提取页面超链接: reg = /(<a\\s*(?!.*\\brel=)[^>]*)(href="https?:\\/\\ / )(( ? !( ? : ( ? : www\.) ? * .implode('|(?:www\.)?*,$follow_list).'))['”rel-" external nofollow”]+ )"(?1."1 brel-)[*>]*)(?:[*>]*)>/
// 提取网页图片:
reg = /\\<"[img][^\\\\>]*[src]*=*[\\"\\']{0,1}([^\\"\\'\\>]*)/
// 迅雷链接: 
reg = /^thunder:\/\/[a-zA-Z0-9]+$/
// ed2k链接: 
reg = /^ed2k:\/\/|file|.+|\/$/
// linux "文件"路径: 
reg = /^\/(\w+\/)+\w+\.\w+$/
// window下 "文件"路径: 
reg = /^[a-zA-Z]:\\(?:\w+\\)*\w+\.\w+$/
// 进制颜色: 
reg = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/
// 提取网页颜色代码: 
reg = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
// 视频链接地址: 
reg = /^https?:\/\/(.+\/)+.+(\.(swf\avi|flv|mpg|rm|mov|wav|asf|3gp|mkv|rmvb|mp4))$/
// 图片链接地址: 
reg = /^https?:\/\/(.+\/)+.+(\.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif))$/i
// mac地址: 
reg = /^((([a-f0-9]{2}:){5})|(([a-fo-9]{2}-J{5}))[a-f0-9]{2}$/i
// 子网掩码: 
reg = /^((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))$/
// 文件扩展名效验: 
reg = /^([a-zA-Z]\\:|\\\\)\\\\([^\\\\]+\\\\)*[^\\/:*?"<>|]+\\.txt(1)?$/
// java包名(x.x.x): 
reg = /^([a-zA-Z_]\w*)+([.][a-zA-Z_]\w*)+$/
// xml文件: 
reg = /^([a-zA-Z]+-?)+[a-zA-Z0-9]+\\.[x|X][M][l|L]$/
// html注释: 
reg = /<!--[\s\S]*?-->/g
// html标签1: 
reg = /<(\w+)[^>]*>(.*?<\/\l>)?/
// html标签2: 
reg = /<(\S*?)[^>]*>.*?<\/\l>|<.*?\/>/
// 首尾空白字符: 
reg = /^\\s*|\s*$/
// 查找CSS属性: 
reg = /^\\s*[a-zA-Z\\-]+\\s[:]{1}\\s[a-zA-Z0-9\\s.#]+[;]{1}/

// 字符相关
// m至n位的字符: 
reg = /^.{3,20}$/
// 英文字母字符: 
reg = /^[A-Za-z]+$/
// 大写英文字母字符: 
reg = /^[A-Z]+$/
// 小写英文字母字符: 
reg = /^[a-z]+$/
// 汉字: 
reg = /^[\u4e00-\u9fa5]{0,}$/
// 全角符号:
reg = /[\uFF00-\uFFFF]/
// 半角符号: 
reg = /[\u0000-\u00FF]/
// 汉字、 英文、 数字、 下划线至少其一: 
reg = /^[\u4E00-\u9FA5A-Za-z0-9_]+$/
// 不包含字符“~”: 
reg = /[^~\x22]+/
// 字符连续重复: 
reg = /(.)\l+/
// 时间相关








// Docs

// DEvDocs ：它将不同语言、框架和库的API汇聚到了一个网页上，可直接在一个面进行搜索
// roadmap.sh ：学习路径和学习资料
// daily.dev
// Showwcase ：专注于开发者领域
// CSS-TRICKS ：美化Web应用，学习css技巧





// Tools

// ray.so ：该网站能够生成漂亮的代码片段的截图
// Poet.so
// LambdaTest ：测试平台
// Code Beautify ：需上传code，美化code
// overAPI ：聚集大多数开发语言和工具api
// Color Hunt ：配色
// Meta Tags ：国际化开发
// Dev Tools : 聚集开发工具
// iHateRegex：正则表达式



// 图表
// echarts
// antV


// Codesandbox在线编译器



// icon

// iconPark
// Font Awesome
// Bootstrap Icons





// 组件UI

// 富文本编辑器
// Tiptap
// Quill.js
// TinyMCE
// CKEditor












// API集合


// 生活常用
// 常见疾病查询: https://www.apishop.net/#/api/detail/?productlD=215
// 全国天气预报:https://www.apishop.net/#/api/detail/?productlD=76
// 今日热闻查询:https://www.apishop.net/#/api/detail/?productlD=92
// 邮编查询: https://www.apishop.net/#/api/detail/?productlD=73
//  实时空气质量数据查询: https://www.apishop.net/#/api/detail/?productID=83
// 邮编查询:https://www.apishop.net/#/api/detail/?productlD=73
// 成语大全: https://www.apishop.net/#/api/detail/?productlD=93
// 万年历查询: https: //www.apishop.net/#/api/detail/?productiD=89
// 二十四节气查询:https://www.apishop.net/#/api/detail/?productID=88
// 节假日查询:https://www.apishop.net/#/api/detail/?productlD=90
// PM2.5 空气质量指数查询: https://www.apishop.net/# / api / detail / ? productID = 94
// 标准中文电码查询 : https://www.apishop.net/#/api/detail/?productID=96
// BMI计算: https://www.apishop.net/#/api/detail/?productiD=104
// 区号查询: https://www.apishop.net/#/api/detail/?productlD=106

// 吴乐
// 菜谱大全: https://www.apishop.net/#/api/detail/?productlD=171
// 新华字典: https://apistore.eolinker.com/#/api/detail/?productlD=98
// NBA赛事:https://www.apishop.net/#/api/detail/?productlD=125
// 周公解梦:https://www.apishop.net/#/api/detail/?productlD=126

// 电商服务
// 快递物流查询: https://www.apishop.net/#/api/detail/? productlD=103
// 短信服务（验证码、通知》:
// 淘宝热词搜索: https://www.apishop.net/#/api/detail/?productlD=212
// 京东热词搜索:https://www.apishop.net/#/api/detail/?productlD=211
// 商品评价分析:https://www.apishop.net/#/api/detail/?productiD=208

// 人工智能
// OCR身份证识别: https://www.apishop.net/#/api/detail/?productiD=186
// OCR-营业执照识别:https://www.apishop.net/#/api/detail/?productID=196
// oCR-行驶证识别:https://www.apishop.net/#/api/detail/?productID=197
// 银行卡识别:https://www.apishop.net/#/api/detail/?productiD=205
// 名片识别:https://www.apishop.net/#/api/ detail/?productID=206
// 车牌识别:https://www.apishop.net//api/detail/? productlD=207

// 交通出行
// 公交及站点查询: https://apistore.eolinker.com/#/api/detail/? productID=77
// 经纬度地址转换:https://apistore.eolinker.com/#/api/detail/?productlD=78
// 中国省市区查询: https://apistore.eolinker.com/#/api/detail/?productID=75
// POI检索:https://apistore.eolinker.com/#/api/detail/?productID-=97
// 公交、 地铁路线规划查询: https://apistore.eolinker.com/#/api/detail/? productlD=105
// 车型大全:https://apistore.eolinker.com/#/api/detail/?productID=117
// 火车票查询: https://www.apishop.net/#/api/detail/?productlD=91
// 长途汽车查询:https://www.apishop.net/#/api/detail/?productiD=100
// 汽车尾号限行:https://www.apishop.net/H/api/ detail/?productID=194
// 驾考题库:https://www.apishop.net/#/api/ detail/?productlD=187

// 开发工具
// 四位图片验证码生成: https://www.apishop.net/#/api/detail/?productID=102
// 六位图片验证码生成:https://www.apishop.net/#/api/detail/?productlD=101
// 中文分词:https://www.apishop.net/#/api/detail/?productID=120
// 二维码编解码: https://www.apishop.net/#/api/detail/?productID=128
// 网站排名查询:https://www.apishop.net/#/api/detail/?productID=214

// 金融服务
// 汇率查询: https://www.apishop.net/#/api/detail/?productlD=84
// 虚拟货币交易行情: https://www.apishop.net/#/api/detail/?productlD=182
// 区块链今日快讯:https://www.apishop.net/#/api/detail/?productiD=185
// 银行卡信息查询(含归属地): https: /www.apishop.net/# / api / detail / ? productID = 191

// 通讯服务
// 手机号归属地查询: https://www.apishop.net/#/api/detail/?productilD=72
// IP地址查询:https://www.apishop.net/t/api/detail/?productiD=118


// 教育文化· 成语大全: https: //www.apishop.net/#/api/detail/?productID=93
// 新华字典:https://www.apishop.net/#/api/detail/?productID=98
// 汉语词典:https://www.apishop.net/#/api/detail/?productlD=99
// 名言警句: https://www.apishop.net/#/api/detail/?productlD=123
// 英语名言:https://www.apishop.net/#/api/detail/?productiD=124
// 驾驶员从业资格题: https://www.apishop.net/#/api/detail/?productlD=190
// 猫咪大全:https://www.apishop.net/#/api/detail/?productID=193
// 狗狗大全: https://wrww.apishop.net/#/api/detail/?productlD=192
// 小型宠物大全:https://www.apishop.net/#/api/detail/?productlD=195
// 水族宠物大全:https://www.apishop.net/#/api/detail/?productlD=200
// 爬行类宠物大全:https://www.apishop.net/#/api/detail/?productID=201
// 植物大全:https://www.apishop.net/#/api/detail/? productiD=199

// 聚合数据
// 手机号码归属地API接口: https://www.juhe.cn/docs/api/id/11
// 历史上的今天API接口:https://www.juhe.cn/docs/api/id/63
// 股票数据 API接口:https://www.juhe.cn/docs/api/id/21
// 全国WIFI接口:https://www.juhe.cn/docs/api/id/18
// 星座运势接口:https://www.juhe.cn/docs/api/id/58
// 黄金数据接口:https://www.juhe.cn/docs/api/id/29
// 语音识别接口:https://www.juhe.cn/docs/api/id/134
// 天气预报API接口:https://www.juhe.cn/docs/api/id/73
// 身份证查询 API接口:https://www.juhe.cn/docs/api/id/38
// 笑话大全API接口:https://www.juhe.cn/docs/api/id/95
// 邮编查询接口:https://www.juhe.cn/docs/api/id/66
// 网站安全检测接口:https://www.juhe.cn/docs/api/id/19
// 手机固话来电显示接口:https://www.juhe.cn/docs/api/id/72
// 基金财务数据接口:https://www.juhe.cn/docs/api/id/28
// 成语词典接口:https://www.juhe.cn/docs/api/id/157
// 新闻头条接口:https://www.juhe.cn/docs/api/id/235
// IP地址接口:https://www.juhe.cn/docs/api/id/1
// 汇率API接口:https://www.juhe.cn/docs/api/id/80
// 电影票房接口:https://www.juhe.cn/docs/api/id/44
// 万年历API接口:https://www.juhe.cn/docs/api/id/177
// NBA赛事接口:https://www.juhe.cn/docs/api/id/92