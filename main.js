"use strict";

const main = () => {
    // 在列表页面
    const URL = "http://127.0.0.1:3000";
    if (document.querySelector(".index-container")) {
        // 获取页面中的作品列表
        const titleList = document.querySelectorAll(".gallery");
        const page = document.querySelector(".pagination>.page.current").text;

        // 抽取列表中的 ID 号码，生成新列表
        let idList = [];
        let preCheckList = [];
        let dbItems = {};
        let newTitle = [];
        let states;
        titleList.forEach((item, i) => {
            const id = item.querySelector("a").href.match(/(?!g\/)\d+/g)[0];
            idList.push([id, i]);
            preCheckList.push(id);
        });

        // 列表项逐个和 localStorage 中的号码对照
        // $.ajax({
        //     url: URL + "/get/articles/nhentai",
        //     async: false,
        //     success: (res) => {
        //         res.data.map((item) => {
        //             dbItems[item.id] = item.state;
        //         });
        //     },
        // });

        $.ajax({
            url: URL + "/check",
            type: "POST",
            contentType: "application/json",
            async: false,
            data: JSON.stringify(preCheckList),
            success: (res) => {
                dbItems = res;
            },
        });

        idList.map((item) => {
            const id = item[0];
            let ele = titleList[item[1]];

            if (dbItems[id]) {
                const className = dbItems[id];
                //// 已经有的进行标记
                ele.classList.add(className);
            } else {
                const data = {
                    site: "nhentai",
                    id: id,
                    state: "browsed",
                    page: page,
                    create_at: Date.now(),
                    update_at: Date.now(),
                };
                newTitle.push(data);
            }
        });
        $.ajax({
            type: "POST",
            url: URL + "/add",
            contentType: "application/json",
            data: JSON.stringify(newTitle),
            dataType: "json",
        });
    } else if (document.querySelector("#bigcontainer")) {
        // 在作品页面
        // url format: https://nhentai.net/g/123456/1/ => split('/') => ["", "g", "123456", "1"]
        const id = document.querySelector("#cover>a").href.split("/")[4];
        let className;
        $.ajax({
            url: URL + "/check",
            type: "POST",
            contentType: "application/json",
            async: false,
            data: JSON.stringify([id]),
            success: (res) => {
                className = res[id];
            },
        });

        console.log(className);

        if (className) {
            if (className == "browsed") {
                console.log("hey here");
                const data = {
                    site: "nhentai",
                    id: id,
                    state: "visited",
                    create_at: Date.now(),
                    update_at: Date.now(),
                };
                $.ajax({
                    type: "POST",
                    url: URL + "/update",
                    async: false,
                    contentType: "application/json",
                    dataType: "json",
                    data: JSON.stringify(data),
                    success: (res) => {
                        className = res;
                    },
                });
            }
            document.querySelector("#info").classList.add(className);
        } else {
            document.querySelector("#info").classList.add(className);
        }
    }
};

const setStyle = () => {
    let style = document.createElement("style");

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
};
