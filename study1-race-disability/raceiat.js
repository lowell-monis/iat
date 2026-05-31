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
            stimulusCss: { color: '#31940F', 'font-size': '2.3em', 'width': '220px', 'height': '220px' }
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
            stimulusCss: { color: '#31940F', 'font-size': '2.3em', 'width': '220px', 'height': '220px' }
        },
        attribute1: {
            name: global.disabledLabels,
            title: {
                media: { word: global.disabledLabels },
                css: { color: '#0000FF', 'font-size': '1.8em' },
                height: 4
            },
            stimulusMedia: [
                { image: 'disabled1.png' },
                { image: 'disabled2.png' },
                { image: 'disabled3.png' },
                { image: 'disabled4.png' },
                { image: 'disabled5.png' },
                { image: 'disabled6.png' }
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
                { image: 'abled1.png' },
                { image: 'abled2.png' },
                { image: 'abled3.png' },
                { image: 'abled4.png' },
                { image: 'abled5.png' },
                { image: 'abled6.png' }
            ],
            stimulusCss: { color: '#0000FF', 'font-size': '2.3em' }
        },
        base_url: {
            image: global.baseURL
        },
        isTouch: global.$isTouch
    });
});