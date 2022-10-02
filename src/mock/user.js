/*
 * @Author: Topskys
 * @Date: 2022-09-28 20:46:00
 * @LastEditTime: 2022-10-02 10:20:12
 */
import Mock from 'mockjs'


function param2Obj(url) {
    const search = url.split('?')[1]
    if (!search) {
        return {}
    }
    return JSON.parse(
        '{"' +
        decodeURIComponent(search)
            .replace(/"/g, '\\"')
            .replace(/&/g, '","')
            .replace(/=/g, '":"') +
        '"}'
    )
}


var List = []
const count = 200

for (let i = 0; i < count; i++) {
    List.push(
        Mock.mock({
            id: Mock.Random.guid(),
            name: Mock.Random.cname(),// 随机产生一个中文的姓名
            addr: Mock.mock('@county(true)'), // 随机生成一个地址
            'age|18-60': 1, // 随机生成一个数字 大小在18到60
            birth: Mock.Random.date(),
            sex: Mock.Random.integer(0, 1),
            email: Mock.mock('@email'), // 随机生成一个邮箱
        })
    )
}



export default {
    /**
     * 获取用户列表
     */
    getUserList: config => {
        const { name, page = 1, limit = 5 } = param2Obj(config.url)
        // console.log('name: ' + name, 'page: ' + page, 'limit: ' + limit)
        const mockList = List.filter(user => {
            if (name && user.name.indexOf(name) === -1 && user.addr.indexOf(name) === -1) return false
            return true
        })
        const pageList = mockList.filter((item, index) => index < (limit * page) && index >= limit * (page - 1))
        return {
            code: 200,
            data: {
                count: mockList.length,
                list: pageList,
                msg: '查询成功',
                success: true,
            }
        }
    },

    /**
     * @description: 新增用户
     * @return {*}
     */
    createUser: config => {
        const { name, addr, age, birth, sex } = JSON.parse(config.body)
        List.unshift({
            id: Mock.Random.guid(),
            name: name,
            addr: addr,
            age: age,
            birth: birth,
            sex: sex
        })
        return {
            code: 200,
            data: {
                msg: "添加成功",
                success: true,
            }
        }
    },

    /**
     * @description: 删除用户
     * @return {*}
     */
    deleteUser: config => {
        const { id } = param2Obj(config.url)
        if (!id) {
            return {
                code: 400,
                data: {
                    msg: "请求参数错误",
                    success: false,
                }
            }
        } else {
            List = List.filter(u => u.id !== id)
            return {
                code: 200,
                data: {
                    msg: "删除成功",
                    success: true,
                }
            }
        }
    },

    /**
     * @description: 批量删除
     * @return {*}
     */
    batchRemove: config => {
        let { ids } = param2Obj(config.url)
        ids = ids.split(",")
        List = List.filter(u => !ids.includes(u.id))
        return {
            code: 200,
            data: {
                msg: "批量删除成功",
                success: true,
            }
        }
    },
    /**
     * @description: 修改用户
     * @return {*}
     */
    updateUser: config => {
        const { id, name, addr, age, birth, sex } = JSON.parse(config.body)
        const sex_num = parseInt(sex)
        List.some(u => {
            if (u.id === id) {
                u.name = name
                u.addr = addr
                u.age = age
                u.birth = birth
                u.sex = sex_num
                return true
            }
        })
        return {
            code: 200,
            data: {
                msg: "编辑成功",
                success: true,
            }
        }
    }
}