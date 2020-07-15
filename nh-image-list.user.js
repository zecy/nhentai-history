'use strict';

// @flow
const main = () => {

    // 定义插入按钮
    const hasInfoBlock: null | HTMLElement = document.getElementById('info');
    let infoBlock: HTMLElement;
    if (hasInfoBlock) {
        infoBlock = hasInfoBlock;
    } else {
        alert('\n\nnHentai 下载脚本错误：\n\n\n　　插入按钮出错，请查看页面源码是否进行了更新。\n\n');
        return
    }

    let btnArea: HTMLCollection < HTMLElement > = infoBlock.getElementsByClassName('buttons');

    const btn: string = '<button id="getimglist" type="button" class="btn btn-primary" onclick="insertList();">点击获取图片链接</button>';
    btnArea[0].innerHTML = btnArea[0].innerHTML + btn;

    // 获取链接列表
    const getImageLinks = () => {
        // 获取链接
        const rawImgLinks: HTMLCollection < HTMLImageElement > = (document.querySelectorAll('.gallerythumb > img'): any);
        const linkPattern: RegExp = /https:\/\/t.nhentai.net\/galleries\/(\d+)\/(\d+)t.(jpg|png)/;

        let imgLinks: Array < string > = Array.from(rawImgLinks).map((imgLink: HTMLImageElement) => {
            let rawLink: string;
            if (!linkPattern.test(imgLink.src)) {
                rawLink = imgLink.dataset.src
            } else {
                rawLink = imgLink.src
            }
            const link: string = rawLink.replace(linkPattern, "https://i.nhentai.net/galleries/$1/$2.$3");
            return link;
        });

        return imgLinks;
    };

    // 获取链接列表
    const imglist: string = getImageLinks().join('<br>');

    // 链接注入当前网页
    const insertList = () => {
        // 列表框定位
        //// 父元素
        const hasContent: null | HTMLElement = document.getElementById('content');
        let content: HTMLElement;
        if (hasContent) {
            content = hasContent;
        } else {
            alert('\n\nnHentai 下载脚本错误：\n\n\n　　插入结果框出错，请查看页面源码是否进行了更新。\n\n');
            return;
        }
        //// 要插入到这个元素前面
        const hasThumbnailContainer: null | HTMLElement = document.getElementById('thumbnail-container');
        let thumbnailContainer: HTMLElement;
        if (hasThumbnailContainer) {
            thumbnailContainer = hasThumbnailContainer;
        } else {
            alert('\n\nnHentai 下载脚本错误：\n\n\n　　没找到图片列表框，无法定位结果框位置，请查看页面源码是否进行了更新。\n\n');
            return;
        }

        // 创建一个列表框
        if (!document.getElementById('listbox')) {
            let listBox: HTMLDivElement = document.createElement('div');
            listBox.id = 'listbox';
            listBox.className = 'container';

            // 插入到页面
            content.insertBefore(listBox, thumbnailContainer);

            // 列表注入到页面
            listBox.innerHTML = '<div id="imglistbox" contentEditable>' + imglist + '</div>';
        } else {
            // 如果列表框已经存在
            let imgListBox: null | HTMLElement = document.getElementById('imglistbox');
            if (imgListBox) {
                imgListBox.innerHTML = imglist;
            }
        }

    };
    // 函数注入页面
    window.insertList = insertList;
}