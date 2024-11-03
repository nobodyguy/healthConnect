enum ECategories {
    CONS = "resources.requests.categories.consultation",
    EXC = "resources.requests.categories.examination",
    UPD = "resources.requests.categories.data_update",
    REP = "resources.requests.categories.recipe",
    APPL = "resources.requests.categories.application",
    DOC = "resources.requests.categories.documentation"
}

const categoriesColors = {
    [ECategories.CONS]: "#2196f3",
    [ECategories.EXC]: "orange",
    [ECategories.UPD]: "green",
    [ECategories.REP]: "#2196f3",
    [ECategories.APPL]: "orange",
    [ECategories.DOC]: "green"
}

enum EUrgency {
    L = "resources.requests.urgencies.low",
    M = "resources.requests.urgencies.medium",
    H = "resources.requests.urgencies.high"
}

const urgencyColors = {
    [EUrgency.L]: "green",
    [EUrgency.M]: "orange",
    [EUrgency.H]: "red"
}

enum EStatus {
    O = "resources.requests.statuses.open",
    P = "resources.requests.statuses.pending",
    C = "resources.requests.statuses.closed"
}

const statusColors = {
    [EStatus.O]: "gray",
    [EStatus.P]: "#2196f3",
    [EStatus.C]: "green"
}

export {
    ECategories,
    EUrgency,
    EStatus,
    urgencyColors,
    statusColors,
    categoriesColors
}