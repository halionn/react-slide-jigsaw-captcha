import { get } from './get'
import { post } from './post'
import "regenerator-runtime/runtime"

//export const getJigsawImagesUrl = () => get('/api/jigsaw/get')

// export const validate = (id, distance) =>
//     post('/api/jigsaw/validate', {
//         id,
//         distance
//     })

export const getJigsawImagesUrl = async () => {
    try {
        let fetchResult = await get('/api/jigsaw/get')
        return await fetchResult.json()
    } catch (e) {
        console.log('获取拼图url出错')
    }
}

export const validate = async (id, distance) => {
    try {
        let fetchResult = await post('/api/jigsaw/validate', {
            id,
            distance
        })
        return await fetchResult.json()
    } catch (e) {
        console.log('验证拼图坐标出错')
    }
}