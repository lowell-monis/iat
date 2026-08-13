define([
    'managerAPI',
    'https://cdn.jsdelivr.net/gh/minnojs/minno-datapipe@1.*/datapipe.min.js'
], function(Manager){

    var isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    var isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    var deviceType = isMobile ? (isTouch ? 'mobile_touch' : 'mobile_other') : (isTouch ? 'desktop_touch' : 'desktop_mouse');

    init_data_pipe(API, '12MlCB7eHnjP', {
        file_type: 'csv',
        params: {
            device_touch: isTouch,
            device_mobile: isMobile,
            device_type: deviceType
        }
    });

    API.setName('mgr');
    API.addSettings('skip', true);

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

        // Wait task: Holds until DataPipe server acknowledges data upload
        uploading: uploading_task({
            header: 'Just a moment',
            body: 'Please wait while we save your data...'
        }),

        redirect: [{
            type: 'redirect',
            name: 'redirecting',
            url: 'https://polisci.msu.edu/'
        }]
    });

    API.addSequence([
        { type: 'isTouch' },

        {
            mixer: 'branch',
            conditions: { compare: 'global.$isTouch', to: true },
            data: [
                {
                    type: 'injectStyle',
                    css: [
                        '[piq-page] {background-color: #fff; border: 1px solid transparent; border-radius: 4px; box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05); margin-bottom: 20px; border-color: #bce8f1;}',
                        '[piq-page] > ol {margin: 15px;}',
                        '[piq-page] > .btn-group {margin: 0px 15px 15px 15px;}',
                        '.container {padding:5px;}',
                        '[pi-quest]::before, [pi-quest]::after {content: " ";display: table;}',
                        '[pi-quest]::after {clear: both;}',
                        '[pi-quest] h3 { border-bottom: 1px solid transparent; border-top-left-radius: 3px; border-top-right-radius: 3px; padding: 10px 15px; color: inherit; font-size: 2em; margin-bottom: 20px; margin-top: 0;background-color: #d9edf7;border-color: #bce8f1;color: #31708f;}',
                        '[pi-quest] .form-group > label {font-size:1.2em; font-weight:normal;}',
                        '[pi-quest] .btn-toolbar {margin:15px;float:none !important; text-align:center;position:relative;}',
                        '[pi-quest] [ng-click="decline($event)"] {position:absolute;right:0;bottom:0}',
                        '[pi-quest] [ng-click="submit()"] {width:30%;line-height: 1.3333333;border-radius: 6px;}',
                        '@media (min-width: 480px) {',
                        ' [pi-quest] [ng-click="submit()"] {width:30%;padding: 10px 16px;font-size: 1.6em;}',
                        '}',
                        '@media (max-width: 480px) {',
                        ' [pi-quest] [ng-click="submit()"] {padding: 8px 13px;font-size: 1.2em;}',
                        ' [pi-quest] [ng-click="decline($event)"] {font-size: 0.9em;padding:3px 6px;}',
                        '}'
                    ]
                }
            ]
        },

        { inherit: 'intro' },
        { inherit: 'raceiat_instructions' },
        { inherit: 'raceiat' },
        { inherit: 'explicits' },
        { inherit: 'debriefing' },
        { inherit: 'uploading' },
        { inherit: 'lastpage' },
        { inherit: 'redirect' }
    ]);

    return API.script;
});