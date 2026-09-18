define(['questAPI'], function(Quest){
    var API = new Quest();
    var isTouch = API.getGlobal().$isTouch;

    API.addPagesSet('consentPage', {
        header: 'Research Participant Information and Consent Form',
        noSubmit: false,
        submitText: 'Submit Answer',
        autoFocus: true
    });

    API.addQuestionsSet('consentChoice', {
        type: 'selectOne',
        name: 'consent_choice',
        required: true,
        numericValues: true,
        errorMsg: {
            required: 'Please select an option before continuing.'
        },
        answers: [
            { text: 'I wish to participate in this study', value: 1 },
            { text: 'I do not wish to participate in this study', value: 2 }
        ]
    });

    var consentHtml = [
        '<div style="text-align:left; font-size:1.05em; line-height:1.5;">',
        '<p><strong>Study Title:</strong> Connections between identities<br/>',
        '<strong>Researcher and Title:</strong> Dr. Ana Bracic, Associate Professor<br/>',
        '<strong>Department and Institution:</strong> Department of Political Science, Michigan State University<br/>',
        '<strong>Contact Information:</strong> <a href="mailto:bracic@msu.edu">bracic@msu.edu</a>, 303 South Kedzie Hall, 368 Farm Lane, East Lansing MI 48824, 517-355-6585<br/>',
        '<strong>Sponsor:</strong> Ana Bracic</p>',

        '<h4>BRIEF SUMMARY</h4>',
        '<p>You are being asked to participate in a research study. Researchers are required to provide a consent form to inform you about the research study, to convey that participation is voluntary, to explain risks and benefits of participation including why you might or might not want to participate, and to empower you to make an informed decision. You should feel free to discuss and ask the researchers any questions you may have.</p>',
        '<p>You are being asked to participate in a research study of whether or not people make connections between different identities without being consciously aware that they are making those connections. Your participation will be anonymous and no identifying information will be collected. Your participation in this study will take about 15 minutes. You will be asked to take an implicit association test, which measures automatic associations that may exist outside of conscious awareness.</p>',
        '<p>There are no foreseeable risks of participating in this study.</p>',
        '<p>You will not directly benefit from your participation in this study. However, your participation in this study may contribute to the understanding of whether or not people unconsciously connect different identities.</p>',

        '<h4>PURPOSE OF RESEARCH</h4>',
        '<p>The purpose of this research study is to determine whether or not people are making connections between different identities while not being consciously aware of making those connections.</p>',

        '<h4>WHAT YOU WILL BE ASKED TO DO</h4>',
        '<p>You will be asked to take an implicit association test, which will consist of a practice session and then the test itself. After the test, we will ask you three survey questions. You are free to skip any questions that you would not prefer to answer. Participation takes about 15 minutes.</p>',

        '<h4>POTENTIAL BENEFITS</h4>',
        '<p>You will not benefit personally from being in this study. However, we hope that, in the future, other people might benefit from this study because of the knowledge gained about whether or not people connect different identities without being consciously aware of making those connections.</p>',

        '<h4>POTENTIAL RISKS</h4>',
        '<p>There are no foreseeable risks to participating in this study.</p>',

        '<h4>PRIVACY AND CONFIDENTIALITY</h4>',
        '<p>Participating in this study is anonymous. We will not be collecting any identifying information. The data, which will be anonymous, could be used for future research studies or distributed to another investigator for future research studies without additional informed consent from you.</p>',

        '<h4>Your rights to participate, say no, or withdraw</h4>',
        '<p>You have the right to say no to participate in the research. You can stop at any time after it has already started. There will be no consequences if you stop and you will not be criticized. You will not lose any benefits that you normally receive.</p>',

        '<h4>Contact Information</h4>',
        '<p>If you have concerns or questions about this study, such as scientific issues, how to do any part of it, or to report an injury, please contact the researcher (Ana Bracic; <a href="mailto:bracic@msu.edu">bracic@msu.edu</a>, 303 South Kedzie Hall, 368 Farm Lane, East Lansing MI 48824, 517-355-6585).</p>',
        '<p>If you have questions or concerns about your role and rights as a research participant, would like to obtain information or offer input, or would like to register a complaint about this study, you may contact, anonymously if you wish, the Michigan State University’s Human Research Protection Program at 517-355-2180, Fax 517-432-4503, or e-mail <a href="mailto:irb@msu.edu">irb@msu.edu</a> or regular mail at 4000 Collins Rd, Suite 136, Lansing, MI 48910.</p>',

        '<h4>Documentation of Informed consent.</h4>',
        '<p>Clicking to continue to the study means that you voluntarily agree to participate in this research study:</p>',
        '</div>'
    ].join('');

    API.addSequence([
        {
            inherit: 'consentPage',
            description: consentHtml,
            questions: [
                { inherit: 'consentChoice' }
            ]
        }
    ]);

    API.addSettings('hooks', {
        endTask: function() {
            var answers = API.getAnswers();
            var choice = answers && answers.consent_choice ? answers.consent_choice : 2;
            API.getGlobal().consent_choice = choice;
        }
    });

    return API.script;
});
