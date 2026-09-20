define([
    'managerAPI',
    'https://cdn.jsdelivr.net/gh/minnojs/minno-datapipe@1.*/datapipe.min.js'
], function(Manager){

    var API = new Manager();

    // Extract Verasight URL Parameters (vsid / participant ID)
    var urlParams = new URLSearchParams(window.location.search);
    var vsid = urlParams.get('vsid') || urlParams.get('pid') || urlParams.get('id') || '';

    var isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    var isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    var deviceType = isMobile ? (isTouch ? 'mobile_touch' : 'mobile_other') : (isTouch ? 'desktop_touch' : 'desktop_mouse');

    // DATAPIPE CONFIGURATION: Experiment ID replaced via GitHub Secret at deploy time or fallback
    init_data_pipe(API, '__DATAPIPE_STUDY2_ID__', {
        file_type: 'csv',
        params: {
            vsid: vsid,
            device_touch: isTouch,
            device_mobile: isMobile,
            device_type: deviceType
        }
    });

    API.setName('mgr');
    API.addSettings('skip', true);

    // Verasight Redirect URLs for Study 2 (Part 2)
    var completeUrl = 'https://backend.verasight.io/surveys/redirect?isid=6aaac3bdc12cd10dfe2ab527&vsref=1&vsid=' + encodeURIComponent(vsid);
    var terminateUrl = 'https://backend.verasight.io/surveys/redirect?isid=6aaac3bdc12cd10dfe2ab527&vsref=2&vsid=' + encodeURIComponent(vsid);

    API.addGlobal({
        genderiat: {},
        baseURL: './images/',
        womenLabels: 'Women',
        menLabels: 'Men',
        disabledLabels: 'Physically Disabled People',
        ableLabels: 'Physically Abled People',
        vsid: vsid
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

        genderiat_instructions: [{
            inherit: 'instructions',
            name: 'genderiat_instructions',
            templateUrl: 'genderiat_instructions.jst',
            title: 'IAT Instructions',
            header: 'Implicit Association Test'
        }],

        genderiat: [{
            type: 'time',
            name: 'genderiat',
            scriptUrl: 'genderiat.js'
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

        // Main completion redirect (Verasight Complete vsref=1)
        redirect: [{
            type: 'redirect',
            name: 'redirecting',
            url: completeUrl
        }],

        // Separate decline page and redirect (Verasight Terminate vsref=2)
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
            else: [
                { inherit: 'intro' },
                { inherit: 'genderiat_instructions' },
                { inherit: 'genderiat' },
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
