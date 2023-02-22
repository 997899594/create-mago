#!/usr/bin/env node

import * as fs from 'node:fs'
// 用于创建交互提示
import prompts from 'prompts'
// 用于设置输入输出颜色
import { reset, red } from 'kolorist'
// 用于接受用户命令参数
import minimist from 'minimist'
// 用于node执行shell
import shell from 'shelljs'

import { cloneProject, mainRepoUrl, getTemplate } from './template.js'

const createProject = (templateKey, projectName) => {
  // 多仓库多模板拉取
  if (shell.exec(`${cloneProject(templateKey, projectName)}`).code === 0) {
    shell.exec(`rm -rf ${finalAnswer.projectName}/.git`)
  }

  // 单仓库多模板拉取
  // const templateName = getTemplate(templateKey);
  // shell.exec('git init')
  // shell.exec('git config core.sparsecheckout true')
  // shell.exec(`echo '${templateName}' >> .git/info/sparse-checkout`)
  // shell.exec(`git remote add origin ${mainRepoUrl}`)
  // if (shell.exec('git pull --depth 1 origin main').code === 0) {
  //   shell.exec(`mv ${templateName} ${projectName}`);
  //   shell.exec('rm -rf .git');
  // }
}

const formatProjectName = (projectName = defaultTargetDir) => {
  return projectName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/^[._]/, '')
    .replace(/[^a-z0-9-~]+/g, '-')
}
const handleAnswer = (answer) => {
  return {
    ...answer,
    projectName: formatProjectName(answer.projectName)
  }
}

if (!shell.which('git')) {
  shell.echo(red('🧎Sorry, this script requires git !!'))
  shell.exit(1)
}
// 默认的项目名（目录名）
const defaultTargetDir = 'safeis-project'

const argv = minimist(process.argv.slice(2), {})
const [projectNameParams] = argv._
const answer = await prompts([
  {
    type: projectNameParams ? null : 'text',
    name: 'projectName',
    message: reset('Project name:'),
    initial: defaultTargetDir
  },
  {
    name: 'isExists',
    type: (prev) => {
      if (fs.existsSync(`${process.cwd()}/${prev}`)) {
        shell.echo(red(`The destination directory "${prev}" already exists !!Please delete the directory and try again`))
        shell.exit(1)
      }
    }
  },
  {
    // 平台
    type: 'select',
    name: 'platform',
    message: reset('Platform:'),
    initial: 0,
    choices: [
      { title: 'PC', value: 'PC' },
      { title: 'H5', value: 'H5' }
    ]
  },
  {
    // 框架
    type: 'select',
    name: 'framework',
    message: reset('Framework:'),
    initial: 0,
    choices: [
      { title: 'Vue', value: 'Vue' },
      { title: 'React', value: 'React' }
    ]
  }
])

if (projectNameParams) {
  Object.assign(answer, { projectName: projectNameParams })
}
const finalAnswer = handleAnswer(answer)
const { projectName, platform, framework } = finalAnswer
if (projectName && platform && framework) {
  const templateKey = `${platform.toLowerCase()}-${framework.toLowerCase()}`
  createProject(templateKey, projectName)
}
