'use strict';


const main = () => {
    // 在列表页面
    if (document.querySelector('.index-container')) {
        // 获取页面中的作品列表
        const titleList = document.querySelectorAll('.gallery')

        // 抽取列表中的 ID 号码，生成新列表
        let idList = []
        titleList.forEach((item, i) => {
            const id = item.querySelector('a').href.match(/(?!g\/)\d+/g)[0]
            idList.push([id, i])
        })

        // 列表项逐个和 localStorage 中的号码对照
        idList.map((item) => {
            const id = item[0]
            let ele = titleList[item[1]]
            if (localStorage.getItem(id)) {
                const className = localStorage.getItem(id)
                    //// 已经有的进行标记
                ele.classList.add(className)
            } else(
                //// 还没有的加入 localStorage
                localStorage.setItem(id, 'browsed')
            )
        })
    } else if (document.querySelector('#bigcontainer')) {
        // 在作品页面
        // url format: https://nhentai.net/g/123456/1/ => split('/') => ["", "g", "123456", "1"]
        const id = document.querySelector('#cover>a').href.split('/')[4]
        if (localStorage.getItem(id)) {
            const className = localStorage.getItem(id)
            console.log('shwo the claaName: ' + className)
            if (className != 'downloaded') {
                localStorage.setItem(id, 'visited')
            }
            document.querySelector('#info').classList.add(className)
        } else {
            localStorage.setItem(id, 'visited')
        }
    }
};

const setStyle = () => {
    let style = document.createElement('style');

    const css = `
        #content .browsed .caption,
        .browsed > h1 {
            background: #d4b106;
            color:#fff;
        }
        #content .visited .caption,
        .visited > h1 {
            background: #1890ff;
            color:#fff;
        }
        #content .downloaded .caption,
        .downloaded > h1 {
            background: #389e0d;
            color:#fff;
        }
    `;

    style.innerHTML = css;

    document.body.appendChild(style);
}