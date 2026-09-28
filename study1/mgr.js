define([
    'managerAPI',
    'https://cdn.jsdelivr.net/gh/minnojs/minno-datapipe@1.*/datapipe.min.js'
], function(Manager){

    var API = new Manager();

    // Extract Verasight URL Parameters (vsid / participant ID and isid / key)
    var urlParams = new URLSearchParams(window.location.search);
    var vsid = urlParams.get('vsid') || urlParams.get('pid') || urlParams.get('id') || '';
    var isid = urlParams.get('isid') || '__vskey__6aaac266245f02335241110b';

    var isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    var isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    var deviceType = isMobile ? (isTouch ? 'mobile_touch' : 'mobile_other') : (isTouch ? 'desktop_touch' : 'desktop_mouse');

    init_data_pipe(API, '12MlCB7eHnjP', {
        file_type: 'csv',
        params: {
            vsid: vsid,
            isid: isid,
            device_touch: isTouch,
            device_mobile: isMobile,
            device_type: deviceType
        }
    });

    API.setName('mgr');
    API.addSettings('skip', true);

    // Verasight Redirect URLs for Study 1 (Part 1)
    var completeUrl = 'https://backend.verasight.io/surveys/redirect?isid=' + encodeURIComponent(isid) + '&vsref=1&vsid=' + encodeURIComponent(vsid);
    var terminateUrl = 'https://backend.verasight.io/surveys/redirect?isid=' + encodeURIComponent(isid) + '&vsref=2&vsid=' + encodeURIComponent(vsid);

    API.addGlobal({
        raceiat: {},
        baseURL: './images/',
        blackLabels: 'Black people',
        whiteLabels: 'White people',
        disabledLabels: 'Physically Disabled People',
        ableLabels: 'Physically Abled People',
        vsid: vsid,
        isid: isid
    });

    API.addTasksSet({
        instructions: [{
            type: 'message',
            buttonText: 'Continue'
        }],

        consent: [{
            type: 'quest',
            name: 'consent',
            scriptUrl: 'consent.js'
        }],

        intro: [{
            inherit: 'instructions',
            name: 'intro',
            templateUrl: 'intro.jst',
            title: 'Intro',
            header: 'Welcome'
        }],

        raceiat_instructions: [{
            inherit: 'instructions',
            name: 'raceiat_instructions',
            templateUrl: 'raceiat_instructions.jst',
            title: 'IAT Instructions',
            header: 'Implicit Association Test'
        }],

        raceiat: [{
            type: 'time',
            name: 'raceiat',
            scriptUrl: 'raceiat.js'
        }],

        explicits: [{
            type: 'quest',
            name: 'explicits',
            scriptUrl: 'explicits.js'
        }],

        debriefing: [{
            inherit: 'instructions',
            name: 'debriefing',
            templateUrl: 'debriefing.jst',
            title: 'Debriefing',
            header: 'Debriefing'
        }],

        lastpage: [{
            type: 'message',
            name: 'lastpage',
            templateUrl: 'lastpage.jst',
            title: 'End',
            header: 'You have completed the study'
        }],

        uploading: uploading_task({
            header: 'Just a moment',
            body: 'Please wait while we save your data...'
        }),

        redirect: [{
            type: 'redirect',
            name: 'redirecting',
            url: completeUrl
        }],

        decline_page: [{
            inherit: 'instructions',
            name: 'decline_page',
            templateUrl: 'decline.jst',
            title: 'Thank You',
            header: 'Thank You'
        }],

        decline_redirect: [{
            type: 'redirect',
            name: 'decline_redirecting',
            url: terminateUrl
        }]
    });

    API.addSequence([
        { type: 'isTouch' },
        { inherit: 'consent' },
        {
            mixer: 'branch',
            conditions: [
                { compare: 'global.consent_choice', to: 2 }
            ],
            data: [
                { inherit: 'decline_page' },
                { inherit: 'decline_redirect' }
            ],
            elseData: [
                { inherit: 'intro' },
                { inherit: 'raceiat_instructions' },
                { inherit: 'raceiat' },
                { inherit: 'explicits' },
                { inherit: 'debriefing' },
                { inherit: 'uploading' },
                { inherit: 'lastpage' },
                { inherit: 'redirect' }
            ]
        }
    ]);

    return API.script;
});