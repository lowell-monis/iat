define(['pipAPI', 'https://cdn.jsdelivr.net/gh/baranan/minno-tasks@0.*/IAT/iat10.js'], function(APIConstructor, iatExtension){
    let API = new APIConstructor();
    let global = API.getGlobal();

    return iatExtension({
        category1: {
            name: global.blackLabels,
            title: {
                media: { word: global.blackLabels },
                css: { color: '#31940F', 'font-size': '1.8em' },
                height: 4
            },
            stimulusMedia: [
                { image: 'bm1_nc.jpg' },
                { image: 'bm2_nc.jpg' },
                { image: 'bm3_nc.jpg' },
                { image: 'bf1_nc.jpg' },
                { image: 'bf2_nc.jpg' },
                { image: 'bf3_nc.jpg' }
            ],
            stimulusCss: { color: '#31940F', 'font-size': '2.3em' }
        },
        category2: {
            name: global.whiteLabels,
            title: {
                media: { word: global.whiteLabels },
                css: { color: '#31940F', 'font-size': '1.8em' },
                height: 4
            },
            stimulusMedia: [
                { image: 'wm1_nc.jpg' },
                { image: 'wm2_nc.jpg' },
                { image: 'wm3_nc.jpg' },
                { image: 'wf1_nc.jpg' },
                { image: 'wf2_nc.jpg' },
                { image: 'wf3_nc.jpg' }
            ],
            stimulusCss: { color: '#31940F', 'font-size': '2.3em' }
        },
        attribute1: {
            name: global.disabledLabels,
            title: {
                media: { word: global.disabledLabels },
                css: { color: '#0000FF', 'font-size': '1.8em' },
                height: 4
            },
            stimulusMedia: [
                { image: 'disabled1.jpg' },
                { image: 'disabled2.jpg' },
                { image: 'disabled3.jpg' },
                { image: 'disabled4.jpg' },
                { image: 'disabled5.jpg' },
                { image: 'disabled6.jpg' }
            ],
            stimulusCss: { color: '#0000FF', 'font-size': '2.3em' }
        },
        attribute2: {
            name: global.ableLabels,
            title: {
                media: { word: global.ableLabels },
                css: { color: '#0000FF', 'font-size': '1.8em' },
                height: 4
            },
            stimulusMedia: [
                { image: 'abled1.jpg' },
                { image: 'abled2.jpg' },
                { image: 'abled3.jpg' },
                { image: 'abled4.jpg' },
                { image: 'abled5.jpg' },
                { image: 'abled6.jpg' }
            ],
            stimulusCss: { color: '#0000FF', 'font-size': '2.3em' }
        },
        base_url: {
            image: global.baseURL
        },
        isTouch: global.$isTouch
    });
});