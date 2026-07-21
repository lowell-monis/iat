define(['managerAPI'], function(Manager){

    var API = new Manager();

    API.setName('mgr');
    API.addSettings('skip', true);

    // Keep internal logging enabled so task data is recorded in memory
    API.addSettings('logger', {
        type: 'csv',
        url: '' 
    });

    API.addGlobal({
        genderiat: {},
        baseURL: './images/',
        womenLabels: 'Women',
        menLabels: 'Men',
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

        // End Task: Collects logged data, POSTs to DataPipe, and redirects
        endTask: [{
            type: 'post',
            name: 'endTask',
            post: function(success, error, data, API){
                var sessionId = "study2_" + Date.now() + "_" + Math.random().toString(36).substring(2, 8);
                
                // Retrieve all logged trial data formatted as CSV from Minno's logger
                var dataAsString = API.getLogs ? API.getLogs() : JSON.stringify(data || {});

                fetch("https://pipe.jspsych.org/api/data/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "*/*"
                    },
                    body: JSON.stringify({
                        experimentID: "KQ2pq6uCiqYL",
                        filename: sessionId + ".csv",
                        data: dataAsString
                    })
                })
                .then(function(response) {
                    if (!response.ok) {
                        throw new Error("DataPipe response error");
                    }
                    console.log("Data saved successfully.");
                    window.location.replace("https://polisci.msu.edu/");
                })
                .catch(function(err) {
                    console.error("DataPipe Upload Error:", err);
                    alert("There was an error saving your data. Redirecting...");
                    window.location.replace("https://polisci.msu.edu/");
                });
            }
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
        { inherit: 'genderiat_instructions' },
        { inherit: 'genderiat' },
        { inherit: 'explicits' },
        { inherit: 'debriefing' },
        { inherit: 'lastpage' },
        { inherit: 'endTask' } // Triggers data POST & redirect upon finishing lastpage
    ]);

    return API.script;
});