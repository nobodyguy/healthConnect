enum ECategories {
    CONS = "consultation",
    EXC = "examination",
    UPD = "data_update",
    REP = "recipe",
    APPL = "application",
    DOC = "documentation"
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
    L = "low",
    M = "medium",
    H = "high"
}

const urgencyColors = {
    [EUrgency.L]: "green",
    [EUrgency.M]: "orange",
    [EUrgency.H]: "red"
}

enum EStatus {
    O = "open",
    P = "pending",
    C = "closed"
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