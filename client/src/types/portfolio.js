/**
 * @typedef {Object} SocialLink
 * @property {string} label
 * @property {string} url
 */

/**
 * @typedef {Object} Profile
 * @property {string} name
 * @property {string} title
 * @property {string} tagline
 * @property {string} location
 * @property {string} email
 * @property {SocialLink[]} socials
 */

/**
 * @typedef {Object} About
 * @property {string} headline
 * @property {string} body
 * @property {string[]} focusAreas
 */

/**
 * @typedef {Object} ExperienceItem
 * @property {string} company
 * @property {string} [logoUrl]
 * @property {string} role
 * @property {string} period
 * @property {string} location
 * @property {string} summary
 * @property {string[]} highlights
 */

/**
 * @typedef {Object} ProjectLink
 * @property {string} label
 * @property {string} url
 */

/**
 * @typedef {Object} Project
 * @property {string} title
 * @property {string} summary
 * @property {string[]} outcomes
 * @property {string[]} tech
 * @property {ProjectLink[]} links
 */

/**
 * @typedef {Object.<string, string[]>} Skills
 */

/**
 * @typedef {Object} Seo
 * @property {string} title
 * @property {string} description
 */

/**
 * @typedef {Object} Portfolio
 * @property {Profile} profile
 * @property {About} about
 * @property {ExperienceItem[]} experience
 * @property {Project[]} projects
 * @property {Skills} skills
 * @property {Seo} seo
 */

export {};
