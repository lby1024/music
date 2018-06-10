const state = {
    name: '歌曲列表',
    top: null,              // 滚动条的top值,
    type: 'rank',           // 这是rank的详情页, 还是歌手的详情页面
    info: null              // 详情页面的标题信息, 详请页面的背景图
}

const mutations = {
    // 滚动详情页列表时, 改变state.top值, 背景图片放大缩小用
    set_detail_top (state, payload) {
        state.top = payload
    },
    // 这是rank的详情页, 还是歌手的详情页面
    set_detail_type (state, payload) {
        state.type = payload
    },
    // 设置详情页面的title,背景图
    set_detail_info (state, payload) {
        state.info = payload
    }
}

const detail={
    state,mutations
}

export default detail
