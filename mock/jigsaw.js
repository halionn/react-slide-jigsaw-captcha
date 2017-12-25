let jigsawCache = null

const validate = (id, distance) => {
    let percentage = parseFloat(distance)
    //console.log(percentage)
    let matched = false
    if (jigsawCache.id && jigsawCache.id == id) {
        switch (id) {
            case '0x70c8323f03f651': // 0.28
                matched = percentage > 0.23 && percentage < 0.33
                break
            case '0x70c8323f03f652': // 0.77
                matched = percentage > 0.72 && percentage < 0.82
                break
            case '0x70c8323f03f653': // 0.61
                matched = percentage > 0.56 && percentage < 0.66
                break
            case '0x70c8323f03f654': // 0.25
                matched = percentage > 0.2 && percentage < 0.3
                break
            case '0x70c8323f03f655': // 0.42
                matched = percentage > 0.37 && percentage < 0.47
                break
            default:
                break
        }
    }
    return matched ? { code: 1 } : { code: -1 }
}

const generateJigsaw = () => {
    // 1-5的随机整数
    let index = Math.floor(Math.random() * 5 + 1)
    const jigsaw = {
        //id: +new Date(),
        id: `0x70c8323f03f65${index}`,
        bgUrl: `http://10.11.19.176:8080/images/bg${index}.jpg`,
        jigsawUrl: `http://10.11.19.176:8080/images/jigsaw${index}.png`
    }
    jigsawCache = jigsaw
    return jigsaw
}

module.exports = {
    generateJigsaw,
    validate,
}


