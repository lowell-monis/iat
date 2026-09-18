define([
    'managerAPI',
    'https://cdn.jsdelivr.net/gh/minnojs/minno-datapipe@1.*/datapipe.min.js'
], function(Manager){

    var API = new Manager();

    var isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    var isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    var deviceType = isMobile ? (isTouch ? 'mobile_touch' : 'mobile_other') : (isTouch ? 'desktop_touch' : 'desktop_mouse');

    // DATAPIPE CONFIGURATION: Replaced at deployment time via GitHub Actions or fallback
    init_data_pipe(API, '__DATAPIPE_STUDY1_ID__', {
        file_type: 'csv',
        params: {
            device_touch: isTouch,
            device_mobile: isMobile,
            device_type: deviceType
        }
    });

    API.setName('mgr');
    API.addSettings('skip', true);

    // STUDY CONFIGURATION: Customize labels and image folder path below
    API.addGlobal({
        raceiat: {},
        baseURL: './images/',
        blackLabels: 'Black people',
        whiteLabels: 'White people',
        disabledLabels: 'Physically Disabled People',
        ableLabels: 'Physically Abled People'
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

        // Main completion redirect (injected from GitHub Secret or fallback)
        redirect: [{
            type: 'redirect',
            name: 'redirecting',
            url: '__COMPLETION_REDIRECT_URL__'
        }],

        // Separate decline page and redirect to MSU PLS website for non-participants
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
            url: 'https://polisci.msu.edu/'
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