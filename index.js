module.exports = async (URL, CALLBACK) => await new Promise(async (resolve, reject) => {
    try {
        const axios = await require(`axios`);
        const jsdom = await require(`jsdom`).JSDOM;
        if (await /^[a-zA-Z0-9]+$/m.test(await URL) == true) return await axios.get(`https://www.mediafire.com/file/${await URL}/file`).then(async response => {
            const dom = await new jsdom(await response.data);
            const download_button = await dom.window.document.getElementById(`downloadButton`);
            if (typeof await download_button == `object` && await download_button != null && typeof await download_button.href == `string` && await String(await download_button.href).length > 0) return await resolve(await download_button.href);
            else return await reject(await new Error(`Download button is not found!`));
        }).catch(async error => await reject(await error));
        else if (await /^(https?:\/\/)?(www\.)?mediafire\.com\/\?[a-zA-Z0-9]+$/m.test(await URL) == true || await /^(https?:\/\/)?(www\.)?mediafire\.com\/(file|view|download)\/[a-zA-Z0-9]+(\/[a-zA-Z0-9_\-\.~%]+)?(\/file)?$/m.test(await URL) == true) return await axios.get(await URL).then(async response => {
            const dom = await new jsdom(await response.data);
            const download_button = await dom.window.document.getElementById(`downloadButton`);
            if (typeof await download_button == `object` && await download_button != null && typeof await download_button.href == `string` && await String(await download_button.href).length > 0) return await resolve(await download_button.href);
            else return await reject(await new Error(`Download button is not found!`));
        }).catch(async error => await reject(await error));
        else return await reject(await new Error(`Defined URL is incorrect!`));
    } catch (error) {
        return await reject(await error);
    };
}).then(async value => {
    if (typeof await CALLBACK == `function`) return await CALLBACK({
        SUCCESS: true,
        VALUE: await value
    });
    else return await value;
}).catch(async error => {
    if (typeof await CALLBACK == `function`) return await CALLBACK({
        SUCCESS: false,
        ERROR: await error
    });
    else throw await error;
});