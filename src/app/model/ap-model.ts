import { searchModel } from "../search/search.model";

function createDescriptionLink(apType) {
    return "https://www.attitudinalpsyche.com/personality-profiles/" + apType.sexta.toLowerCase() + "/" + apType.name.toLowerCase();
}

function createSextaLink(apType) {
    return "https://www.attitudinalpsyche.com/personality-profiles/" + apType.sexta.toLowerCase();
}

const apTypeMap = new Map();
searchModel.apTypeSextas.forEach(apType => {
    apTypeMap.set(apType.name, {
        name: apType.name,
        sexta: apType.sexta,
        descriptionLink: createDescriptionLink(apType),
        sextaLink: createSextaLink(apType)
    })
});

const attitudesMap = new Map();
attitudesMap.set('1v', {
    beliefs: [
        'Trusts in their ability to deduce what they desire and how it can change over time.',
        'Believes that they will never lose their sense of self.',
        'Assumes that their goals are ideal by default.',
        'Believes that others should let them express their willpower in all circumstances.',
        'Believes that they can always give into their urges and future desires and deal with the consequences.',
        'Knows that only they themselves can execute their goals.',
        'Assumes that they are a one-man army and their decisions are better than everyone else’s by default.',
        'Presumes that they are better leaders than others even if they choose not to lead.',
        'Figures that their own version of the future is what matters most.',
        'Deems others’ abilities as relevant only if they align with or connect back to their own motivations.',
        'Believes that they are the ultimate decider of their responsibilities.',
        'Credits themselves for where they are in life.',
        'Assumes that their own decisions are always justified for the moment in time they were made.',
        'Believes that it is their right to act or refuse to act whenever they wish.',
        'Expects that others will never be able to attack vulnerabilities in their willpower.',
        'Imagines that others can see the future playing out in the same way that they do.',
        'Feels justified in overriding others’ wishes to replace with their own.',
        'Believes that discussing objectives more than acting upon them is useless.',
        'Assumes that they have the right to boss people around if needed.',
        'Expects others to leave them alone and let them figure things out for themselves unless they have asked.'
    ],
});

const subtypesMap = new Map();
// 1-x
subtypesMap.set('1-1', {
    type: 'Accentuated',
    highContrast: {
        self: true,
        others: true,
        process: true
    }
});
subtypesMap.set('1-2', {
    type: 'Overlay',
    highContrast: {
        self: true,
        others: false,
        process: false
    }
});
subtypesMap.set('1-3', {
    type: 'Candid',
    highContrast: {
        self: false,
        others: true,
        process: false
    }
});
subtypesMap.set('1-4', {
    type: 'Candid',
    highContrast: {
        self: false,
        others: false,
        process: true
    }
});
// 2-x
subtypesMap.set('2-1', {
    type: 'Follow-me',
    highContrast: {
        self: true,
        others: false,
        process: false
    }
});
subtypesMap.set('2-2', {
    type: 'Accentuated',
    highContrast: {
        self: true,
        others: true,
        process: true
    }
});
subtypesMap.set('2-3', {
    type: 'Elaborate',
    highContrast: {
        self: false,
        others: false,
        process: true
    }
});
subtypesMap.set('2-4', {
    type: 'Secondhand',
    highContrast: {
        self: false,
        others: true,
        process: false
    }
});
// 3-x
subtypesMap.set('3-1', {
    type: 'Facade',
    highContrast: {
        self: false,
        others: true,
        process: false
    }
});
subtypesMap.set('3-2', {
    type: 'Intrepid',
    highContrast: {
        self: false,
        others: false,
        process: true
    }
});
subtypesMap.set('3-3', {
    type: 'Accentuated',
    highContrast: {
        self: true,
        others: true,
        process: true
    }
});
subtypesMap.set('3-4', {
    type: 'Trivial',
    highContrast: {
        self: true,
        others: false,
        process: false
    }
});
// 4-x
subtypesMap.set('4-1', {
    type: 'Self-sufficient',
    highContrast: {
        self: false,
        others: false,
        process: true
    }
});
subtypesMap.set('4-2', {
    type: 'Venture',
    highContrast: {
        self: false,
        others: true,
        process: false
    }
});
subtypesMap.set('4-3', {
    type: 'Repellent',
    highContrast: {
        self: true,
        others: false,
        process: false
    }
});
subtypesMap.set('4-4', {
    type: 'Accentuated',
    highContrast: {
        self: true,
        others: true,
        process: true
    }
});
// x-0
subtypesMap.set('1-0', {
    type: 'Obscured',
    highContrast: {
        self: false,
        others: false,
        process: false
    }
});
subtypesMap.set('2-0', {
    type: 'Obscured',
    highContrast: {
        self: false,
        others: false,
        process: false
    }
});
subtypesMap.set('3-0', {
    type: 'Obscured',
    highContrast: {
        self: false,
        others: false,
        process: false
    }
});
subtypesMap.set('4-0', {
    type: 'Obscured',
    highContrast: {
        self: false,
        others: false,
        process: false
    }
});

const aspectMap = new Map();
aspectMap.set('L', {
    name: "Logic"
});
aspectMap.set('E', {
    name: "Emotion"
});
aspectMap.set('F', {
    name: "Physics"
});
aspectMap.set('V', {
    name: "Volition"
});

export const apModel = {
    apTypeMap: apTypeMap,
    attitudesMap: attitudesMap,
    subtypesMap: subtypesMap,
    aspectMap: aspectMap
};