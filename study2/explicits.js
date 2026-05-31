define(['questAPI'], function(Quest){
    let API = new Quest();
    let isTouch = API.getGlobal().$isTouch;

    API.addPagesSet('basicPage', {
        noSubmit: false,
        header: 'Survey Questions',
        decline: true,
        declineText: isTouch ? 'Decline' : 'Decline to Answer',
        autoFocus: true,
        progressBar: 'Page <%= pagesMeta.number %> out of 3'
    });

    API.addQuestionsSet('basicQ', {
        decline: true,
        required: true,
        errorMsg: {
            required: isTouch
                ? 'Please select an answer, or click \'Decline\''
                : 'Please select an answer, or click \'Decline to Answer\''
        },
        numericValues: true
    });

    API.addQuestionsSet('basicSelect', {
        inherit: 'basicQ',
        type: 'selectOne'
    });

    API.addQuestionsSet('basicCheckbox', {
        inherit: 'basicQ',
        type: 'checkboxList'
    });

    API.addQuestionsSet('gender_q', {
        inherit: 'basicSelect',
        name: 'gender',
        stem: 'What is your gender?',
        answers: [
            { text: 'Man', value: 1 },
            { text: 'Woman', value: 2 },
            { text: 'Non-binary', value: 3 },
            { text: 'Another gender', value: 4 }
        ]
    });

    API.addQuestionsSet('race_q', {
        decline: true,
        required: false,
        type: 'checkboxList',
        name: 'race',
        stem: 'What is your race? (Mark all that apply)',
        answers: [
            { text: 'American Indian/Native American', value: 1 },
            { text: 'Asian American/Pacific Islander', value: 2 },
            { text: 'Black/African American', value: 3 },
            { text: 'Latino/Hispanic', value: 4 },
            { text: 'White', value: 5 },
            { text: 'Middle Eastern/North African', value: 6 },
            { text: 'Another race/ethnicity', value: 7 }
        ]
    });

    API.addQuestionsSet('party_q', {
        inherit: 'basicSelect',
        name: 'party_id',
        stem: 'Generally speaking, do you usually think of yourself as a Republican, a Democrat, an independent, or what? Please place yourself on the scale below.',
        answers: [
            { text: '1 – Strong Democrat', value: 1 },
            { text: '2', value: 2 },
            { text: '3', value: 3 },
            { text: '4', value: 4 },
            { text: '5', value: 5 },
            { text: '6', value: 6 },
            { text: '7 – Strong Republican', value: 7 }
        ]
    });

    API.addSequence([
        {
            inherit: 'basicPage',
            questions: [
                { inherit: 'gender_q' }
            ]
        },
        {
            inherit: 'basicPage',
            questions: [
                { inherit: 'race_q' }
            ]
        },
        {
            inherit: 'basicPage',
            questions: [
                { inherit: 'party_q' }
            ]
        }
    ]);

    return API.script;
});