export const template = {
  'pc-vue': 'https://git.safeis.cn/safeis-web-group/safeis-skit-template.git'
}
export const cloneProject = (project, newName) => {
  return `git clone ${template[project]} ${newName}`
}

export const mainRepoUrl = 'https://git.safeis.cn/safeis-web-group/safeis-skit-template.git'

export const getTemplateName = (templateName) => `${templateName}`
