// is-empty.js
// desciption: checking for all cases of empty
// developer: Stuckcoder devteam
// owner: Stuckcoder AS

const isEmpty = value => 
    value === undefined || 
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)

module.exports = isEmpty;